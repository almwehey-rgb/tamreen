import { COLORS, FONT_HEAD } from "../lib/theme.js";
import { accountsTotal, goldTotals, investmentsTotals, netWorth } from "../lib/compute.js";
import { formatMoney, formatDate, formatPercent } from "../lib/format.js";
import { Card, SectionTitle, EmptyState, ProgressBar } from "./ui.jsx";
import { WalletIcon, CoinIcon, TrendingUpIcon, ArrowUpRightIcon, ArrowDownRightIcon, SwapIcon } from "../lib/icons.jsx";

function TxIcon({ type }) {
  if (type === "income") return <ArrowUpRightIcon size={15} />;
  if (type === "expense") return <ArrowDownRightIcon size={15} />;
  return <SwapIcon size={15} />;
}

export default function Dashboard({ state, currency, onNavigate }) {
  const cash = accountsTotal(state.accounts);
  const gold = goldTotals(state.gold);
  const inv = investmentsTotals(state.investments);
  const total = netWorth(state);

  const segments = [
    { key: "cash", value: cash, color: COLORS.blue, label: "الحسابات" },
    { key: "gold", value: gold.value, color: COLORS.gold, label: "الذهب" },
    { key: "inv", value: inv.value, color: COLORS.green, label: "الاستثمار" },
  ].filter((s) => s.value > 0);
  const sumSeg = segments.reduce((s, x) => s + x.value, 0) || 1;

  const recentTx = state.transactions.slice(0, 5);
  const accountsById = Object.fromEntries(state.accounts.map((a) => [a.id, a]));

  const isEmpty = state.accounts.length === 0 && state.gold.holdings.length === 0 && state.investments.length === 0;

  return (
    <div>
      <Card
        style={{
          background: `linear-gradient(135deg, ${COLORS.surface} 0%, ${COLORS.surface2} 100%)`,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={{ fontSize: 12.5, color: COLORS.textFaint, marginBottom: 6 }}>إجمالي الثروة</div>
        <div style={{ fontFamily: FONT_HEAD, fontWeight: 900, fontSize: 30, color: COLORS.text, letterSpacing: -0.5 }}>
          {formatMoney(total, currency)}
        </div>

        {segments.length > 0 && (
          <>
            <div style={{ display: "flex", height: 8, borderRadius: 8, overflow: "hidden", marginTop: 16, gap: 2 }}>
              {segments.map((s) => (
                <div key={s.key} style={{ width: `${(s.value / sumSeg) * 100}%`, background: s.color }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 10, flexWrap: "wrap" }}>
              {segments.map((s) => (
                <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: COLORS.textDim }}>
                  <span style={{ width: 7, height: 7, borderRadius: 4, background: s.color }} />
                  {s.label} · {Math.round((s.value / sumSeg) * 100)}%
                </div>
              ))}
            </div>
          </>
        )}
      </Card>

      {isEmpty ? (
        <div style={{ marginTop: 14 }}>
          <EmptyState
            icon={<CoinIcon size={30} />}
            title="ابدأ بتنظيم أموالك"
            subtitle="أضف حساب نقدي أو مقتنيات ذهب من التبويبات بالأسفل"
          />
        </div>
      ) : (
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <Card onClick={() => onNavigate("accounts")} style={{ flex: 1 }} padding={13}>
            <WalletIcon size={17} strokeWidth={1.7} />
            <div style={{ fontSize: 11.5, color: COLORS.textFaint, marginTop: 8 }}>الحسابات</div>
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 14.5, marginTop: 2 }}>
              {formatMoney(cash, currency)}
            </div>
          </Card>
          <Card onClick={() => onNavigate("gold")} style={{ flex: 1 }} padding={13}>
            <CoinIcon size={17} strokeWidth={1.7} color={COLORS.gold} />
            <div style={{ fontSize: 11.5, color: COLORS.textFaint, marginTop: 8 }}>الذهب</div>
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 14.5, marginTop: 2 }}>
              {formatMoney(gold.value, currency)}
            </div>
          </Card>
          <Card onClick={() => onNavigate("savings")} style={{ flex: 1 }} padding={13}>
            <TrendingUpIcon size={17} strokeWidth={1.7} color={COLORS.green} />
            <div style={{ fontSize: 11.5, color: COLORS.textFaint, marginTop: 8 }}>الاستثمار</div>
            <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 14.5, marginTop: 2 }}>
              {formatMoney(inv.value, currency)}
            </div>
          </Card>
        </div>
      )}

      {state.goals.length > 0 && (
        <>
          <SectionTitle action={<span onClick={() => onNavigate("savings")} style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700 }}>عرض الكل</span>}>
            أهداف الادخار
          </SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {state.goals.slice(0, 2).map((g) => (
              <Card key={g.id} padding={14}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13.5, fontWeight: 700 }}>
                  <span>{g.name}</span>
                  <span style={{ color: COLORS.textDim, fontWeight: 500 }}>
                    {formatMoney(g.currentAmount, currency)} / {formatMoney(g.targetAmount, currency)}
                  </span>
                </div>
                <ProgressBar value={g.currentAmount} max={g.targetAmount} color={g.color || COLORS.gold} />
              </Card>
            ))}
          </div>
        </>
      )}

      <SectionTitle action={<span onClick={() => onNavigate("accounts")} style={{ fontSize: 12, color: COLORS.gold, fontWeight: 700 }}>عرض الكل</span>}>
        آخر العمليات
      </SectionTitle>
      {recentTx.length === 0 ? (
        <Card>
          <EmptyState icon={<WalletIcon size={26} />} title="لا توجد عمليات بعد" />
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recentTx.map((t) => {
            const acc = accountsById[t.accountId];
            const color = t.type === "income" ? COLORS.green : t.type === "expense" ? COLORS.red : COLORS.blue;
            const bg = t.type === "income" ? COLORS.greenBg : t.type === "expense" ? COLORS.redBg : COLORS.blueBg;
            const sign = t.type === "income" ? "+" : t.type === "expense" ? "-" : "";
            return (
              <Card key={t.id} padding={12}>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: bg,
                      color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <TxIcon type={t.type} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {t.category || (t.type === "transfer" ? "تحويل" : "عملية")}
                    </div>
                    <div style={{ fontSize: 11.5, color: COLORS.textFaint }}>
                      {acc?.name || "—"} · {formatDate(t.date)}
                    </div>
                  </div>
                  <div style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 13.5, color }}>
                    {sign}
                    {formatMoney(t.amount, currency)}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
