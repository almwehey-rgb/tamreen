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

export function SectionTitle({ children, action }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "22px 2px 10px" }}>
      <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 15, color: COLORS.text, margin: 0 }}>
        {children}
      </h2>
      {action}
    </div>
  );
}

export function Button({ children, onClick, variant = "primary", icon, style, type = "button", full, disabled }) {
  const variants = {
    primary: { background: COLORS.gold, color: "#1a1508", border: "none" },
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

export function IconButton({ icon, onClick, variant = "ghost", size = 36, label }) {
  const bg = variant === "danger" ? COLORS.redBg : variant === "gold" ? COLORS.goldBg : COLORS.surface2;
  const color = variant === "danger" ? COLORS.red : variant === "gold" ? COLORS.gold : COLORS.textDim;
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

export function Input({ value, onChange, placeholder, type = "text", inputMode, suffix, autoFocus }) {
  return (
    <div style={{ position: "relative" }}>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        autoFocus={autoFocus}
        style={{ ...inputStyle, paddingLeft: suffix ? 52 : inputStyle.padding }}
      />
      {suffix && (
        <span
          style={{
            position: "absolute",
            left: 13,
            top: "50%",
            transform: "translateY(-50%)",
            color: COLORS.textFaint,
            fontSize: 12.5,
            fontFamily: FONT_BODY,
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}

export function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange} style={{ ...inputStyle, appearance: "none" }}>
      {options.map((o) => (
        <option key={o.value} value={o.value} style={{ background: COLORS.surface2 }}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Textarea({ value, onChange, placeholder, rows = 2 }) {
  return <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{ ...inputStyle, resize: "none", fontFamily: FONT_BODY }} />;
}

export function Segmented({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", background: COLORS.surface2, borderRadius: 12, padding: 4, gap: 4 }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            style={{
              flex: 1,
              border: "none",
              borderRadius: 9,
              padding: "9px 6px",
              fontFamily: FONT_BODY,
              fontWeight: 700,
              fontSize: 13,
              background: active ? o.color || COLORS.gold : "transparent",
              color: active ? "#1a1508" : COLORS.textDim,
              transition: "background .15s",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function ProgressBar({ value, max, color = COLORS.gold, height = 9 }) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div style={{ height, borderRadius: height, background: COLORS.surface3, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", borderRadius: height, background: color, transition: "width .3s ease" }} />
    </div>
  );
}

export function Stat({ label, value, sub, subColor, align = "start" }) {
  return (
    <div style={{ textAlign: align }}>
      <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: COLORS.textFaint, marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 18, color: COLORS.text }}>{value}</div>
      {sub && (
        <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: subColor || COLORS.textDim, marginTop: 2 }}>{sub}</div>
      )}
    </div>
  );
}

export function EmptyState({ icon, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", padding: "34px 20px", color: COLORS.textFaint }}>
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
        background: "rgba(8,8,9,0.6)",
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
          <IconButton icon={<XIcon size={17} />} onClick={onClose} label="إغلاق" />
        </div>
        {children}
        {footer && <div style={{ marginTop: 18 }}>{footer}</div>}
      </div>
    </div>
  );
}
