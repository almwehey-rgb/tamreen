import React, { useState, useEffect, useRef, useCallback } from "react";

const COLORS = {
  bg: "#0B0D12", surface: "#12151C", surface2: "#181B24", surface3: "#20242F",
  line: "#262B36", text: "#F4F1EA", muted: "#9398A6", mutedDim: "#5C616E",
  gold: "#F2B705", goldDim: "#9C7C08", danger: "#E1637C", green: "#3AAFA9",
};

const WHEEL_COLORS = ["#F2545B", "#F2B705", "#3AAFA9", "#7B61FF", "#FF8C42", "#4CC9F0", "#B5179E", "#43AA8B"];

const STORAGE_KEY = "spin-it-wheel-v1";
const MAX_HISTORY = 50;
const SPIN_MIN_MS = 4200;
const SPIN_MAX_MS = 5200;
const DEFAULT_NAMES = ["أحمد", "سعود", "فهد", "نواف", "بندر"];

const ghostBtnStyle = {
  flex: 1, background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 10,
  padding: "10px 8px", color: COLORS.muted, fontSize: 13, fontWeight: 700, cursor: "pointer",
};
const iconBtnStyle = {
  background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 10, width: 40, height: 40,
  color: COLORS.text, fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center",
};

function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }

function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(ts, lang) {
  try {
    return new Date(ts).toLocaleTimeString(lang === "ar" ? "ar-SA" : "en-US", { hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return "";
  }
}

let sharedCtx = null;
function ensureAudioCtx() {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  if (!sharedCtx) sharedCtx = new Ctor();
  if (sharedCtx.state === "suspended") sharedCtx.resume().catch(() => {});
  return sharedCtx;
}

function playTick(ctx) {
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 720;
    gain.gain.setValueAtTime(0.16, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {}
}

function playWin(ctx) {
  if (!ctx) return;
  try {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const t0 = ctx.currentTime + i * 0.1;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(0.18, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.4);
    });
  } catch (e) {}
}

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { if (window.console) console.error(error, info); }
  render() {
    if (this.state.error) {
      return (
        <div dir="ltr" style={{ background: COLORS.bg, color: "#E6A28D", minHeight: "50vh", padding: 20, fontFamily: "monospace", fontSize: 12, whiteSpace: "pre-wrap", textAlign: "left" }}>
          <div style={{ color: COLORS.gold, fontWeight: 800, marginBottom: 10, fontFamily: "'Cairo', sans-serif", fontSize: 15 }}>حدث خطأ في التطبيق — Something broke</div>
          {String((this.state.error && this.state.error.message) || this.state.error)}
          <div style={{ marginTop: 16 }}>
            <button onClick={() => this.setState({ error: null })} style={{ background: COLORS.gold, color: "#1a1508", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 800, cursor: "pointer" }}>حاول مرة ثانية</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function Switch({ checked, onChange, label, disabled }) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      style={{
        display: "flex", alignItems: "center", gap: 12, background: "none", border: "none",
        cursor: disabled ? "default" : "pointer", padding: "12px 2px", width: "100%", textAlign: "start",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{
        position: "relative", width: 42, height: 24, borderRadius: 999,
        background: checked ? COLORS.gold : COLORS.surface3, transition: "background 0.2s", flexShrink: 0,
      }}>
        <span style={{
          position: "absolute", top: 2, insetInlineStart: checked ? 20 : 2, width: 20, height: 20,
          borderRadius: "50%", background: "#fff", transition: "inset-inline-start 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,.4)",
        }} />
      </span>
      <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>{label}</span>
    </button>
  );
}

function EditableList({ items, setItems, T, placeholder, accent, emptyHint, disabled }) {
  const [text, setText] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const clearTimer = useRef(null);
  useEffect(() => () => { if (clearTimer.current) clearTimeout(clearTimer.current); }, []);

  const add = () => {
    if (disabled) return;
    const v = text.trim();
    if (!v) return;
    setItems(prev => [...prev, v]);
    setText("");
  };
  const remove = (idx) => { if (!disabled) setItems(prev => prev.filter((_, i) => i !== idx)); };
  const shuffle = () => { if (!disabled) setItems(prev => shuffled(prev)); };
  const handleClear = () => {
    if (disabled) return;
    if (confirmClear) {
      setItems([]);
      setConfirmClear(false);
      if (clearTimer.current) clearTimeout(clearTimer.current);
      return;
    }
    setConfirmClear(true);
    clearTimer.current = setTimeout(() => setConfirmClear(false), 3000);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={text}
          disabled={disabled}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") add(); }}
          placeholder={placeholder}
          style={{
            flex: 1, background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 10,
            padding: "12px 14px", color: COLORS.text, fontSize: 15, fontFamily: "inherit", outline: "none",
            opacity: disabled ? 0.5 : 1,
          }}
        />
        <button onClick={add} disabled={disabled} style={{
          background: accent, color: "#1a1508", border: "none", borderRadius: 10, padding: "0 18px",
          fontWeight: 800, fontSize: 15, cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.5 : 1,
        }}>{T("إضافة", "Add")}</button>
      </div>

      {items.length > 0 && (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={shuffle} disabled={disabled} style={{ ...ghostBtnStyle, opacity: disabled ? 0.5 : 1 }}>{"🔀 " + T("خلط الترتيب", "Shuffle")}</button>
          <button onClick={handleClear} disabled={disabled} style={{ ...ghostBtnStyle, opacity: disabled ? 0.5 : 1, color: confirmClear ? COLORS.danger : COLORS.muted, borderColor: confirmClear ? COLORS.danger : COLORS.line }}>
            {confirmClear ? T("تأكيد الحذف؟", "Confirm clear?") : T("مسح الكل", "Clear all")}
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <div style={{ color: COLORS.mutedDim, fontSize: 14, textAlign: "center", padding: "30px 10px" }}>{emptyHint}</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
              background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: "10px 12px",
            }}>
              <span style={{ color: COLORS.text, fontSize: 15, wordBreak: "break-word" }}>{item}</span>
              <button onClick={() => remove(i)} disabled={disabled} style={{
                background: "none", border: "none", color: COLORS.mutedDim, fontSize: 18,
                cursor: disabled ? "default" : "pointer", lineHeight: 1, padding: 4, opacity: disabled ? 0.5 : 1,
              }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Wheel({ names, rotation, spinning, onSpin, T, disabled }) {
  const n = names.length;
  const seg = n > 0 ? 360 / n : 360;
  const background = n > 0
    ? `conic-gradient(from 0deg, ${names.map((_, i) => {
        const c = WHEEL_COLORS[i % WHEEL_COLORS.length];
        return `${c} ${(i / n) * 100}% ${((i + 1) / n) * 100}%`;
      }).join(", ")})`
    : COLORS.surface3;
  const fontVmin = Math.max(1.6, 3.6 - n * 0.09).toFixed(2);

  return (
    <div style={{ width: "min(84vw, 52vh, 460px)", aspectRatio: "1", margin: "0 auto", position: "relative" }}>
      <div style={{
        position: "absolute", top: "-3%", left: "50%", transform: "translateX(-50%)", zIndex: 3,
        width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent",
        borderTop: `26px solid ${COLORS.gold}`, filter: "drop-shadow(0 2px 4px rgba(0,0,0,.5))",
      }} />
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%", position: "relative", overflow: "hidden",
        background, transform: `rotate(${rotation}deg)`,
        boxShadow: `0 0 0 6px ${COLORS.bg}, 0 0 0 9px rgba(242,183,5,.35), 0 20px 50px rgba(0,0,0,.5)`,
      }}>
        {n > 0 && names.map((name, i) => {
          const center = n === 1 ? 0 : i * seg + seg / 2;
          const flip = center > 90 && center < 270;
          return (
            <div key={i} style={{ position: "absolute", inset: 0, transform: `rotate(${center}deg)` }}>
              <div style={{
                position: "absolute", top: "7%", left: "50%",
                transform: `translateX(-50%) rotate(${flip ? 180 : 0}deg)`,
                width: "36%", textAlign: "center", color: "#fff", fontWeight: 800,
                fontSize: `${fontVmin}vmin`, textShadow: "0 1px 3px rgba(0,0,0,.55)",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>{name}</div>
            </div>
          );
        })}
        {n > 1 && names.map((_, i) => (
          <div key={"d" + i} style={{ position: "absolute", inset: 0, transform: `rotate(${i * seg}deg)` }}>
            <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "50%", background: "rgba(0,0,0,.15)" }} />
          </div>
        ))}
        {n === 0 && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.mutedDim, fontSize: 14, textAlign: "center", padding: 20 }}>
            {T("أضف أسماء", "Add names")}
          </div>
        )}
      </div>
      <button
        onClick={onSpin}
        disabled={disabled}
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "26%", height: "26%", borderRadius: "50%", zIndex: 4,
          background: `radial-gradient(circle at 35% 30%, #FFE18A, ${COLORS.gold} 60%, ${COLORS.goldDim})`,
          border: `3px solid ${COLORS.bg}`, boxShadow: "0 6px 18px rgba(0,0,0,.5)",
          color: "#1a1508", fontWeight: 900, fontSize: "clamp(12px, 3vmin, 18px)",
          cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.5 : 1,
        }}
      >
        {spinning ? "…" : T("بداية", "GO")}
      </button>
    </div>
  );
}

function SectionTitle({ title, sub, right }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14, gap: 10 }}>
      <div>
        <div style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 800, fontSize: 19, color: COLORS.text }}>{title}</div>
        {sub && <div style={{ color: COLORS.mutedDim, fontSize: 12, marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

const TABS = [
  { key: "wheel", ar: "العجلة", en: "Wheel", icon: "🎡" },
  { key: "names", ar: "الأسماء", en: "Names", icon: "👤" },
  { key: "history", ar: "السجل", en: "History", icon: "🕘" },
];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState("ar");
  const [tab, setTab] = useState("wheel");
  const [names, setNames] = useState(DEFAULT_NAMES);
  const [removeAfterSpin, setRemoveAfterSpin] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [history, setHistory] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [displayRotation, setDisplayRotation] = useState(0);
  const [winnerReveal, setWinnerReveal] = useState(null);
  const [toast, setToast] = useState(null);

  const rotationRef = useRef(0);
  const animRef = useRef(null);
  const tickSegRef = useRef(0);
  const saveTimer = useRef(null);
  const toastTimer = useRef(null);
  const firstLoad = useRef(true);

  const T = useCallback((ar, en) => (lang === "ar" ? ar : en), [lang]);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          if (Array.isArray(parsed.names)) setNames(parsed.names);
          if (Array.isArray(parsed.history)) setHistory(parsed.history);
          if (typeof parsed.removeAfterSpin === "boolean") setRemoveAfterSpin(parsed.removeAfterSpin);
          if (typeof parsed.soundOn === "boolean") setSoundOn(parsed.soundOn);
          if (parsed.lang) setLang(parsed.lang);
        }
      } catch (e) { /* nothing saved yet */ }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (firstLoad.current) { firstLoad.current = false; return; }
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify({
          names, history, removeAfterSpin, soundOn, lang,
        }), false);
        setToast(T("تم الحفظ", "Saved"));
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 1100);
      } catch (e) { /* ignore */ }
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [names, history, removeAfterSpin, soundOn, lang, loaded]);

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

  const spin = useCallback(() => {
    if (spinning || names.length === 0) return;
    const ctx = soundOn ? ensureAudioCtx() : null;
    const n = names.length;
    const seg = 360 / n;
    const winnerIndex = Math.floor(Math.random() * n);
    const jitter = (Math.random() - 0.5) * seg * 0.7;
    const targetCenter = winnerIndex * seg + seg / 2 + jitter;
    const desiredMod = (360 - (((targetCenter % 360) + 360) % 360)) % 360;
    const current = rotationRef.current;
    const currentMod = ((current % 360) + 360) % 360;
    let delta = desiredMod - currentMod;
    if (delta < 0) delta += 360;
    const extraTurns = 5 + Math.floor(Math.random() * 4);
    const finalRotation = current + extraTurns * 360 + delta;
    const duration = SPIN_MIN_MS + Math.random() * (SPIN_MAX_MS - SPIN_MIN_MS);

    setSpinning(true);
    setWinnerReveal(null);
    tickSegRef.current = Math.floor(currentMod / seg);
    const startRotation = current;
    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3.5);
      const value = startRotation + (finalRotation - startRotation) * eased;
      rotationRef.current = value;
      setDisplayRotation(value);
      if (ctx) {
        const mod = ((value % 360) + 360) % 360;
        const segIdx = Math.floor(mod / seg);
        if (segIdx !== tickSegRef.current) {
          tickSegRef.current = segIdx;
          playTick(ctx);
        }
      }
      if (t < 1) {
        animRef.current = requestAnimationFrame(frame);
      } else {
        rotationRef.current = finalRotation;
        setDisplayRotation(finalRotation);
        setSpinning(false);
        const name = names[winnerIndex];
        const entry = { id: uid(), name, time: Date.now(), removed: removeAfterSpin };
        setHistory(prev => [entry, ...prev].slice(0, MAX_HISTORY));
        setWinnerReveal(entry);
        if (ctx) playWin(ctx);
        if (removeAfterSpin) {
          setNames(prev => prev.filter((_, i) => i !== winnerIndex));
        }
      }
    };
    animRef.current = requestAnimationFrame(frame);
  }, [spinning, names, removeAfterSpin, soundOn]);

  const undoLast = useCallback(() => {
    if (history.length === 0) return;
    const last = history[0];
    setHistory(prev => prev.slice(1));
    if (last.removed) setNames(prev => [...prev, last.name]);
    setWinnerReveal(w => (w && w.id === last.id ? null : w));
  }, [history]);

  const clearHistory = useCallback(() => setHistory([]), []);

  if (!loaded) {
    return (
      <div style={{ background: COLORS.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: COLORS.gold, fontFamily: "'Cairo', sans-serif", fontWeight: 800 }}>...</div>
      </div>
    );
  }

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <ErrorBoundary>
      <div className="app-shell" dir={dir} style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "'Tajawal', sans-serif", minHeight: "100vh", paddingBottom: 92 }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700;800;900&family=Tajawal:wght@400;500;700&display=swap');
          * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
          html, body { background: ${COLORS.bg}; color-scheme: dark; margin: 0; }
          input::placeholder { color: ${COLORS.mutedDim}; }
          button { font-family: inherit; }
          .app-shell { width: 100%; max-width: 640px; margin: 0 auto; position: relative; }
        `}</style>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 16px 4px" }}>
          <div style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 900, fontSize: 22, color: COLORS.gold, display: "flex", alignItems: "center", gap: 8 }}>
            <span>🎡</span><span>{T("دوّرها", "Spin It")}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setSoundOn(s => !s)} style={iconBtnStyle} aria-label="sound">{soundOn ? "🔊" : "🔇"}</button>
            <button onClick={() => setLang(l => (l === "ar" ? "en" : "ar"))} style={iconBtnStyle}>{lang === "ar" ? "EN" : "AR"}</button>
          </div>
        </div>

        {tab === "wheel" && (
          <div style={{ padding: "20px 16px 10px", textAlign: "center" }}>
            <Wheel names={names} rotation={displayRotation} spinning={spinning} onSpin={spin} T={T} disabled={spinning || names.length === 0} />

            {names.length === 0 && (
              <div style={{ color: COLORS.mutedDim, marginTop: 16, fontSize: 14 }}>
                {T("أضف أسماء من تبويب «الأسماء» أولاً", "Add names from the Names tab first")}
              </div>
            )}

            <button
              onClick={spin}
              disabled={spinning || names.length === 0}
              style={{
                marginTop: 22, background: spinning || names.length === 0 ? COLORS.surface3 : COLORS.gold,
                color: spinning || names.length === 0 ? COLORS.mutedDim : "#1a1508", border: "none", borderRadius: 14,
                padding: "16px 40px", fontWeight: 900, fontSize: 18,
                cursor: spinning || names.length === 0 ? "default" : "pointer", width: "min(100%, 320px)",
              }}
            >
              {spinning ? T("جارِ الدوران…", "Spinning…") : T("بداية", "Start")}
            </button>

            <div style={{
              background: COLORS.surface, border: `1px solid ${COLORS.line}`, borderRadius: 14,
              padding: "2px 16px", marginTop: 20, textAlign: "start", maxWidth: 320, marginInline: "auto",
            }}>
              <Switch checked={removeAfterSpin} onChange={setRemoveAfterSpin} disabled={spinning}
                label={T("حذف الفائز تلقائياً بعد كل لفة", "Remove winner after each spin")} />
            </div>

            {history.length > 0 && (
              <button onClick={undoLast} disabled={spinning} style={{
                ...ghostBtnStyle, marginTop: 16, width: "min(100%, 320px)", opacity: spinning ? 0.5 : 1,
              }}>{"↩ " + T("تراجع عن آخر لفة", "Undo last spin")}</button>
            )}
          </div>
        )}

        {tab === "names" && (
          <div style={{ padding: "20px 16px" }}>
            <SectionTitle title={T("قائمة الأسماء", "Names List")} sub={T(`${names.length} اسم`, `${names.length} names`)} />
            <EditableList
              items={names} setItems={setNames} T={T} accent={COLORS.gold}
              placeholder={T("اسم جديد…", "New name…")}
              emptyHint={T("ما في أسماء بعد. أضف أول اسم فوق.", "No names yet. Add your first name above.")}
              disabled={spinning}
            />
          </div>
        )}

        {tab === "history" && (
          <div style={{ padding: "20px 16px" }}>
            <SectionTitle
              title={T("سجل اللفات", "Spin History")}
              right={history.length > 0 && <button onClick={clearHistory} style={ghostBtnStyle}>{T("مسح السجل", "Clear")}</button>}
            />
            {history.length === 0 ? (
              <div style={{ color: COLORS.mutedDim, fontSize: 14, textAlign: "center", padding: "40px 10px" }}>{T("لسا ما فيه لفات.", "No spins yet.")}</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {history.map((h) => (
                  <div key={h.id} style={{
                    background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: "12px 14px",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10,
                  }}>
                    <div style={{ color: COLORS.text, fontWeight: 800, fontSize: 15 }}>{h.name}</div>
                    <div style={{ color: COLORS.mutedDim, fontSize: 12, whiteSpace: "nowrap" }}>{formatTime(h.time, lang)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {winnerReveal && (
          <div
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,.72)", zIndex: 50,
              display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
            }}
            onClick={() => setWinnerReveal(null)}
          >
            <div onClick={e => e.stopPropagation()} style={{
              background: COLORS.surface, border: `1px solid ${COLORS.line}`, borderRadius: 20,
              padding: "32px 24px", width: "min(92vw, 380px)", textAlign: "center",
              boxShadow: "0 24px 60px rgba(0,0,0,.6)",
            }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
              <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 6 }}>{T("الفائز", "Winner")}</div>
              <div style={{
                color: COLORS.gold, fontWeight: 900, fontSize: 30, fontFamily: "'Cairo', sans-serif",
                marginBottom: 22, wordBreak: "break-word",
              }}>{winnerReveal.name}</div>
              <button onClick={() => setWinnerReveal(null)} style={{
                background: COLORS.gold, color: "#1a1508", border: "none", borderRadius: 12,
                padding: "12px 24px", fontWeight: 800, fontSize: 15, cursor: "pointer", width: "100%",
              }}>{T("تم", "Done")}</button>
            </div>
          </div>
        )}

        {toast && (
          <div style={{
            position: "fixed", bottom: 78, left: "50%", transform: "translateX(-50%)", background: COLORS.surface2,
            border: `1px solid ${COLORS.line}`, borderRadius: 20, padding: "8px 16px", fontSize: 12,
            color: COLORS.muted, zIndex: 40,
          }}>{toast}</div>
        )}

        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 30,
          background: COLORS.surface, borderTop: `1px solid ${COLORS.line}`,
          display: "flex", maxWidth: 640, margin: "0 auto", boxShadow: "0 -8px 24px rgba(0,0,0,.35)",
        }}>
          {TABS.map(tb => (
            <button key={tb.key} onClick={() => setTab(tb.key)} style={{
              flex: 1, background: "none", border: "none", padding: "10px 4px 12px", cursor: "pointer",
              color: tab === tb.key ? COLORS.gold : COLORS.mutedDim, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 3,
            }}>
              <span style={{ fontSize: 18 }}>{tb.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700 }}>{T(tb.ar, tb.en)}</span>
            </button>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}
