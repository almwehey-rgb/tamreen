const ARABIC_INDIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toEnglishDigits(value) {
  if (value === null || value === undefined) return value;
  return String(value).replace(/[٠-٩۰-۹]/g, (d) => {
    const a = ARABIC_INDIC_DIGITS.indexOf(d);
    if (a > -1) return String(a);
    const p = PERSIAN_DIGITS.indexOf(d);
    if (p > -1) return String(p);
    return d;
  });
}

export function parseNumber(value) {
  if (typeof value === "number") return isNaN(value) ? 0 : value;
  const cleaned = toEnglishDigits(value ?? "").replace(/[^\d.\-]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

export const CURRENCIES = {
  KWD: { symbol: "د.ك", decimals: 3, name: "دينار كويتي" },
  SAR: { symbol: "ر.س", decimals: 2, name: "ريال سعودي" },
  AED: { symbol: "د.إ", decimals: 2, name: "درهم إماراتي" },
  QAR: { symbol: "ر.ق", decimals: 2, name: "ريال قطري" },
  BHD: { symbol: "د.ب", decimals: 3, name: "دينار بحريني" },
  OMR: { symbol: "ر.ع", decimals: 3, name: "ريال عماني" },
  USD: { symbol: "$", decimals: 2, name: "دولار أمريكي" },
  EGP: { symbol: "ج.م", decimals: 2, name: "جنيه مصري" },
};

export function formatMoney(value, currencyCode = "KWD", withSymbol = true) {
  const cur = CURRENCIES[currencyCode] || CURRENCIES.KWD;
  const n = Number(value) || 0;
  const formatted = n.toLocaleString("en-US", {
    minimumFractionDigits: cur.decimals,
    maximumFractionDigits: cur.decimals,
  });
  return withSymbol ? `${formatted} ${cur.symbol}` : formatted;
}

export function formatNumber(value, decimals = 0) {
  const n = Number(value) || 0;
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(value, decimals = 1) {
  const n = Number(value) || 0;
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}%`;
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function uid(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
