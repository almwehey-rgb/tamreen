import { useEffect, useState } from "react";
import { COLORS, FONT_HEAD, FONT_BODY } from "./lib/theme.js";
import { DEFAULT_STATE, STORAGE_KEY } from "./lib/constants.js";
import { uid, todayISO } from "./lib/format.js";
import { HomeIcon, WalletIcon, CoinIcon, PiggyIcon, SettingsIcon } from "./lib/icons.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Accounts from "./components/Accounts.jsx";
import Gold from "./components/Gold.jsx";
import Savings from "./components/Savings.jsx";
import Settings from "./components/Settings.jsx";

const TABS = [
  { id: "home", label: "الرئيسية", icon: HomeIcon },
  { id: "accounts", label: "الحسابات", icon: WalletIcon },
  { id: "gold", label: "الذهب", icon: CoinIcon },
  { id: "savings", label: "الادخار", icon: PiggyIcon },
  { id: "settings", label: "الإعدادات", icon: SettingsIcon },
];

function mergeWithDefaults(loaded) {
  return {
    ...DEFAULT_STATE,
    ...loaded,
    gold: {
      pricePerGram: { ...DEFAULT_STATE.gold.pricePerGram, ...(loaded?.gold?.pricePerGram || {}) },
      holdings: loaded?.gold?.holdings || [],
    },
  };
}

export default function App() {
  const [state, setState] = useState(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("home");

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) setState(mergeWithDefaults(JSON.parse(res.value)));
      } catch (e) {
        // ignore corrupt/missing state, fall back to defaults
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.storage.set(STORAGE_KEY, JSON.stringify(state), false);
  }, [state, loaded]);

  const actions = {
    setCurrency: (currency) => setState((s) => ({ ...s, currency })),
    setMonthlyIncome: (monthlyIncome) => setState((s) => ({ ...s, monthlyIncome })),
    resetAll: () => setState(DEFAULT_STATE),
    replaceAll: (next) => setState(mergeWithDefaults(next)),

    addAccount: (account) =>
      setState((s) => ({
        ...s,
        accounts: [...s.accounts, { id: uid("acc"), createdAt: todayISO(), balance: 0, ...account }],
      })),
    updateAccount: (id, patch) =>
      setState((s) => ({ ...s, accounts: s.accounts.map((a) => (a.id === id ? { ...a, ...patch } : a)) })),
    deleteAccount: (id) =>
      setState((s) => ({
        ...s,
        accounts: s.accounts.filter((a) => a.id !== id),
        transactions: s.transactions.filter((t) => t.accountId !== id && t.toAccountId !== id),
      })),

    addTransaction: (tx) =>
      setState((s) => {
        const amount = Number(tx.amount) || 0;
        const accounts = s.accounts.map((a) => {
          if (tx.type === "income" && a.id === tx.accountId) return { ...a, balance: a.balance + amount };
          if (tx.type === "expense" && a.id === tx.accountId) return { ...a, balance: a.balance - amount };
          if (tx.type === "transfer" && a.id === tx.accountId) return { ...a, balance: a.balance - amount };
          if (tx.type === "transfer" && a.id === tx.toAccountId) return { ...a, balance: a.balance + amount };
          return a;
        });
        return {
          ...s,
          accounts,
          transactions: [{ id: uid("tx"), createdAt: Date.now(), ...tx, amount }, ...s.transactions],
        };
      }),
    deleteTransaction: (id) =>
      setState((s) => {
        const tx = s.transactions.find((t) => t.id === id);
        if (!tx) return s;
        const accounts = s.accounts.map((a) => {
          if (tx.type === "income" && a.id === tx.accountId) return { ...a, balance: a.balance - tx.amount };
          if (tx.type === "expense" && a.id === tx.accountId) return { ...a, balance: a.balance + tx.amount };
          if (tx.type === "transfer" && a.id === tx.accountId) return { ...a, balance: a.balance + tx.amount };
          if (tx.type === "transfer" && a.id === tx.toAccountId) return { ...a, balance: a.balance - tx.amount };
          return a;
        });
        return { ...s, accounts, transactions: s.transactions.filter((t) => t.id !== id) };
      }),

    setGoldPrice: (karat, price) =>
      setState((s) => ({ ...s, gold: { ...s.gold, pricePerGram: { ...s.gold.pricePerGram, [karat]: price } } })),
    addGoldHolding: (holding) =>
      setState((s) => ({ ...s, gold: { ...s.gold, holdings: [{ id: uid("gold"), ...holding }, ...s.gold.holdings] } })),
    updateGoldHolding: (id, patch) =>
      setState((s) => ({
        ...s,
        gold: { ...s.gold, holdings: s.gold.holdings.map((h) => (h.id === id ? { ...h, ...patch } : h)) },
      })),
    deleteGoldHolding: (id) =>
      setState((s) => ({ ...s, gold: { ...s.gold, holdings: s.gold.holdings.filter((h) => h.id !== id) } })),

    addGoal: (goal) =>
      setState((s) => ({ ...s, goals: [{ id: uid("goal"), currentAmount: 0, ...goal }, ...s.goals] })),
    updateGoal: (id, patch) =>
      setState((s) => ({ ...s, goals: s.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)) })),
    deleteGoal: (id) => setState((s) => ({ ...s, goals: s.goals.filter((g) => g.id !== id) })),
    addToGoal: (id, amount) =>
      setState((s) => ({
        ...s,
        goals: s.goals.map((g) => (g.id === id ? { ...g, currentAmount: Math.max(0, g.currentAmount + amount) } : g)),
      })),

    addInvestment: (inv) =>
      setState((s) => ({ ...s, investments: [{ id: uid("inv"), ...inv }, ...s.investments] })),
    updateInvestment: (id, patch) =>
      setState((s) => ({ ...s, investments: s.investments.map((i) => (i.id === id ? { ...i, ...patch } : i)) })),
    deleteInvestment: (id) => setState((s) => ({ ...s, investments: s.investments.filter((i) => i.id !== id) })),
  };

  if (!loaded) {
    return <div style={{ minHeight: "100vh", background: COLORS.bg }} />;
  }

  const props = { state, actions, currency: state.currency, onNavigate: setTab };

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: FONT_BODY,
        paddingBottom: 92,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700;800;900&family=Tajawal:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        button, select, input, textarea { font-family: 'Tajawal', sans-serif; }
        button { cursor: pointer; }
        ::selection { background: ${COLORS.goldBg}; }
      `}</style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: `${COLORS.bg}e6`,
          backdropFilter: "blur(8px)",
          padding: "calc(16px + env(safe-area-inset-top)) 18px 12px",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              background: COLORS.goldBg,
              color: COLORS.gold,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CoinIcon size={19} />
          </div>
          <div>
            <h1 style={{ fontFamily: FONT_HEAD, fontWeight: 900, fontSize: 17, margin: 0, color: COLORS.text }}>
              محفظتي
            </h1>
            <div style={{ fontSize: 11.5, color: COLORS.textFaint }}>مالي · ذهبي · ادخاري</div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 480, margin: "0 auto", padding: "14px 16px 8px" }}>
        {tab === "home" && <Dashboard {...props} />}
        {tab === "accounts" && <Accounts {...props} />}
        {tab === "gold" && <Gold {...props} />}
        {tab === "savings" && <Savings {...props} />}
        {tab === "settings" && <Settings {...props} />}
      </main>

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: `${COLORS.surface}f2`,
          backdropFilter: "blur(10px)",
          borderTop: `1px solid ${COLORS.border}`,
          paddingBottom: "env(safe-area-inset-bottom)",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex" }}>
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  color: active ? COLORS.gold : COLORS.textFaint,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  padding: "10px 2px 8px",
                }}
              >
                <Icon size={21} strokeWidth={active ? 2.1 : 1.7} />
                <span style={{ fontSize: 10.5, fontWeight: active ? 800 : 500 }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
