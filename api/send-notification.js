// Called by QStash when a scheduled rest-timer notification is due.
// Verifies the request actually came from QStash (signature check over
// the raw body — hence bodyParser is disabled below) before sending the
// real push via web-push/VAPID.

import webpush from "web-push";
import { Receiver } from "@upstash/qstash";

export const config = { api: { bodyParser: false } };

const VAPID_SUBJECT = "mailto:support@tamreen.app";

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const rawBody = await readRawBody(req);
  const signature = req.headers["upstash-signature"];

  const receiver = new Receiver({
    currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
  });

  try {
    const isValid = await receiver.verify({ signature, body: rawBody });
    if (!isValid) return res.status(401).json({ error: "Invalid signature" });
  } catch (e) {
    return res.status(401).json({ error: "Signature verification failed" });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const { subscription, title, body } = payload;
  if (!subscription || !title) return res.status(400).json({ error: "Missing subscription or title" });

  webpush.setVapidDetails(VAPID_SUBJECT, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

  try {
    await webpush.sendNotification(subscription, JSON.stringify({ title, body }));
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "Push send failed", detail: String(e) });
  }
}
