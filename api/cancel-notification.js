// Cancels a previously scheduled push (e.g. the user dismissed the rest
// timer early, or switched exercises before it fired).

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messageId } = req.body || {};
  if (!messageId) return res.status(400).json({ error: "Missing messageId" });

  const token = process.env.QSTASH_TOKEN;
  if (!token) return res.status(500).json({ error: "QSTASH_TOKEN not configured" });

  try {
    const r = await fetch(`https://qstash.upstash.io/v2/messages/${messageId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    // QStash 404s if it already fired/was removed — not an error for our purposes.
    return res.status(200).json({ ok: r.ok || r.status === 404 });
  } catch (e) {
    return res.status(200).json({ ok: false });
  }
}
