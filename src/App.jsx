import { useEffect, useRef, useState } from "react";
import { COLORS, FONT_HEAD, FONT_BODY } from "./lib/theme.js";
import { t } from "./lib/i18n.js";
import { uid, shuffleArray, computeSpinRotation } from "./lib/wheelMath.js";
import { playSpinTicks, playWinChime } from "./lib/sound.js";
import { UsersIcon, SkullIcon, GlobeIcon, SoundOnIcon, SoundOffIcon } from "./lib/icons.jsx";
import { Card, Button, IconButton, Switch } from "./components/ui.jsx";
import Wheel from "./components/Wheel.jsx";
import ListsModal from "./components/ListsModal.jsx";
import ResultModal from "./components/ResultModal.jsx";
import History from "./components/History.jsx";

const STORAGE_KEY = "spin-wheel-v1";
const SPIN_DURATION = 4.6;

const DEFAULT_STATE = {
  lang: "ar",
  names: [],
  forfeits: [],
  autoRemove: false,
  soundOn: true,
  history: [],
};

export default function App() {
  const [state, setState] = useState(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [listModal, setListModal] = useState(null); // "names" | "forfeits" | null
  const [result, setResult] = useState(null); // { winnerId, winnerName, forfeitName, autoRemoved }
  const pendingRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) setState({ ...DEFAULT_STATE, ...JSON.parse(res.value) });
      } catch (e) {
        // fall back to defaults on missing/corrupt state
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.storage.set(STORAGE_KEY, JSON.stringify(state), false);
  }, [state, loaded]);

  const lang = state.lang;
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  function toggleLang() {
    setState((s) => ({ ...s, lang: s.lang === "ar" ? "en" : "ar" }));
  }
  function toggleSound() {
    setState((s) => ({ ...s, soundOn: !s.soundOn }));
  }
  function toggleAutoRemove(v) {
    setState((s) => ({ ...s, autoRemove: v }));
  }

  function addName(name) {
    setState((s) => ({ ...s, names: [...s.names, { id: uid("n"), name }] }));
  }
  function bulkAddNames(names) {
    setState((s) => ({ ...s, names: [...s.names, ...names.map((name) => ({ id: uid("n"), name }))] }));
  }
  function removeName(id) {
    setState((s) => ({ ...s, names: s.names.filter((n) => n.id !== id) }));
  }
  function clearNames() {
    setState((s) => ({ ...s, names: [] }));
  }
  function shuffleNames() {
    setState((s) => ({ ...s, names: shuffleArray(s.names) }));
  }

  function addForfeit(name) {
    setState((s) => ({ ...s, forfeits: [...s.forfeits, { id: uid("f"), name }] }));
  }
  function bulkAddForfeits(names) {
    setState((s) => ({ ...s, forfeits: [...s.forfeits, ...names.map((name) => ({ id: uid("f"), name }))] }));
  }
  function removeForfeit(id) {
    setState((s) => ({ ...s, forfeits: s.forfeits.filter((f) => f.id !== id) }));
  }
  function clearForfeits() {
    setState((s) => ({ ...s, forfeits: [] }));
  }
  function shuffleForfeits() {
    setState((s) => ({ ...s, forfeits: shuffleArray(s.forfeits) }));
  }

  function clearHistory() {
    setState((s) => ({ ...s, history: [] }));
  }

  function spin() {
    if (spinning || state.names.length < 2) return;
    const winnerIndex = Math.floor(Math.random() * state.names.length);
    const winner = state.names[winnerIndex];
    const forfeit = state.forfeits.length > 0 ? state.forfeits[Math.floor(Math.random() * state.forfeits.length)] : null;
    pendingRef.current = { winner, forfeitName: forfeit?.name || null };

    if (state.soundOn) playSpinTicks(SPIN_DURATION);
    setSpinning(true);
    setRotation((r) => computeSpinRotation(r, state.names.length, winnerIndex));
  }

  function onWheelTransitionEnd(e) {
    if (e.propertyName !== "transform" || !pendingRef.current) return;
    const { winner, forfeitName } = pendingRef.current;
    pendingRef.current = null;
    setSpinning(false);

    if (state.soundOn) playWinChime();

    const autoRemoved = state.autoRemove;
    setState((s) => ({
      ...s,
      names: autoRemoved ? s.names.filter((n) => n.id !== winner.id) : s.names,
      history: [{ id: uid("h"), winnerName: winner.name, forfeitName, timestamp: Date.now() }, ...s.history].slice(0, 50),
    }));

    setResult({ winnerId: winner.id, winnerName: winner.name, forfeitName, autoRemoved });
  }

  function removeResultWinner() {
    if (result) removeName(result.winnerId);
    setResult(null);
  }

  if (!loaded) {
    return <div style={{ minHeight: "100vh", background: COLORS.bg }} />;
  }

  const canSpin = state.names.length >= 2 && !spinning;

  return (
    <div
      dir={dir}
      style={{
        minHeight: "100vh",
        background: `radial-gradient(circle at 50% -10%, ${COLORS.bgSoft} 0%, ${COLORS.bg} 55%)`,
        color: COLORS.text,
        fontFamily: FONT_BODY,
        paddingBottom: 40,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700;800;900&family=Tajawal:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        html, body { margin: 0; overflow-x: hidden; }
        button, select, input, textarea { font-family: 'Tajawal', sans-serif; }
        button { cursor: pointer; }
        ::selection { background: ${COLORS.accentSoft}; }
      `}</style>

      <header
        style={{
          padding: "calc(16px + env(safe-area-inset-top)) 18px 4px",
          maxWidth: 480,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ fontFamily: FONT_HEAD, fontWeight: 900, fontSize: 21, margin: 0, color: COLORS.text }}>
            {t(lang, "appName")}
          </h1>
          <div style={{ fontSize: 11.5, color: COLORS.textFaint }}>{t(lang, "tagline")}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <IconButton icon={<GlobeIcon size={17} />} onClick={toggleLang} label={t(lang, "switchLang")} />
          <IconButton
            icon={state.soundOn ? <SoundOnIcon size={17} /> : <SoundOffIcon size={17} />}
            onClick={toggleSound}
            label={t(lang, "sound")}
            variant={state.soundOn ? "accent" : "ghost"}
          />
        </div>
      </header>

      <main style={{ maxWidth: 480, margin: "0 auto", padding: "18px 16px 8px" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 24px" }}>
          <Wheel names={state.names} rotation={rotation} spinning={spinning} onTransitionEnd={onWheelTransitionEnd} />
        </div>

        <Button full variant="primary" onClick={spin} disabled={!canSpin} style={{ fontSize: 17, padding: "15px 16px" }}>
          {spinning ? t(lang, "spinning") : t(lang, "spin")}
        </Button>
        {state.names.length < 2 && (
          <div style={{ textAlign: "center", fontSize: 12, color: COLORS.textFaint, marginTop: 8 }}>
            {t(lang, "needMoreNames")}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <Card onClick={() => setListModal("names")} style={{ flex: 1 }} padding={13}>
            <UsersIcon size={18} color={COLORS.accent} />
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 14, marginTop: 8 }}>{t(lang, "names")}</div>
            <div style={{ fontSize: 11.5, color: COLORS.textFaint, marginTop: 2 }}>{t(lang, "namesCount", state.names.length)}</div>
          </Card>
          <Card onClick={() => setListModal("forfeits")} style={{ flex: 1 }} padding={13}>
            <SkullIcon size={18} color={COLORS.accent} />
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 14, marginTop: 8 }}>{t(lang, "forfeits")}</div>
            <div style={{ fontSize: 11.5, color: COLORS.textFaint, marginTop: 2 }}>{t(lang, "forfeitsCount", state.forfeits.length)}</div>
          </Card>
        </div>

        <Card style={{ marginTop: 14 }} padding={14}>
          <Switch checked={state.autoRemove} onChange={toggleAutoRemove} label={t(lang, "autoRemove")} hint={t(lang, "autoRemoveHint")} />
        </Card>

        <div style={{ marginTop: 22 }}>
          <History lang={lang} entries={state.history} onClear={clearHistory} />
        </div>
      </main>

      <ListsModal
        open={listModal === "names"}
        onClose={() => setListModal(null)}
        lang={lang}
        mode="names"
        items={state.names}
        onAdd={addName}
        onBulkAdd={bulkAddNames}
        onRemove={removeName}
        onClear={clearNames}
        onShuffle={shuffleNames}
      />
      <ListsModal
        open={listModal === "forfeits"}
        onClose={() => setListModal(null)}
        lang={lang}
        mode="forfeits"
        items={state.forfeits}
        onAdd={addForfeit}
        onBulkAdd={bulkAddForfeits}
        onRemove={removeForfeit}
        onClear={clearForfeits}
        onShuffle={shuffleForfeits}
      />
      <ResultModal
        open={!!result}
        onClose={() => setResult(null)}
        lang={lang}
        winnerName={result?.winnerName}
        forfeitName={result?.forfeitName}
        autoRemoved={result?.autoRemoved}
        onRemoveWinner={removeResultWinner}
      />
    </div>
  );
}
