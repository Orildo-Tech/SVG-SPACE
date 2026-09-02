const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const {
    slug,
    title,
    aliases = [],
    hex = 'FF5F02',
    hexes = [],
    categories = ['Software'],
    variants = {},
    license = 'Apache-2.0',
    url = `https://${slug}.com`,
  } = payload;

  if (!slug || !title) {
    return json({ error: 'slug and title are required' }, 400);
  }

  const variantKeys = Object.keys(variants);
  if (variantKeys.length === 0) {
    return json({ error: 'At least one SVG variant is required' }, 400);
  }

  const SUPABASE_URL = env?.SUPABASE_URL || env?.VITE_DATABASE_URL || '';
  const SUPABASE_ANON_KEY = env?.SUPABASE_ANON_KEY || env?.VITE_DATABASE_KEY || '';

  try {
    const edgeRes = await fetch(`${SUPABASE_URL}/functions/v1/submit-icon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const edgeData = await edgeRes.json();
    return json(edgeData, edgeRes.status);
  } catch (err) {
    return json({ error: err.message || 'Failed to communicate with submission engine' }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}
