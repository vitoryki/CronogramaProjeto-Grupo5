// Função serverless da Vercel: guarda o estado compartilhado numa tabela do Supabase.
// Variáveis de ambiente (Vercel > Settings > Environment Variables):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
const T = "kv_store_3d9d32df", KEY = "project-state";
module.exports = async (req, res) => {
  const { SUPABASE_URL: u, SUPABASE_SERVICE_ROLE_KEY: k } = process.env;
  res.setHeader("Cache-Control", "no-store");
  if (!u || !k) return res.status(500).json({ error: "Variáveis do Supabase não configuradas" });
  const h = { apikey: k, Authorization: `Bearer ${k}`, "Content-Type": "application/json" };
  try {
    if (req.method === "GET") {
      const r = await fetch(`${u}/rest/v1/${T}?key=eq.${KEY}&select=value`, { headers: h });
      if (!r.ok) return res.status(502).json({ error: await r.text() });
      const rows = await r.json();
      return res.json({ state: rows[0]?.value ?? null });
    }
    if (req.method === "PUT") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const updatedAt = new Date().toISOString();
      const r = await fetch(`${u}/rest/v1/${T}?on_conflict=key`, {
        method: "POST",
        headers: { ...h, Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ key: KEY, value: { ...body, updatedAt } }),
      });
      if (!r.ok) return res.status(502).json({ error: await r.text() });
      return res.json({ ok: true, updatedAt });
    }
    res.setHeader("Allow", "GET, PUT").status(405).end();
  } catch (err) { res.status(500).json({ error: String(err) }); }
};
