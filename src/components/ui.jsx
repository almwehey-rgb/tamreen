import { useEffect } from "react";
import { COLORS, FONT_HEAD, FONT_BODY } from "../lib/theme.js";
import { XIcon } from "../lib/icons.jsx";

export function Card({ children, style, onClick, padding = 16 }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 18,
        padding,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Button({ children, onClick, variant = "primary", icon, style, type = "button", full, disabled }) {
  const variants = {
    primary: { background: COLORS.accent, color: COLORS.accentText, border: "none" },
    outline: { background: "transparent", color: COLORS.text, border: `1px solid ${COLORS.border}` },
    ghost: { background: COLORS.surface2, color: COLORS.text, border: "none" },
    danger: { background: COLORS.redBg, color: COLORS.red, border: "none" },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        fontFamily: FONT_BODY,
        fontWeight: 700,
        fontSize: 14,
        padding: "11px 16px",
        borderRadius: 13,
        width: full ? "100%" : undefined,
        opacity: disabled ? 0.5 : 1,
        ...variants[variant],
        ...style,
      }}
    >
      {icon}
      {children}
    </button>
  );
}

export function IconButton({ icon, onClick, variant = "ghost", size = 38, label }) {
  const bg = variant === "danger" ? COLORS.redBg : variant === "accent" ? COLORS.accentSoft : COLORS.surface2;
  const color = variant === "danger" ? COLORS.red : variant === "accent" ? COLORS.accent : COLORS.textDim;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2.6,
        border: "none",
        background: bg,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </button>
  );
}

export function Field({ label, children }) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      {label && (
        <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: COLORS.textDim, marginBottom: 6, fontWeight: 700 }}>
          {label}
        </div>
      )}
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: COLORS.surface2,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 12,
  padding: "11px 13px",
  color: COLORS.text,
  fontFamily: FONT_BODY,
  fontSize: 14.5,
  outline: "none",
};

export function Input({ value, onChange, placeholder, type = "text", autoFocus, onKeyDown }) {
  return (
    <input
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      type={type}
      autoFocus={autoFocus}
      style={inputStyle}
    />
  );
}

export function Textarea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{ ...inputStyle, resize: "none", fontFamily: FONT_BODY }}
    />
  );
}

export function Switch({ checked, onChange, label, hint }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "transparent",
        border: "none",
        padding: "10px 0",
        textAlign: "start",
      }}
    >
      <span
        style={{
          width: 42,
          height: 25,
          borderRadius: 13,
          background: checked ? COLORS.accent : COLORS.surface3,
          position: "relative",
          flexShrink: 0,
          transition: "background .15s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2.5,
            insetInlineStart: checked ? 19 : 2.5,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            transition: "inset-inline-start .15s",
          }}
        />
      </span>
      <span style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 13.5, color: COLORS.text }}>{label}</div>
        {hint && <div style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: COLORS.textFaint, marginTop: 2 }}>{hint}</div>}
      </span>
    </button>
  );
}

export function EmptyState({ icon, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", padding: "30px 20px", color: COLORS.textFaint }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10, opacity: 0.7 }}>{icon}</div>
      <div style={{ fontFamily: FONT_BODY, fontWeight: 700, fontSize: 14.5, color: COLORS.textDim }}>{title}</div>
      {subtitle && <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, marginTop: 4 }}>{subtitle}</div>}
    </div>
  );
}

export function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(6,6,10,0.65)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 480,
          maxHeight: "88vh",
          overflowY: "auto",
          background: COLORS.surface,
          borderTop: `1px solid ${COLORS.border}`,
          borderLeft: `1px solid ${COLORS.border}`,
          borderRight: `1px solid ${COLORS.border}`,
          borderRadius: "22px 22px 0 0",
          padding: "18px 18px calc(18px + env(safe-area-inset-bottom))",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 16.5, color: COLORS.text, margin: 0 }}>
            {title}
          </h3>
          <IconButton icon={<XIcon size={17} />} onClick={onClose} label="close" />
        </div>
        {children}
        {footer && <div style={{ marginTop: 18 }}>{footer}</div>}
      </div>
    </div>
  );
}
