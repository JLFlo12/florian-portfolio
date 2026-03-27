import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-password",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate admin password
  const adminPassword = req.headers.get("x-admin-password");
  const expectedPassword = Deno.env.get("ADMIN_PASSWORD");

  if (!adminPassword || adminPassword !== expectedPassword) {
    return new Response(JSON.stringify({ error: "Mot de passe incorrect" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const url = new URL(req.url);
  let action = url.searchParams.get("action");

  // Also support action from body for supabase.functions.invoke compatibility
  let body: any = {};
  try {
    body = await req.json();
    if (!action && body?.action) {
      action = body.action;
    }
  } catch {
    // No body or invalid JSON
  }

  try {
    if (action === "verify") {
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "create") {
      const { action: _, ...projectData } = body;
      const { data, error } = await supabase.from("projects").insert(projectData).select().single();
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update") {
      const { action: _, id, ...updates } = body;
      const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete") {
      const { error } = await supabase.from("projects").delete().eq("id", body.id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Action invalide" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
