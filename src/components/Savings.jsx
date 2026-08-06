import { useState } from "react";
import { COLORS, FONT_HEAD, GOAL_COLORS } from "../lib/theme.js";
import { formatMoney, formatPercent, parseNumber, todayISO } from "../lib/format.js";
import { investmentsTotals } from "../lib/compute.js";
import { Card, SectionTitle, Button, IconButton, Field, Input, ProgressBar, EmptyState, Modal, Textarea } from "./ui.jsx";
import { PiggyIcon, TrendingUpIcon, PlusIcon, EditIcon, TrashIcon, CheckIcon } from "../lib/icons.jsx";

const RULE = [
  { key: "needs", label: "الاحتياجات", pct: 50, color: COLORS.blue, hint: "سكن، فواتير، طعام" },
  { key: "wants", label: "الرغبات", pct: 30, color: COLORS.textDim, hint: "ترفيه، تسوق" },
  { key: "save", label: "الادخار والاستثمار", pct: 20, color: COLORS.gold, hint: "هدفك المالي" },
];

const emptyGoalForm = { name: "", targetAmount: "", currentAmount: "" };
const emptyInvForm = { name: "", principal: "", currentValue: "", date: todayISO(), note: "" };

export default function Savings({ state, actions, currency }) {
  const [goalModal, setGoalModal] = useState({ open: false, editingId: null });
  const [goalForm, setGoalForm] = useState(emptyGoalForm);
  const [addFundsGoal, setAddFundsGoal] = useState(null);
  const [addFundsAmount, setAddFundsAmount] = useState("");
  const [invModal, setInvModal] = useState({ open: false, editingId: null });
  const [invForm, setInvForm] = useState(emptyInvForm);

  const income = state.monthlyIncome || 0;
  const invTotals = investmentsTotals(state.investments);
  const invPlColor = invTotals.pl >= 0 ? COLORS.green : COLORS.red;

  function openAddGoal() {
    setGoalForm(emptyGoalForm);
    setGoalModal({ open: true, editingId: null });
  }
  function openEditGoal(g) {
    setGoalForm({ name: g.name, targetAmount: String(g.targetAmount), currentAmount: String(g.currentAmount) });
    setGoalModal({ open: true, editingId: g.id });
  }
  function saveGoal() {
    if (!goalForm.name.trim()) return;
    const targetAmount = parseNumber(goalForm.targetAmount);
    if (targetAmount <= 0) return;
    if (goalModal.editingId) {
      actions.updateGoal(goalModal.editingId, { name: goalForm.name.trim(), targetAmount, currentAmount: parseNumber(goalForm.currentAmount) });
    } else {
      actions.addGoal({
        name: goalForm.name.trim(),
        targetAmount,
        currentAmount: parseNumber(goalForm.currentAmount),
        color: GOAL_COLORS[state.goals.length % GOAL_COLORS.length],
      });
    }
    setGoalModal({ open: false, editingId: null });
  }
  function removeGoal(id) {
    if (confirm("حذف هذا الهدف؟")) actions.deleteGoal(id);
  }
  function saveFunds() {
    const amount = parseNumber(addFundsAmount);
    if (amount > 0 && addFundsGoal) actions.addToGoal(addFundsGoal, amount);
    setAddFundsGoal(null);
    setAddFundsAmount("");
  }

  function openAddInv() {
    setInvForm(emptyInvForm);
    setInvModal({ open: true, editingId: null });
  }
  function openEditInv(i) {
    setInvForm({ name: i.name, principal: String(i.principal), currentValue: String(i.currentValue), date: i.date || todayISO(), note: i.note || "" });
    setInvModal({ open: true, editingId: i.id });
  }
  function saveInv() {
    if (!invForm.name.trim()) return;
    const payload = {
      name: invForm.name.trim(),
      principal: parseNumber(invForm.principal),
      currentValue: parseNumber(invForm.currentValue),
      date: invForm.date || todayISO(),
      note: invForm.note.trim(),
    };
    if (invModal.editingId) actions.updateInvestment(invModal.editingId, payload);
    else actions.addInvestment(payload);
    setInvModal({ open: false, editingId: null });
  }
  function removeInv(id) {
    if (confirm("حذف هذا الاستثمار؟")) actions.deleteInvestment(id);
  }

  return (
    <div>
      <Card>
        <div style={{ fontSize: 13.5, fontWeight: 800, fontFamily: FONT_HEAD, marginBottom: 3 }}>طريقة 50/30/20 البسيطة</div>
        <div style={{ fontSize: 12, color: COLORS.textFaint, marginBottom: 14 }}>
          قاعدة سهولة توزيع دخلك الشهري: نصفه للاحتياجات، وثلثه للرغبات، والخُمس للادخار والاستثمار
        </div>
        <Field label="الدخل الشهري">
          <Input
            value={income || ""}
            onChange={(e) => actions.setMonthlyIncome(parseNumber(e.target.value))}
            placeholder="0"
            inputMode="decimal"
            suffix={currency}
          />
        </Field>
        {income > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
            {RULE.map((r) => (
              <div key={r.key}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
                  <span style={{ fontWeight: 700 }}>
                    {r.label} <span style={{ color: COLORS.textFaint, fontWeight: 400 }}>({r.hint})</span>
                  </span>
                  <span style={{ fontWeight: 800, fontFamily: FONT_HEAD }}>{formatMoney((income * r.pct) / 100, currency)}</span>
                </div>
                <ProgressBar value={r.pct} max={100} color={r.color} />
              </div>
            ))}
          </div>
        )}
      </Card>

      <SectionTitle action={<IconButton icon={<PlusIcon size={16} />} variant="gold" onClick={openAddGoal} label="إضافة هدف" />}>
        أهداف الادخار
      </SectionTitle>
      {state.goals.length === 0 ? (
        <Card>
          <EmptyState icon={<PiggyIcon size={26} />} title="لا توجد أهداف ادخار بعد" subtitle="مثال: صندوق الطوارئ، رحلة، دفعة أولى" />
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {state.goals.map((g) => {
            const done = g.currentAmount >= g.targetAmount;
            return (
              <Card key={g.id} padding={14}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 9 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                      {g.name}
                      {done && <CheckIcon size={14} color={COLORS.green} />}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.textFaint, marginTop: 2 }}>
                      {formatMoney(g.currentAmount, currency)} من {formatMoney(g.targetAmount, currency)}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <IconButton icon={<EditIcon size={14} />} onClick={() => openEditGoal(g)} label="تعديل" />
                    <IconButton icon={<TrashIcon size={14} />} variant="danger" onClick={() => removeGoal(g.id)} label="حذف" />
                  </div>
                </div>
                <ProgressBar value={g.currentAmount} max={g.targetAmount} color={g.color || COLORS.gold} />
                <div style={{ marginTop: 10 }}>
                  <Button variant="ghost" style={{ width: "100%" }} icon={<PlusIcon size={14} />} onClick={() => setAddFundsGoal(g.id)}>
                    إضافة مبلغ
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <SectionTitle action={<IconButton icon={<PlusIcon size={16} />} variant="gold" onClick={openAddInv} label="إضافة استثمار" />}>
        استثماراتي
      </SectionTitle>
      {state.investments.length === 0 ? (
        <Card>
          <EmptyState icon={<TrendingUpIcon size={26} />} title="لا توجد استثمارات بعد" subtitle="أضف صندوق، أسهم، أو أي استثمار تتابعه" />
        </Card>
      ) : (
        <>
          <Card padding={13} style={{ marginBottom: 9 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 11.5, color: COLORS.textFaint }}>القيمة الحالية</div>
                <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 15 }}>{formatMoney(invTotals.value, currency)}</div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 11.5, color: COLORS.textFaint }}>العائد</div>
                <div style={{ fontWeight: 800, fontSize: 15, color: invPlColor }}>{formatPercent(invTotals.plPct)}</div>
              </div>
            </div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {state.investments.map((i) => {
              const pl = i.currentValue - i.principal;
              const plPct = i.principal > 0 ? (pl / i.principal) * 100 : 0;
              const color = pl >= 0 ? COLORS.green : COLORS.red;
              return (
                <Card key={i.id} padding={13}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{i.name}</div>
                      <div style={{ fontSize: 11.5, color: COLORS.textFaint, marginTop: 2 }}>
                        رأس المال {formatMoney(i.principal, currency)}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <IconButton icon={<EditIcon size={14} />} onClick={() => openEditInv(i)} label="تعديل" />
                      <IconButton icon={<TrashIcon size={14} />} variant="danger" onClick={() => removeInv(i.id)} label="حذف" />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: `1px solid ${COLORS.border}` }}>
                    <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 14 }}>{formatMoney(i.currentValue, currency)}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color }}>
                      {formatMoney(pl, currency)} ({formatPercent(plPct)})
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      <Modal
        open={goalModal.open}
        onClose={() => setGoalModal({ open: false, editingId: null })}
        title={goalModal.editingId ? "تعديل الهدف" : "هدف ادخار جديد"}
        footer={
          <Button full onClick={saveGoal}>
            حفظ
          </Button>
        }
      >
        <Field label="اسم الهدف">
          <Input value={goalForm.name} onChange={(e) => setGoalForm((f) => ({ ...f, name: e.target.value }))} placeholder="مثال: صندوق الطوارئ" autoFocus />
        </Field>
        <Field label="المبلغ المستهدف">
          <Input value={goalForm.targetAmount} onChange={(e) => setGoalForm((f) => ({ ...f, targetAmount: e.target.value }))} placeholder="0" inputMode="decimal" suffix={currency} />
        </Field>
        <Field label="المبلغ الحالي">
          <Input value={goalForm.currentAmount} onChange={(e) => setGoalForm((f) => ({ ...f, currentAmount: e.target.value }))} placeholder="0" inputMode="decimal" suffix={currency} />
        </Field>
      </Modal>

      <Modal
        open={!!addFundsGoal}
        onClose={() => setAddFundsGoal(null)}
        title="إضافة مبلغ للهدف"
        footer={
          <Button full onClick={saveFunds}>
            إضافة
          </Button>
        }
      >
        <Field label="المبلغ">
          <Input value={addFundsAmount} onChange={(e) => setAddFundsAmount(e.target.value)} placeholder="0" inputMode="decimal" suffix={currency} autoFocus />
        </Field>
      </Modal>

      <Modal
        open={invModal.open}
        onClose={() => setInvModal({ open: false, editingId: null })}
        title={invModal.editingId ? "تعديل الاستثمار" : "استثمار جديد"}
        footer={
          <Button full onClick={saveInv}>
            حفظ
          </Button>
        }
      >
        <Field label="اسم الاستثمار">
          <Input value={invForm.name} onChange={(e) => setInvForm((f) => ({ ...f, name: e.target.value }))} placeholder="مثال: صندوق مؤشر، أسهم" autoFocus />
        </Field>
        <Field label="رأس المال المستثمر">
          <Input value={invForm.principal} onChange={(e) => setInvForm((f) => ({ ...f, principal: e.target.value }))} placeholder="0" inputMode="decimal" suffix={currency} />
        </Field>
        <Field label="القيمة الحالية">
          <Input value={invForm.currentValue} onChange={(e) => setInvForm((f) => ({ ...f, currentValue: e.target.value }))} placeholder="0" inputMode="decimal" suffix={currency} />
        </Field>
        <Field label="تاريخ البدء">
          <Input type="date" value={invForm.date} onChange={(e) => setInvForm((f) => ({ ...f, date: e.target.value }))} />
        </Field>
        <Field label="ملاحظة (اختياري)">
          <Textarea value={invForm.note} onChange={(e) => setInvForm((f) => ({ ...f, note: e.target.value }))} placeholder="تفاصيل إضافية" />
        </Field>
      </Modal>
    </div>
  );
}
