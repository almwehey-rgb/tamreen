import { useState } from "react";
import { COLORS, FONT_HEAD } from "../lib/theme.js";
import { t } from "../lib/i18n.js";
import { uid } from "../lib/wheelMath.js";
import { Modal, Input, Button, IconButton, Textarea, EmptyState } from "./ui.jsx";
import { UsersIcon, SkullIcon, PlusIcon, TrashIcon, ShuffleIcon } from "../lib/icons.jsx";

export default function ListsModal({ open, onClose, lang, mode, items, onAdd, onBulkAdd, onRemove, onClear, onShuffle }) {
  const [value, setValue] = useState("");
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkValue, setBulkValue] = useState("");

  const isNames = mode === "names";
  const title = isNames ? t(lang, "manageNames") : t(lang, "manageForfeits");
  const placeholder = isNames ? t(lang, "namePlaceholder") : t(lang, "forfeitPlaceholder");
  const Icon = isNames ? UsersIcon : SkullIcon;

  function submit() {
    const v = value.trim();
    if (!v) return;
    onAdd(v);
    setValue("");
  }

  function submitBulk() {
    const names = bulkValue
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (names.length === 0) return;
    onBulkAdd(names);
    setBulkValue("");
    setBulkOpen(false);
  }

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={placeholder}
            autoFocus
          />
        </div>
        <IconButton icon={<PlusIcon size={18} />} variant="accent" onClick={submit} label={t(lang, "add")} size={44} />
      </div>

      {!bulkOpen ? (
        <button
          type="button"
          onClick={() => setBulkOpen(true)}
          style={{
            background: "none",
            border: "none",
            color: COLORS.accent,
            fontSize: 12.5,
            fontWeight: 700,
            padding: "0 0 14px",
            fontFamily: FONT_HEAD,
          }}
        >
          {isNames ? t(lang, "bulkAddTitle") : t(lang, "bulkAddForfeitsTitle")}
        </button>
      ) : (
        <div style={{ marginBottom: 14 }}>
          <Textarea
            value={bulkValue}
            onChange={(e) => setBulkValue(e.target.value)}
            placeholder={isNames ? t(lang, "bulkAddPlaceholder") : t(lang, "bulkAddForfeitsPlaceholder")}
            rows={4}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <Button variant="primary" onClick={submitBulk} style={{ flex: 1 }}>
              {t(lang, "bulkAddAction")}
            </Button>
            <Button variant="ghost" onClick={() => setBulkOpen(false)}>
              {t(lang, "close")}
            </Button>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <Button variant="outline" icon={<ShuffleIcon size={15} />} onClick={onShuffle} style={{ flex: 1 }}>
            {t(lang, "shuffle")}
          </Button>
          <Button variant="danger" icon={<TrashIcon size={15} />} onClick={onClear} style={{ flex: 1 }}>
            {t(lang, "clearAll")}
          </Button>
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState icon={<Icon size={26} />} title={isNames ? t(lang, "emptyNamesTitle") : t(lang, "noForfeits")} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: COLORS.surface2,
                borderRadius: 12,
                padding: "9px 10px 9px 14px",
              }}
            >
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: COLORS.text }}>{item.name}</span>
              <IconButton icon={<TrashIcon size={14} />} variant="danger" size={30} onClick={() => onRemove(item.id)} label={t(lang, "remove")} />
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
