import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface TowerCraneProps {
  onBack: () => void;
}

// ── Constants ──
const CANVAS_W = 480;
const CANVAS_H = 680;
const GRAVITY = 0.22;
const CRANE_SPEED_BASE = 1.8;
const PLATFORM_W = 160;
const PLATFORM_H = 16;
const PLATFORM_X = (CANVAS_W - PLATFORM_W) / 2;
const PLATFORM_Y = CANVAS_H - 100;
const VOID_Y = CANVAS_H; // blocks falling past this are lost
const BLOCK_COLORS = ['#f5c518', '#e6a817', '#d4d4d4', '#b0b0b0', '#f59e0b', '#78716c', '#c2956b'];
const LS_KEY = 'tower-crane-best';
const MAX_MISSED = 3;
const ALIGN_BONUS_PX = 8;

// ── Crane geometry ──
const CRANE_BASE_X = 60;
const CRANE_BASE_Y = PLATFORM_Y;
const CRANE_TOWER_H = PLATFORM_Y - 30;
const CRANE_ARM_Y = 30;
const CRANE_ARM_LEFT = CRANE_BASE_X;
const CRANE_ARM_RIGHT = CANVAS_W - 20;
const HOOK_Y_BASE = CRANE_ARM_Y + 8;
const CABLE_LENGTH = 40;

interface Block {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  color: string;
  settled: boolean;
  falling: boolean; // falling into void
  rotation: number;
  vRotation: number;
}

type Shape = { w: number; h: number };
const SHAPES: Shape[] = [
  { w: 60, h: 30 },
  { w: 80, h: 25 },
  { w: 50, h: 40 },
  { w: 100, h: 20 },
  { w: 45, h: 35 },
  { w: 70, h: 28 },
];

function randomShape(): Shape {
  return SHAPES[Math.floor(Math.random() * SHAPES.length)];
}
function randomColor(): string {
  return BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)];
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

const TowerCrane: React.FC<TowerCraneProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stateRef = useRef<{
    blocks: Block[];
    trolleyX: number; // trolley position along arm
    trolleyDir: number;
    pending: { shape: Shape; color: string } | null;
    dropping: Block | null;
    score: number;
    bestScore: number;
    missed: number;
    gameOver: boolean;
    shakeFrames: number;
    started: boolean;
    craneSpeed: number;
    particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[];
  }>({
    blocks: [],
    trolleyX: CANVAS_W / 2,
    trolleyDir: 1,
    pending: { shape: randomShape(), color: randomColor() },
    dropping: null,
    score: 0,
    bestScore: parseInt(localStorage.getItem(LS_KEY) || '0', 10),
    missed: 0,
    gameOver: false,
    shakeFrames: 0,
    started: false,
    craneSpeed: CRANE_SPEED_BASE,
    particles: [],
  });

  const rafRef = useRef<number>(0);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [bestScore, setBestScore] = useState(() => parseInt(localStorage.getItem(LS_KEY) || '0', 10));
  const [gameOver, setGameOver] = useState(false);

  // ── Drop ──
  const drop = useCallback(() => {
    const s = stateRef.current;
    if (s.gameOver || s.dropping || !s.pending) return;
    s.started = true;
    const shape = s.pending.shape;
    const block: Block = {
      x: s.trolleyX - shape.w / 2,
      y: HOOK_Y_BASE + CABLE_LENGTH,
      w: shape.w,
      h: shape.h,
      vx: 0,
      vy: 0,
      color: s.pending.color,
      settled: false,
      falling: false,
      rotation: 0,
      vRotation: 0,
    };
    s.dropping = block;
    s.pending = null;
  }, []);

  // ── Restart ──
  const restart = useCallback(() => {
    const s = stateRef.current;
    s.blocks = [];
    s.trolleyX = CANVAS_W / 2;
    s.trolleyDir = 1;
    s.pending = { shape: randomShape(), color: randomColor() };
    s.dropping = null;
    s.score = 0;
    s.missed = 0;
    s.gameOver = false;
    s.shakeFrames = 0;
    s.started = false;
    s.craneSpeed = CRANE_SPEED_BASE;
    s.particles = [];
    setScore(0);
    setMissed(0);
    setGameOver(false);
  }, []);

  // ── Helpers ──
  function endGame(s: typeof stateRef.current) {
    s.gameOver = true;
    if (s.score > s.bestScore) {
      s.bestScore = s.score;
      localStorage.setItem(LS_KEY, String(s.score));
      setBestScore(s.score);
    }
    setGameOver(true);
  }

  function spawnParticles(s: typeof stateRef.current, x: number, y: number, color: string, count: number) {
    for (let i = 0; i < count; i++) {
      s.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 3 - 1,
        life: 30 + Math.random() * 20,
        color,
      });
    }
  }

  // ── Game loop ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const loop = () => {
      const s = stateRef.current;

      // ── UPDATE ──
      if (!s.gameOver) {
        // Trolley moves along crane arm
        if (!s.dropping) {
          s.trolleyX += s.craneSpeed * s.trolleyDir;
          if (s.trolleyX > CRANE_ARM_RIGHT) { s.trolleyDir = -1; s.trolleyX = CRANE_ARM_RIGHT; }
          if (s.trolleyX < CRANE_ARM_LEFT + 40) { s.trolleyDir = 1; s.trolleyX = CRANE_ARM_LEFT + 40; }
        }

        // Dropping block
        if (s.dropping) {
          const b = s.dropping;
          b.vy += GRAVITY;
          b.y += b.vy;
          b.x += b.vx;

          // Find best landing surface
          let landY = PLATFORM_Y - b.h; // platform top
          let landedOnSurface = false;
          let landedOnBlock: Block | null = null;

          // Check platform
          const overlapPlatform = Math.min(b.x + b.w, PLATFORM_X + PLATFORM_W) - Math.max(b.x, PLATFORM_X);
          if (overlapPlatform > b.w * 0.15) {
            landedOnSurface = true;
          }

          // Check settled blocks
          for (const sb of s.blocks) {
            if (!sb.settled || sb.falling) continue;
            const overlapX = Math.min(b.x + b.w, sb.x + sb.w) - Math.max(b.x, sb.x);
            if (overlapX > 4) {
              const topOfBlock = sb.y - b.h;
              if (topOfBlock < landY) {
                landY = topOfBlock;
                landedOnBlock = sb;
                landedOnSurface = true;
              }
            }
          }

          // If no surface overlap → will it miss?
          if (!landedOnSurface && b.y + b.h > PLATFORM_Y) {
            // Block missed → falls into void
            b.falling = true;
            b.vRotation = (Math.random() - 0.5) * 0.1;
            s.blocks.push(b);
            s.dropping = null;
            s.missed += 1;
            setMissed(s.missed);
            s.shakeFrames = 8;
            if (s.missed >= MAX_MISSED) {
              endGame(s);
            } else {
              s.pending = { shape: randomShape(), color: randomColor() };
              s.craneSpeed = CRANE_SPEED_BASE + s.score * 0.05;
            }
          } else if (landedOnSurface && b.y >= landY) {
            // Landed!
            b.y = landY;
            b.vy = 0;
            b.vx = 0;
            b.settled = true;

            // Check stability: how much of the block is supported?
            let supportWidth = 0;
            // Support from platform
            const platOverlap = Math.min(b.x + b.w, PLATFORM_X + PLATFORM_W) - Math.max(b.x, PLATFORM_X);
            if (b.y + b.h >= PLATFORM_Y - 2 && platOverlap > 0) supportWidth = Math.max(supportWidth, platOverlap);
            // Support from other blocks directly below
            for (const sb of s.blocks) {
              if (!sb.settled || sb.falling) continue;
              if (Math.abs((sb.y) - (b.y + b.h)) < 3) {
                const ov = Math.min(b.x + b.w, sb.x + sb.w) - Math.max(b.x, sb.x);
                if (ov > 0) supportWidth = Math.max(supportWidth, ov);
              }
            }

            const supportRatio = supportWidth / b.w;
            if (supportRatio < 0.2) {
              // Not enough support → block slides off
              b.settled = false;
              b.falling = true;
              b.vx = (b.x + b.w / 2 > CANVAS_W / 2) ? 1.5 : -1.5;
              b.vy = -1;
              b.vRotation = (Math.random() - 0.5) * 0.08;
              s.blocks.push(b);
              s.dropping = null;
              s.missed += 1;
              setMissed(s.missed);
              s.shakeFrames = 10;
              if (s.missed >= MAX_MISSED) {
                endGame(s);
              } else {
                s.pending = { shape: randomShape(), color: randomColor() };
              }
            } else {
              // Stable landing
              s.score += 1;
              // Alignment bonus
              const blockCenter = b.x + b.w / 2;
              const platformCenter = PLATFORM_X + PLATFORM_W / 2;
              // Check alignment with platform or block below
              let alignRef = platformCenter;
              if (landedOnBlock) alignRef = landedOnBlock.x + landedOnBlock.w / 2;
              if (Math.abs(blockCenter - alignRef) < ALIGN_BONUS_PX) {
                s.score += 1;
                spawnParticles(s, blockCenter, b.y, '#f5c518', 8);
              }
              setScore(s.score);
              s.shakeFrames = 3;
              spawnParticles(s, blockCenter, b.y + b.h, '#a3a3a3', 5);

              s.blocks.push(b);
              s.dropping = null;
              s.pending = { shape: randomShape(), color: randomColor() };
              s.craneSpeed = CRANE_SPEED_BASE + s.score * 0.04;
            }
          }
        }

        // Animate falling blocks
        for (const b of s.blocks) {
          if (b.falling) {
            b.vy += GRAVITY * 0.8;
            b.y += b.vy;
            b.x += b.vx;
            b.rotation += b.vRotation;
          }
        }
        // Remove blocks that fell out of view
        s.blocks = s.blocks.filter(b => !(b.falling && b.y > VOID_Y + 100));
      }

      // Particles
      s.particles = s.particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.life--;
        return p.life > 0;
      });

      if (s.shakeFrames > 0) s.shakeFrames--;

      // ── DRAW ──
      ctx.save();
      if (s.shakeFrames > 0) {
        ctx.translate((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
      }

      // Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
      skyGrad.addColorStop(0, '#0f1729');
      skyGrad.addColorStop(0.5, '#1a2540');
      skyGrad.addColorStop(1, '#2a1a1a');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Void below platform – dark with hazard stripes
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, PLATFORM_Y + PLATFORM_H, CANVAS_W, CANVAS_H - PLATFORM_Y - PLATFORM_H);
      // Hazard stripes at edges
      const stripeW = 8;
      ctx.fillStyle = '#f5c518';
      for (let i = 0; i < CANVAS_H - PLATFORM_Y; i += stripeW * 2) {
        ctx.globalAlpha = 0.3;
        // Left edge
        ctx.fillRect(0, PLATFORM_Y + PLATFORM_H + i, 4, stripeW);
        // Right edge
        ctx.fillRect(CANVAS_W - 4, PLATFORM_Y + PLATFORM_H + i, 4, stripeW);
      }
      ctx.globalAlpha = 1;

      // ── Draw Crane ──
      // Tower (vertical)
      ctx.strokeStyle = '#f5c518';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(CRANE_BASE_X, CRANE_BASE_Y);
      ctx.lineTo(CRANE_BASE_X, CRANE_ARM_Y);
      ctx.stroke();
      // Lattice pattern on tower
      ctx.strokeStyle = 'rgba(245,197,24,0.3)';
      ctx.lineWidth = 1;
      for (let ty = CRANE_ARM_Y; ty < CRANE_BASE_Y; ty += 20) {
        ctx.beginPath();
        ctx.moveTo(CRANE_BASE_X - 3, ty);
        ctx.lineTo(CRANE_BASE_X + 3, ty + 20);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(CRANE_BASE_X + 3, ty);
        ctx.lineTo(CRANE_BASE_X - 3, ty + 20);
        ctx.stroke();
      }

      // Arm (horizontal)
      ctx.strokeStyle = '#f5c518';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(CRANE_BASE_X - 20, CRANE_ARM_Y);
      ctx.lineTo(CRANE_ARM_RIGHT + 10, CRANE_ARM_Y);
      ctx.stroke();

      // Counter-weight
      ctx.fillStyle = '#78716c';
      ctx.fillRect(CRANE_BASE_X - 25, CRANE_ARM_Y - 8, 20, 16);

      // Cab
      ctx.fillStyle = '#f5c518';
      ctx.fillRect(CRANE_BASE_X - 8, CRANE_ARM_Y, 16, 18);
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(CRANE_BASE_X - 5, CRANE_ARM_Y + 2, 10, 8);

      // Trolley
      const tx = s.dropping ? s.dropping.x + s.dropping.w / 2 : s.trolleyX;
      ctx.fillStyle = '#d4d4d4';
      ctx.fillRect(tx - 8, CRANE_ARM_Y - 4, 16, 8);

      // Cable from trolley to hook/block
      const hookEndY = s.dropping
        ? s.dropping.y
        : HOOK_Y_BASE + CABLE_LENGTH;
      ctx.strokeStyle = '#a3a3a3';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tx, CRANE_ARM_Y + 4);
      ctx.lineTo(tx, hookEndY);
      ctx.stroke();

      // Hook
      if (!s.dropping) {
        ctx.fillStyle = '#d4d4d4';
        ctx.beginPath();
        ctx.arc(tx, hookEndY + 4, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Platform
      const platGrad = ctx.createLinearGradient(PLATFORM_X, PLATFORM_Y, PLATFORM_X, PLATFORM_Y + PLATFORM_H);
      platGrad.addColorStop(0, '#6b6b6b');
      platGrad.addColorStop(1, '#4a4a4a');
      ctx.fillStyle = platGrad;
      ctx.fillRect(PLATFORM_X, PLATFORM_Y, PLATFORM_W, PLATFORM_H);
      // Platform top line
      ctx.fillStyle = '#f5c518';
      ctx.fillRect(PLATFORM_X, PLATFORM_Y, PLATFORM_W, 2);
      // Platform supports (legs going into void)
      ctx.strokeStyle = '#4a4a4a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(PLATFORM_X + 10, PLATFORM_Y + PLATFORM_H);
      ctx.lineTo(PLATFORM_X + 10, CANVAS_H);
      ctx.moveTo(PLATFORM_X + PLATFORM_W - 10, PLATFORM_Y + PLATFORM_H);
      ctx.lineTo(PLATFORM_X + PLATFORM_W - 10, CANVAS_H);
      ctx.stroke();

      // Pending block
      if (s.pending && !s.dropping) {
        const shape = s.pending.shape;
        const bx = s.trolleyX - shape.w / 2;
        const by = HOOK_Y_BASE + CABLE_LENGTH;
        ctx.fillStyle = s.pending.color;
        ctx.fillRect(bx, by, shape.w, shape.h);
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, shape.w, shape.h);
        // Brick texture
        drawBrickTexture(ctx, bx, by, shape.w, shape.h);
      }

      // Dropping block
      if (s.dropping && !s.dropping.falling) {
        const b = s.dropping;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
        drawBrickTexture(ctx, b.x, b.y, b.w, b.h);
      }

      // Settled blocks
      for (const b of s.blocks) {
        if (b.falling) {
          ctx.save();
          ctx.translate(b.x + b.w / 2, b.y + b.h / 2);
          ctx.rotate(b.rotation);
          ctx.globalAlpha = clamp(1 - (b.y - PLATFORM_Y) / 200, 0.2, 1);
          ctx.fillStyle = b.color;
          ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
          ctx.strokeStyle = 'rgba(0,0,0,0.2)';
          ctx.strokeRect(-b.w / 2, -b.h / 2, b.w, b.h);
          ctx.restore();
        } else {
          ctx.fillStyle = b.color;
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeStyle = 'rgba(0,0,0,0.25)';
          ctx.lineWidth = 1;
          ctx.strokeRect(b.x, b.y, b.w, b.h);
          drawBrickTexture(ctx, b.x, b.y, b.w, b.h);
        }
      }

      // Particles
      for (const p of s.particles) {
        ctx.globalAlpha = p.life / 50;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
      }
      ctx.globalAlpha = 1;

      // HUD
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${s.score}`, 12, CRANE_ARM_Y + 50);
      ctx.textAlign = 'right';
      ctx.fillText(`Best: ${s.bestScore}`, CANVAS_W - 12, CRANE_ARM_Y + 50);
      // Missed indicator
      ctx.textAlign = 'center';
      ctx.font = '14px monospace';
      ctx.fillStyle = '#f87171';
      const hearts = '❌'.repeat(s.missed) + '✅'.repeat(MAX_MISSED - s.missed);
      ctx.fillText(hearts, CANVAS_W / 2, CRANE_ARM_Y + 50);

      // Start hint
      if (!s.started && !s.gameOver) {
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Espace / Clic pour lâcher', CANVAS_W / 2, PLATFORM_Y - 60);
        ctx.font = '13px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText('3 blocs dans le vide = Game Over', CANVAS_W / 2, PLATFORM_Y - 38);
      }

      // Game over overlay
      if (s.gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = '#f5c518';
        ctx.font = 'bold 36px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', CANVAS_W / 2, CANVAS_H / 2 - 40);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px monospace';
        ctx.fillText(`Score: ${s.score}`, CANVAS_W / 2, CANVAS_H / 2 + 5);
        ctx.font = '16px monospace';
        ctx.fillStyle = '#a3a3a3';
        ctx.fillText(`Meilleur: ${s.bestScore}`, CANVAS_W / 2, CANVAS_H / 2 + 35);
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Inputs ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); drop(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [drop]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between w-full">
        <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>
        <div className="flex gap-3 items-center">
          <span className="text-sm font-bold text-primary font-mono">Score : {score}</span>
          <span className="text-xs text-muted-foreground font-mono">❌ {missed}/{MAX_MISSED}</span>
          <span className="text-sm text-muted-foreground font-mono">Best : {bestScore}</span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        onClick={drop}
        onTouchStart={(e) => { e.preventDefault(); drop(); }}
        className="rounded-2xl border border-border shadow-lg cursor-pointer bg-card max-w-full"
        style={{ touchAction: 'none', aspectRatio: `${CANVAS_W}/${CANVAS_H}`, width: '100%', maxWidth: CANVAS_W }}
      />

      {gameOver && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
          <Button onClick={restart} className="gap-2"><RotateCcw className="h-4 w-4" /> Rejouer</Button>
          <Button variant="outline" onClick={onBack} className="gap-2"><ArrowLeft className="h-4 w-4" /> Mini-jeux</Button>
        </motion.div>
      )}
    </motion.div>
  );
};

// ── Brick texture helper ──
function drawBrickTexture(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  ctx.lineWidth = 0.5;
  const brickH = 10;
  for (let row = 0; row < Math.floor(h / brickH); row++) {
    const by = y + row * brickH;
    ctx.beginPath();
    ctx.moveTo(x, by);
    ctx.lineTo(x + w, by);
    ctx.stroke();
    const offset = row % 2 === 0 ? 0 : w / 3;
    for (let bx = offset; bx < w; bx += w / 2) {
      ctx.beginPath();
      ctx.moveTo(x + bx, by);
      ctx.lineTo(x + bx, by + brickH);
      ctx.stroke();
    }
  }
}

export default TowerCrane;
