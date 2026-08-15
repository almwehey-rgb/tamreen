import { COLORS, FONT_HEAD } from "../lib/theme.js";
import { t } from "../lib/i18n.js";
import { Modal, Button } from "./ui.jsx";

export default function ResultModal({ open, onClose, lang, winnerName, forfeitName, autoRemoved, onRemoveWinner }) {
  return (
    <Modal open={open} onClose={onClose} title={t(lang, "winner")}>
      <div style={{ textAlign: "center", padding: "10px 4px 22px" }}>
        <div
          style={{
            fontFamily: FONT_HEAD,
            fontWeight: 900,
            fontSize: 30,
            color: COLORS.text,
            wordBreak: "break-word",
          }}
        >
          {winnerName}
        </div>

        {forfeitName && (
          <div
            style={{
              marginTop: 18,
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: COLORS.accentSoft,
              borderRadius: 14,
              padding: "10px 20px",
            }}
          >
            <div style={{ fontSize: 11.5, color: COLORS.accent, fontWeight: 700 }}>{t(lang, "forfeitDrawn")}</div>
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 17, color: COLORS.text }}>{forfeitName}</div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <Button full variant="primary" onClick={onClose}>
          {t(lang, "spinAgain")}
        </Button>
        {!autoRemoved && (
          <Button full variant="danger" onClick={onRemoveWinner}>
            {t(lang, "removeWinner")}
          </Button>
        )}
      </div>
    </Modal>
  );
}
