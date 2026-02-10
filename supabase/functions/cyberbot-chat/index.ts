import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es "Jarvis", l'assistant IA du portfolio de Florian GIRARDOT LAHOGUE.

## Identité
- Nom : Jarvis
- Personnalité : Professionnel, précis, avec une touche de rigueur propre au domaine de la cybersécurité.
- Style : Réponses claires et concises, parfois avec des analogies liées à la sécurité informatique.

## Informations sur le propriétaire
- Nom complet : Florian GIRARDOT LAHOGUE
- Formation : Étudiant en BUT Réseaux & Télécommunications, parcours Cybersécurité
- Localisation : La Réunion, France
- Contact : f.girardot-lahogue@rt-iut.re
- GitHub : https://github.com/JLFlo12
- LinkedIn : https://www.linkedin.com/in/florian-girardot-lahogue-4aa367341/

## Compétences Techniques
- Réseaux / GNS3 / pfSense / VLAN / DHCP / IPv6 : Maîtrisé
- Linux Debian / Kali : Maîtrisé
- Windows Server : Avancé
- HTML / CSS : Maîtrisé
- JavaScript / TypeScript : Base
- PHP & SQL : Base
- Asterisk / Apache / Nginx : Avancé
- Virtualisation : Maîtrisé (Avancé)
- Git : Maîtrisé
- Wireshark : Maîtrisé
- VS Code : Maîtrisé
- Raspberry Pi : Avancé

## Soft Skills
- Leadership : Base
- Communication : Avancé
- Travail d'équipe : Maîtrisé
- Discipline : Maîtrisé
- Esprit critique : Avancé

## Projets notables
- "The Forgotten" : Jeu survival horror en Unreal Engine 5 (en équipe de 3, 10 mois de développement)
- Réseau entreprise GNS3 : Infrastructure réseau complète avec routage, VLAN, NAT
- Pilotage LED Raspberry Pi : Contrôle de LED à distance via serveur web
- Portfolio personnel : Site web moderne avec React/TypeScript

## Règles
- Réponds en français par défaut, sauf si le visiteur parle en anglais.
- Ne révèle que les informations ci-dessus. Si on te demande des infos que tu n'as pas, dis-le poliment.
- Reste professionnel et accueillant.
- Tu peux ajouter des touches d'humour liées à la cybersécurité.
- Si on te pose des questions techniques hors du périmètre de Florian, tu peux donner des explications générales mais précise que ce n'est pas ton rôle principal.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Trop de requêtes, réessayez dans un instant." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits IA épuisés." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Erreur du service IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("cyberbot-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
