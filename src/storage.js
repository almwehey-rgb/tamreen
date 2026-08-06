import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://unsxzbrpqvppecjnirqx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuc3h6YnJwcXZwcGVjam5pcnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDEyNzksImV4cCI6MjEwMTUxNzI3OX0.Ru-ysj0LHXVNnmaJRW_BS8v8MlvYyo5YxJRS_GpKwhw";
const ROW_ID = "turki";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function lsKey(key, shared) {
  return (shared ? "shared:" : "priv:") + key;
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

window.storage = {
  get: async function (key, shared) {
    try {
      const { data, error } = await withTimeout(
        supabase.from("app_state").select("data").eq("id", ROW_ID).maybeSingle(),
        4000
      );
      if (!error && data && data.data && Object.keys(data.data).length > 0) {
        const value = JSON.stringify(data.data);
        try { localStorage.setItem(lsKey(key, shared), value); } catch (e) { /* quota or private mode */ }
        return { key, value, shared: !!shared };
      }
    } catch (e) { /* offline or unreachable — fall back to local cache below */ }
    try {
      const v = localStorage.getItem(lsKey(key, shared));
      if (v === null) return null;
      return { key, value: v, shared: !!shared };
    } catch (e) {
      return null;
    }
  },
  set: async function (key, value, shared) {
    try {
      localStorage.setItem(lsKey(key, shared), value);
    } catch (e) { /* quota or private mode — Supabase sync below still attempted */ }
    try {
      const parsed = JSON.parse(value);
      await withTimeout(
        supabase.from("app_state").upsert({ id: ROW_ID, data: parsed, updated_at: new Date().toISOString() }),
        4000
      );
    } catch (e) { /* best-effort sync; local save already succeeded */ }
    return { key, value, shared: !!shared };
  },
  delete: async function (key, shared) {
    try {
      localStorage.removeItem(lsKey(key, shared));
      return { key, deleted: true, shared: !!shared };
    } catch (e) {
      return null;
    }
  },
  list: async function (prefix, shared) {
    const keys = [];
    const p = lsKey(prefix || "", shared);
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.indexOf(p) === 0) keys.push(k.slice((shared ? "shared:" : "priv:").length));
    }
    return { keys, prefix, shared: !!shared };
  },
};
