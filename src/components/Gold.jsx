import { useState } from "react";
import { COLORS, FONT_HEAD } from "../lib/theme.js";
import { KARATS, KARAT_LABELS } from "../lib/constants.js";
import { formatMoney, formatNumber, formatPercent, formatDate, parseNumber, todayISO } from "../lib/format.js";
import { goldTotals, goldHoldingValue, goldHoldingCost } from "../lib/compute.js";
import { Card, SectionTitle, Button, IconButton, Field, Input, Select, EmptyState, Modal, Textarea } from "./ui.jsx";
import { CoinIcon, PlusIcon, EditIcon, TrashIcon } from "../lib/icons.jsx";

const emptyForm = { name: "", karat: 21, weightGrams: "", purchasePricePerGram: "", purchaseDate: todayISO(), note: "" };

export default function Gold({ state, actions, currency }) {
  const [modal, setModal] = useState({ open: false, editingId: null });
  const [form, setForm] = useState(emptyForm);

  const totals = goldTotals(state.gold);
  const plColor = totals.pl >= 0 ? COLORS.green : COLORS.red;

  function openAdd() {
    setForm(emptyForm);
    setModal({ open: true, editingId: null });
  }
  function openEdit(h) {
    setForm({
      name: h.name,
      karat: h.karat,
      weightGrams: String(h.weightGrams),
      purchasePricePerGram: String(h.purchasePricePerGram),
      purchaseDate: h.purchaseDate || todayISO(),
      note: h.note || "",
    });
    setModal({ open: true, editingId: h.id });
  }
  function save() {
    const weightGrams = parseNumber(form.weightGrams);
    if (weightGrams <= 0) return;
    const payload = {
      name: form.name.trim() || "مقتنى ذهب",
      karat: Number(form.karat),
      weightGrams,
      purchasePricePerGram: parseNumber(form.purchasePricePerGram),
      purchaseDate: form.purchaseDate || todayISO(),
      note: form.note.trim(),
    };
    if (modal.editingId) actions.updateGoldHolding(modal.editingId, payload);
    else actions.addGoldHolding(payload);
    setModal({ open: false, editingId: null });
  }
  function remove(id) {
    if (confirm("حذف هذا المقتنى؟")) actions.deleteGoldHolding(id);
  }

  return (
    <div>
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.surface} 0%, ${COLORS.surface2} 100%)` }}>
        <div style={{ fontSize: 12.5, color: COLORS.textFaint, marginBottom: 6 }}>قيمة الذهب الحالية</div>
        <div style={{ fontFamily: FONT_HEAD, fontWeight: 900, fontSize: 27, color: COLORS.gold }}>
          {formatMoney(totals.value, currency)}
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 12 }}>
          <div>
            <div style={{ fontSize: 11.5, color: COLORS.textFaint }}>الوزن الإجمالي</div>
            <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 2 }}>{formatNumber(totals.weight, 2)} جم</div>
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: COLORS.textFaint }}>تكلفة الشراء</div>
            <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 2 }}>{formatMoney(totals.cost, currency)}</div>
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: COLORS.textFaint }}>الربح / الخسارة</div>
            <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 2, color: plColor }}>
              {formatMoney(totals.pl, currency)} ({formatPercent(totals.plPct)})
            </div>
          </div>
        </div>
      </Card>

      <SectionTitle>أسعار الذهب اليوم (لكل جرام)</SectionTitle>
      <Card padding={14}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {KARATS.map((k) => (
            <Field key={k} label={KARAT_LABELS[k]}>
              <Input
                value={state.gold.pricePerGram[k] ?? ""}
                onChange={(e) => actions.setGoldPrice(k, parseNumber(e.target.value))}
                placeholder="0"
                inputMode="decimal"
                suffix={currency}
              />
            </Field>
          ))}
        </div>
      </Card>

      <SectionTitle
        action={
          <IconButton icon={<PlusIcon size={16} />} variant="gold" onClick={openAdd} label="إضافة" />
        }
      >
        مقتنياتي
      </SectionTitle>

      {state.gold.holdings.length === 0 ? (
        <Card>
          <EmptyState icon={<CoinIcon size={26} />} title="لا توجد مقتنيات ذهب بعد" subtitle="أضف سبيكة أو مشغولات أو جنيهات ذهب" />
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {state.gold.holdings.map((h) => {
            const value = goldHoldingValue(h, state.gold.pricePerGram);
            const cost = goldHoldingCost(h);
            const pl = value - cost;
            const plPct = cost > 0 ? (pl / cost) * 100 : 0;
            const color = pl >= 0 ? COLORS.green : COLORS.red;
            return (
              <Card key={h.id} padding={13}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 11,
                      background: COLORS.goldBg,
                      color: COLORS.gold,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CoinIcon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{h.name}</div>
                    <div style={{ fontSize: 11.5, color: COLORS.textFaint }}>
                      {KARAT_LABELS[h.karat]} · {formatNumber(h.weightGrams, 2)} جم
                    </div>
                  </div>
                  <IconButton icon={<EditIcon size={15} />} onClick={() => openEdit(h)} label="تعديل" />
                  <IconButton icon={<TrashIcon size={15} />} variant="danger" onClick={() => remove(h.id)} label="حذف" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 14 }}>{formatMoney(value, currency)}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color }}>
                    {formatMoney(pl, currency)} ({formatPercent(plPct)})
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={modal.open}
        onClose={() => setModal({ open: false, editingId: null })}
        title={modal.editingId ? "تعديل المقتنى" : "مقتنى ذهب جديد"}
        footer={
          <Button full onClick={save}>
            حفظ
          </Button>
        }
      >
        <Field label="الاسم (اختياري)">
          <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="مثال: سبيكة، خاتم، جنيه ذهب" autoFocus />
        </Field>
        <Field label="العيار">
          <Select value={form.karat} onChange={(e) => setForm((f) => ({ ...f, karat: e.target.value }))} options={KARATS.map((k) => ({ value: k, label: KARAT_LABELS[k] }))} />
        </Field>
        <Field label="الوزن (جرام)">
          <Input value={form.weightGrams} onChange={(e) => setForm((f) => ({ ...f, weightGrams: e.target.value }))} placeholder="0" inputMode="decimal" suffix="جم" />
        </Field>
        <Field label="سعر الشراء لكل جرام">
          <Input value={form.purchasePricePerGram} onChange={(e) => setForm((f) => ({ ...f, purchasePricePerGram: e.target.value }))} placeholder="0" inputMode="decimal" suffix={currency} />
        </Field>
        <Field label="تاريخ الشراء">
          <Input type="date" value={form.purchaseDate} onChange={(e) => setForm((f) => ({ ...f, purchaseDate: e.target.value }))} />
        </Field>
        <Field label="ملاحظة (اختياري)">
          <Textarea value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} placeholder="تفاصيل إضافية" />
        </Field>
      </Modal>
    </div>
  );
}
