window.storage = {
  get: async function (key, shared) {
    try {
      const v = localStorage.getItem((shared ? "shared:" : "priv:") + key);
      if (v === null) return null;
      return { key, value: v, shared: !!shared };
    } catch (e) {
      return null;
    }
  },
  set: async function (key, value, shared) {
    try {
      localStorage.setItem((shared ? "shared:" : "priv:") + key, value);
      return { key, value, shared: !!shared };
    } catch (e) {
      return null;
    }
  },
  delete: async function (key, shared) {
    try {
      localStorage.removeItem((shared ? "shared:" : "priv:") + key);
      return { key, deleted: true, shared: !!shared };
    } catch (e) {
      return null;
    }
  },
  list: async function (prefix, shared) {
    const keys = [];
    const p = (shared ? "shared:" : "priv:") + (prefix || "");
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.indexOf(p) === 0) keys.push(k.slice((shared ? "shared:" : "priv:").length));
    }
    return { keys, prefix, shared: !!shared };
  },
};
