import { useMemo, useState } from "react";
import { COLORS, FONT_HEAD, ACCOUNT_COLORS } from "../lib/theme.js";
import { ACCOUNT_TYPES, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../lib/constants.js";
import { formatMoney, formatDate, parseNumber, todayISO } from "../lib/format.js";
import { accountsTotal } from "../lib/compute.js";
import { Card, SectionTitle, Button, IconButton, Field, Input, Select, Segmented, EmptyState, Modal, Textarea } from "./ui.jsx";
import {
  WalletIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  SwapIcon,
} from "../lib/icons.jsx";

const emptyAccountForm = { name: "", type: "cash", balance: "" };
const emptyTxForm = { type: "expense", accountId: "", toAccountId: "", amount: "", category: "", note: "", date: todayISO() };

export default function Accounts({ state, actions, currency }) {
  const [accountModal, setAccountModal] = useState({ open: false, editingId: null });
  const [accountForm, setAccountForm] = useState(emptyAccountForm);
  const [txModal, setTxModal] = useState(false);
  const [txForm, setTxForm] = useState(emptyTxForm);
  const [filter, setFilter] = useState("all");

  const total = accountsTotal(state.accounts);

  const filteredTx = useMemo(
    () => (filter === "all" ? state.transactions : state.transactions.filter((t) => t.accountId === filter || t.toAccountId === filter)),
    [state.transactions, filter]
  );

  const accountsById = Object.fromEntries(state.accounts.map((a) => [a.id, a]));

  function openAddAccount() {
    setAccountForm(emptyAccountForm);
    setAccountModal({ open: true, editingId: null });
  }
  function openEditAccount(a) {
    setAccountForm({ name: a.name, type: a.type, balance: String(a.balance) });
    setAccountModal({ open: true, editingId: a.id });
  }
  function saveAccount() {
    if (!accountForm.name.trim()) return;
    if (accountModal.editingId) {
      actions.updateAccount(accountModal.editingId, { name: accountForm.name.trim(), type: accountForm.type });
    } else {
      actions.addAccount({
        name: accountForm.name.trim(),
        type: accountForm.type,
        balance: parseNumber(accountForm.balance),
        color: ACCOUNT_COLORS[state.accounts.length % ACCOUNT_COLORS.length],
      });
    }
    setAccountModal({ open: false, editingId: null });
  }
  function removeAccount(id) {
    if (confirm("حذف هذا الحساب وكل عملياته؟")) actions.deleteAccount(id);
  }

  function openAddTx() {
    if (state.accounts.length === 0) return;
    setTxForm({ ...emptyTxForm, accountId: state.accounts[0].id, toAccountId: state.accounts[1]?.id || "" });
    setTxModal(true);
  }
  function saveTx() {
    const amount = parseNumber(txForm.amount);
    if (amount <= 0 || !txForm.accountId) return;
    if (txForm.type === "transfer" && (!txForm.toAccountId || txForm.toAccountId === txForm.accountId)) return;
    actions.addTransaction({
      type: txForm.type,
      accountId: txForm.accountId,
      toAccountId: txForm.type === "transfer" ? txForm.toAccountId : undefined,
      amount,
      category: txForm.type === "transfer" ? "" : txForm.category,
      note: txForm.note.trim(),
      date: txForm.date || todayISO(),
    });
    setTxModal(false);
  }

  const categories = txForm.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div>
      <div style={{ display: "flex", gap: 10 }}>
        <Button variant="primary" full icon={<PlusIcon size={16} />} onClick={openAddTx} disabled={state.accounts.length === 0}>
          إضافة عملية
        </Button>
        <Button variant="outline" icon={<PlusIcon size={16} />} onClick={openAddAccount}>
          حساب
        </Button>
      </div>

      <SectionTitle>الحسابات · {formatMoney(total, currency)}</SectionTitle>
      {state.accounts.length === 0 ? (
        <Card>
          <EmptyState icon={<WalletIcon size={26} />} title="لا توجد حسابات بعد" subtitle="أضف أول حساب نقدي أو بنكي" />
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {state.accounts.map((a) => (
            <Card key={a.id} padding={13}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    background: `${a.color || COLORS.gold}22`,
                    color: a.color || COLORS.gold,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <WalletIcon size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{a.name}</div>
                  <div style={{ fontSize: 11.5, color: COLORS.textFaint }}>
                    {ACCOUNT_TYPES.find((t) => t.value === a.type)?.label}
                  </div>
                </div>
                <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 14.5 }}>{formatMoney(a.balance, currency)}</div>
                <IconButton icon={<EditIcon size={15} />} onClick={() => openEditAccount(a)} label="تعديل" />
                <IconButton icon={<TrashIcon size={15} />} variant="danger" onClick={() => removeAccount(a.id)} label="حذف" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {state.accounts.length > 0 && (
        <>
          <SectionTitle>سجل العمليات</SectionTitle>
          <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4, marginBottom: 10 }}>
            {[{ id: "all", name: "الكل" }, ...state.accounts].map((a) => (
              <button
                key={a.id}
                onClick={() => setFilter(a.id)}
                style={{
                  flexShrink: 0,
                  border: "none",
                  borderRadius: 20,
                  padding: "7px 14px",
                  fontSize: 12.5,
                  fontWeight: 700,
                  background: filter === a.id ? COLORS.gold : COLORS.surface2,
                  color: filter === a.id ? "#1a1508" : COLORS.textDim,
                }}
              >
                {a.name}
              </button>
            ))}
          </div>

          {filteredTx.length === 0 ? (
            <Card>
              <EmptyState icon={<WalletIcon size={24} />} title="لا توجد عمليات" />
            </Card>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredTx.map((t) => {
                const acc = accountsById[t.accountId];
                const toAcc = accountsById[t.toAccountId];
                const color = t.type === "income" ? COLORS.green : t.type === "expense" ? COLORS.red : COLORS.blue;
                const bg = t.type === "income" ? COLORS.greenBg : t.type === "expense" ? COLORS.redBg : COLORS.blueBg;
                const sign = t.type === "income" ? "+" : t.type === "expense" ? "-" : "";
                const Icon = t.type === "income" ? ArrowUpRightIcon : t.type === "expense" ? ArrowDownRightIcon : SwapIcon;
                return (
                  <Card key={t.id} padding={12}>
                    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 9,
                          background: bg,
                          color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={14} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 700 }}>
                          {t.type === "transfer" ? `${acc?.name || "—"} ← ${toAcc?.name || "—"}` : t.category || "عملية"}
                        </div>
                        <div style={{ fontSize: 11.5, color: COLORS.textFaint }}>
                          {t.type !== "transfer" ? `${acc?.name || "—"} · ` : ""}
                          {formatDate(t.date)}
                          {t.note ? ` · ${t.note}` : ""}
                        </div>
                      </div>
                      <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 13.5, color }}>
                        {sign}
                        {formatMoney(t.amount, currency)}
                      </div>
                      <IconButton icon={<TrashIcon size={13} />} size={30} variant="danger" onClick={() => actions.deleteTransaction(t.id)} label="حذف" />
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      <Modal
        open={accountModal.open}
        onClose={() => setAccountModal({ open: false, editingId: null })}
        title={accountModal.editingId ? "تعديل الحساب" : "حساب جديد"}
        footer={
          <Button full onClick={saveAccount}>
            حفظ
          </Button>
        }
      >
        <Field label="اسم الحساب">
          <Input value={accountForm.name} onChange={(e) => setAccountForm((f) => ({ ...f, name: e.target.value }))} placeholder="مثال: النقدية، بنك بيتك" autoFocus />
        </Field>
        <Field label="النوع">
          <Select value={accountForm.type} onChange={(e) => setAccountForm((f) => ({ ...f, type: e.target.value }))} options={ACCOUNT_TYPES} />
        </Field>
        {!accountModal.editingId && (
          <Field label="الرصيد الحالي">
            <Input
              value={accountForm.balance}
              onChange={(e) => setAccountForm((f) => ({ ...f, balance: e.target.value }))}
              placeholder="0"
              inputMode="decimal"
              suffix={currency}
            />
          </Field>
        )}
      </Modal>

      <Modal
        open={txModal}
        onClose={() => setTxModal(false)}
        title="عملية جديدة"
        footer={
          <Button full onClick={saveTx}>
            حفظ العملية
          </Button>
        }
      >
        <Field>
          <Segmented
            value={txForm.type}
            onChange={(v) => setTxForm((f) => ({ ...f, type: v, category: "" }))}
            options={[
              { value: "expense", label: "مصروف", color: COLORS.red },
              { value: "income", label: "دخل", color: COLORS.green },
              { value: "transfer", label: "تحويل", color: COLORS.blue },
            ]}
          />
        </Field>
        <Field label="المبلغ">
          <Input value={txForm.amount} onChange={(e) => setTxForm((f) => ({ ...f, amount: e.target.value }))} placeholder="0" inputMode="decimal" suffix={currency} autoFocus />
        </Field>
        <Field label={txForm.type === "transfer" ? "من حساب" : "الحساب"}>
          <Select
            value={txForm.accountId}
            onChange={(e) => setTxForm((f) => ({ ...f, accountId: e.target.value }))}
            options={state.accounts.map((a) => ({ value: a.id, label: a.name }))}
          />
        </Field>
        {txForm.type === "transfer" ? (
          <Field label="إلى حساب">
            <Select
              value={txForm.toAccountId}
              onChange={(e) => setTxForm((f) => ({ ...f, toAccountId: e.target.value }))}
              options={state.accounts.filter((a) => a.id !== txForm.accountId).map((a) => ({ value: a.id, label: a.name }))}
            />
          </Field>
        ) : (
          <Field label="التصنيف">
            <Select value={txForm.category} onChange={(e) => setTxForm((f) => ({ ...f, category: e.target.value }))} options={[{ value: "", label: "اختر تصنيف" }, ...categories.map((c) => ({ value: c, label: c }))]} />
          </Field>
        )}
        <Field label="التاريخ">
          <Input type="date" value={txForm.date} onChange={(e) => setTxForm((f) => ({ ...f, date: e.target.value }))} />
        </Field>
        <Field label="ملاحظة (اختياري)">
          <Textarea value={txForm.note} onChange={(e) => setTxForm((f) => ({ ...f, note: e.target.value }))} placeholder="تفاصيل إضافية" />
        </Field>
      </Modal>
    </div>
  );
}
