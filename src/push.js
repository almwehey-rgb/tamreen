// push.js — Web Push subscription + scheduling helpers for the rest timer.
// Real background delivery (works even if the tab/app is fully closed),
// backed by serverless functions in /api that use Upstash QStash to
// schedule a delayed call which then sends the actual push via VAPID.

export const VAPID_PUBLIC_KEY =
  "BPrzcQEDTkqHhzjqJDeBBFvtvHp7CMPbzCGQcLW_GITRMoS4Q9_JjTP7B0hrgn-WLqzdPQvMe0Tsn2qWiLL3NiQ";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
  return output;
}

export function pushSupported() {
  return typeof navigator !== "undefined" && "serviceWorker" in navigator && "PushManager" in window;
}

export async function getExistingPushSubscription() {
  if (!pushSupported()) return null;
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return null;
    const sub = await reg.pushManager.getSubscription();
    return sub ? sub.toJSON() : null;
  } catch (e) {
    return null;
  }
}

export async function subscribeToPush() {
  if (!pushSupported()) return null;
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;
  try {
    const reg = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }
    return sub.toJSON();
  } catch (e) {
    return null;
  }
}

export async function scheduleRestNotification({ subscription, delaySeconds, title, body }) {
  try {
    const res = await fetch("/api/schedule-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscription, delaySeconds, title, body }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.messageId || null;
  } catch (e) {
    return null;
  }
}

export function cancelRestNotification(messageId) {
  if (!messageId) return;
  fetch("/api/cancel-notification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messageId }),
  }).catch(() => {});
}
