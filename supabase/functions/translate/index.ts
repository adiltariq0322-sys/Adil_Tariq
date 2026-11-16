import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LANG_NAMES: Record<string, string> = {
  en: "English",
  ur: "Urdu",
  ar: "Arabic",
  hi: "Hindi",
  es: "Spanish",
  fr: "French",
  de: "German",
  zh: "Chinese (Simplified)",
  pt: "Portuguese",
  ru: "Russian",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { texts, target } = await req.json();
    if (!Array.isArray(texts) || !target) {
      return new Response(JSON.stringify({ error: "texts (array) and target required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const targetName = LANG_NAMES[target] || target;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const systemPrompt = `You are a professional translator. Translate the provided array of UI strings into ${targetName}.

Rules:
- Preserve meaning, tone, and any inline punctuation/emojis exactly.
- Do NOT translate: proper nouns ("Adil Tariq", "Innovex", "WhatsApp", "Gmail", "Python", "RAG", "n8n", "FastAPI", "OpenAI", "Gemini", "Lovable", "Supabase", brand/product names, URLs, email addresses, phone numbers).
- Keep length comparable to the source.
- Return STRICTLY a JSON array of strings, same length and same order as input. Index N in output corresponds to index N in input.
- For ${targetName === "Arabic" || targetName === "Urdu" ? "RTL" : "LTR"} script, use natural native phrasing.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(texts) },
        ],
        tools: [{
          type: "function",
          function: {
            name: "return_translations",
            description: "Return translations as a JSON array of strings in the same order as input.",
            parameters: {
              type: "object",
              properties: {
                translations: {
                  type: "array",
                  items: { type: "string" },
                  description: "Translated strings in the same order as input.",
                },
              },
              required: ["translations"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "return_translations" } },
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Translation credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "Translation service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) throw new Error("No translation returned");
    const parsed = JSON.parse(args);
    const translations: string[] = parsed.translations || [];

    // Pad/trim to match length, fallback to original on missing
    const result = texts.map((t: string, i: number) =>
      typeof translations[i] === "string" && translations[i].length > 0 ? translations[i] : t
    );

    return new Response(JSON.stringify({ translations: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("translate error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
