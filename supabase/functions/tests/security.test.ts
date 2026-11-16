import { test, expect } from 'bun:test';
import { readFileSync } from 'node:fs';

async function load(name: string, blocked = false, rpcError = false) {
  let handler: (req: Request) => Promise<Response> = async () => new Response();
  const calls: any[] = [];
  const bucket = {
    createSignedUploadUrl: async (path: string) => ({ data: { path, token: 'test-token' }, error: null }),
    getPublicUrl: () => ({ data: { publicUrl: 'https://example.test/image.png' } }),
  };
  const client = {
    rpc: async (fn: string, args: any) => { calls.push({ fn, ...args }); return { data: fn === 'rate_limit_blocked' ? blocked : true, error: rpcError ? { message: 'Unavailable' } : null }; },
    storage: { from: () => bucket, updateBucket: async (_: string, settings: any) => { calls.push(settings); return { error: null }; } },
  };
  const source = readFileSync(`supabase/functions/${name}/index.ts`, 'utf8').replace(/^import .*;\n/gm, '');
  const compiled = new Bun.Transpiler({ loader: 'ts' }).transformSync(source);
  const run = new Function('createClient', 'corsHeaders', 'Deno', 'fetch', compiled);
  run(() => client, {}, { env: { get: (key: string) => key === 'ADMIN_PASSWORD' ? 'test-password' : 'test-value' }, serve: (fn: typeof handler) => { handler = fn; } }, async (_: string, options: any) => { calls.push(JSON.parse(options.body)); return new Response('data: [DONE]\n\n'); });
  const request = (body: unknown, password = 'test-password') => handler(new Request('https://example.test', { method: 'POST', headers: { 'content-type': 'application/json', 'x-admin-password': password, origin: 'http://localhost:8080' }, body: JSON.stringify(body) }));
  return { handler, request, calls };
}

test('admin counts failures with 5 per 900 seconds and 30 per 3600 seconds', async () => {
  const app = await load('admin-projects');
  expect((await app.request({ action: 'verify' }, 'wrong')).status).toBe(401);
  expect(app.calls.filter(c => c.fn === 'hit_rate_limit').map(c => [c.p_max, c.p_window_seconds])).toEqual([[5, 900], [30, 3600]]);
});
test('admin rejects blocked attempts before verification', async () => {
  const app = await load('admin-projects', true);
  expect((await app.request({ action: 'verify' })).status).toBe(429);
});
test('admin fails closed on unavailable counters', async () => {
  const app = await load('admin-projects', false, true);
  expect((await app.request({ action: 'verify' })).status).toBe(429);
});
test('images limited to 5242880 bytes and five requested formats before signing', async () => {
  const app = await load('admin-projects');
  expect((await app.request({ action: 'upload-url', fileName: 'image.png', contentType: 'image/png' })).status).toBe(200);
  expect(app.calls.find(c => c.fileSizeLimit)).toEqual({ fileSizeLimit: 5242880, allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif'] });
  expect((await app.request({ action: 'upload-url', contentType: 'image/svg+xml' })).status).toBe(400);
});
test('Jarvis limits IP to 20/600 and site to 400/86400', async () => {
  const app = await load('cyberbot-chat');
  expect((await app.request({ messages: [{ role: 'user', content: 'Bonjour' }] })).status).toBe(200);
  expect(app.calls.filter(c => c.fn).map(c => [c.p_max, c.p_window_seconds])).toEqual([[20, 600], [400, 86400]]);
});
test('Jarvis keeps ten messages, truncates questions to 1000 and responses to 2000, caps tokens to 2000', async () => {
  const app = await load('cyberbot-chat');
  await app.request({ messages: Array.from({ length: 12 }, (_, i) => ({ role: i % 2 ? 'user' : 'assistant', content: 'x'.repeat(3000) })) });
  const payload = app.calls.find(c => c.model);
  expect(payload.messages.length).toBe(11);
  expect(payload.messages.slice(1).map((m: any) => m.content.length)).toEqual([2000,1000,2000,1000,2000,1000,2000,1000,2000,1000]);
  expect(payload.max_tokens).toBe(2000);
});
test('Jarvis fails closed on counter errors and handles null history safely', async () => {
  const app = await load('cyberbot-chat', false, true);
  expect((await app.request({ messages: [{ role: 'user', content: 'Bonjour' }] })).status).toBe(429);
  const valid = await load('cyberbot-chat');
  expect((await valid.request({ messages: [null] })).status).toBe(400);
});
