export const ACCOUNT_TYPES = [
  { value: "cash", label: "نقد" },
  { value: "bank", label: "حساب بنكي" },
  { value: "wallet", label: "محفظة إلكترونية" },
];

export const EXPENSE_CATEGORIES = ["طعام", "مواصلات", "فواتير", "صحة", "ترفيه", "تسوق", "تعليم", "أخرى"];
export const INCOME_CATEGORIES = ["راتب", "هدية", "عائد استثمار", "دخل إضافي", "أخرى"];

export const KARATS = [24, 22, 21, 18];
export const KARAT_LABELS = { 24: "عيار 24", 22: "عيار 22", 21: "عيار 21", 18: "عيار 18" };

export const DEFAULT_STATE = {
  currency: "KWD",
  monthlyIncome: 0,
  accounts: [],
  transactions: [],
  gold: {
    pricePerGram: { 24: 0, 22: 0, 21: 0, 18: 0 },
    holdings: [],
  },
  goals: [],
  investments: [],
};

export const STORAGE_KEY = "personal-finance-v1";
