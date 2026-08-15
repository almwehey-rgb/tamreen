import { COLORS, FONT_HEAD } from "../lib/theme.js";
import { t } from "../lib/i18n.js";
import { Card, Button, EmptyState } from "./ui.jsx";
import { ClockIcon, TrashIcon } from "../lib/icons.jsx";

function relativeTime(ts, lang) {
  const diffMin = Math.floor((Date.now() - ts) / 60000);
  if (diffMin < 1) return t(lang, "justNow");
  if (diffMin < 60) return t(lang, "minutesAgo", diffMin);
  return new Date(ts).toLocaleTimeString(lang === "ar" ? "en-US" : "en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function History({ lang, entries, onClear }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <ClockIcon size={17} color={COLORS.textDim} />
          <span style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 14.5, color: COLORS.text }}>
            {t(lang, "history")}
          </span>
        </div>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            style={{ background: "none", border: "none", color: COLORS.textFaint, fontSize: 12, fontWeight: 700 }}
          >
            {t(lang, "clearHistory")}
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <Card>
          <EmptyState icon={<ClockIcon size={24} />} title={t(lang, "noHistory")} />
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {entries.map((e) => (
            <Card key={e.id} padding={12}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {e.winnerName}
                  </div>
                  {e.forfeitName && (
                    <div style={{ fontSize: 11.5, color: COLORS.accent, marginTop: 1 }}>{e.forfeitName}</div>
                  )}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textFaint, flexShrink: 0 }}>{relativeTime(e.timestamp, lang)}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
