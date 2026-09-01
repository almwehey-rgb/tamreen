// Schedules a push notification to fire `delaySeconds` from now, using
// Upstash QStash's delayed-publish feature to call /api/send-notification
// at the right time. No database — the subscription/title/body just ride
// along as the QStash message payload.

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { subscription, delaySeconds, title, body } = req.body || {};
  if (!subscription || !delaySeconds || !title) {
    return res.status(400).json({ error: "Missing subscription, delaySeconds, or title" });
  }

  const token = process.env.QSTASH_TOKEN;
  if (!token) return res.status(500).json({ error: "QSTASH_TOKEN not configured" });

  const proto = req.headers["x-forwarded-proto"] || "https";
  const destination = `${proto}://${req.headers.host}/api/send-notification`;

  try {
    const qstashRes = await fetch(`https://qstash.upstash.io/v2/publish/${destination}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Upstash-Delay": `${Math.max(1, Math.round(delaySeconds))}s`,
      },
      body: JSON.stringify({ subscription, title, body }),
    });
    if (!qstashRes.ok) {
      const detail = await qstashRes.text();
      return res.status(502).json({ error: "QStash publish failed", detail });
    }
    const data = await qstashRes.json();
    return res.status(200).json({ messageId: data.messageId });
  } catch (e) {
    return res.status(500).json({ error: "Schedule failed", detail: String(e) });
  }
}
