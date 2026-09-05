// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  try {
    const payload = await req.json();
    const {
      slug,
      title,
      aliases = [],
      hex = "FF5F02",
      hexes = [],
      categories = ["Software"],
      license = "Apache-2.0",
      url = `https://${slug}.com`,
      variants = {},
    } = payload;

    if (!slug || !title) {
      return new Response(JSON.stringify({ error: "slug and title are required" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const variantKeys = Object.keys(variants);
    if (variantKeys.length === 0) {
      return new Response(JSON.stringify({ error: "At least one SVG variant is required" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    let ghPat = Deno.env.get("GH_PAT") || Deno.env.get("VITE_GH_PAT") || "";
    let ghOwner = Deno.env.get("GH_OWNER") || Deno.env.get("VITE_GH_OWNER") || "";
    let ghRepo = Deno.env.get("GH_REPO") || Deno.env.get("VITE_GH_REPO") || "SVG-SPACE";

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (!ghPat) {
      try {
        const { data: configs } = await supabase
          .from("app_config")
          .select("key, value")
          .in("key", ["github_pat", "github_owner", "github_repo"]);

        if (configs && Array.isArray(configs)) {
          const cfgMap: Record<string, string> = {};
          configs.forEach((c: { key: string; value: string }) => {
            cfgMap[c.key] = c.value;
          });
          ghPat = cfgMap["github_pat"] || ghPat;
          ghOwner = cfgMap["github_owner"] || ghOwner;
          ghRepo = cfgMap["github_repo"] || ghRepo;
        }
      } catch (dbCfgErr) {
        console.warn("Could not query app_config table:", dbCfgErr);
      }
    }

    const primaryHex = (hexes && hexes.length > 0 ? hexes[0] : hex).replace(/^#/, "").toUpperCase();
    const cleanHexes = hexes && hexes.length > 0 ? hexes.map((h: string) => h.replace(/^#/, "").toUpperCase()) : [primaryHex];

    const storagePaths: Record<string, string> = {};
    const storagePublicUrls: Record<string, string> = {};
    const variantPathMap: Record<string, string> = {};

    for (const [vKey, val] of Object.entries(variants)) {
      const filePath = `${slug}/${vKey}.svg`;
      variantPathMap[vKey] = `/icons/${slug}/${vKey}.svg`;
      storagePaths[vKey] = filePath;

      if (typeof val === "string" && val.startsWith("http")) {
        storagePublicUrls[vKey] = val;
      } else if (typeof val === "string") {
        try {
          const { error: uploadErr } = await supabase.storage
            .from("svg-icons")
            .upload(filePath, val, {
              contentType: "image/svg+xml",
              upsert: true,
            });

          if (uploadErr) {
            console.warn("Storage upload error:", uploadErr);
          }
          const { data: pubData } = supabase.storage.from("svg-icons").getPublicUrl(filePath);
          storagePublicUrls[vKey] = pubData?.publicUrl || `${supabaseUrl}/storage/v1/object/public/svg-icons/${filePath}`;
        } catch (stErr) {
          console.warn("Storage upload exception:", stErr);
          storagePublicUrls[vKey] = `${supabaseUrl}/storage/v1/object/public/svg-icons/${filePath}`;
        }
      }
    }

    let submissionId: string | number | null = null;
    try {
      const { data: subData, error: subErr } = await supabase
        .from("icon_submissions")
        .insert({
          slug,
          title,
          hex: primaryHex,
          hexes: cleanHexes,
          categories: Array.isArray(categories) ? categories : [categories],
          license,
          url,
          variants: variantPathMap,
          status: "pending",
          storage_paths: storagePaths,
        })
        .select()
        .single();

      if (subErr) {
        console.warn("icon_submissions insert warning:", subErr);
      } else if (subData) {
        submissionId = subData.id;
      }
    } catch (insertErr) {
      console.warn("DB insert exception:", insertErr);
    }

    if (ghPat) {
      const dispatchRes = await fetch(
        `https://api.github.com/repos/${ghOwner}/${ghRepo}/dispatches`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ghPat}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "User-Agent": "SVG-SPACE-Supabase-Edge-Function/1.0",
          },
          body: JSON.stringify({
            event_type: "process-icon-submission",
            client_payload: {
              submission_id: submissionId,
              slug,
              title,
              hex: primaryHex,
              hexes: cleanHexes,
              categories: Array.isArray(categories) ? categories : [categories],
              aliases,
              license,
              url,
              variants: storagePublicUrls,
            },
          }),
        }
      );

      if (!dispatchRes.ok) {
        const ghErrText = await dispatchRes.text();
        console.error("GitHub dispatch failed:", ghErrText);
      }
    } else {
      console.warn("GH_PAT secret is not set in Supabase Edge Function Secrets.");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Icon "${title}" submitted! It will appear in the library after processing (usually within 7 minutes).`,
        submission_id: submissionId,
        slug,
        variants: variantKeys,
      }),
      {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Error in submit-icon function:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  }
});
