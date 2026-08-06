export function accountsTotal(accounts) {
  return accounts.reduce((s, a) => s + (Number(a.balance) || 0), 0);
}

export function goldHoldingValue(h, priceMap) {
  const price = Number(priceMap?.[h.karat]) || 0;
  return (Number(h.weightGrams) || 0) * price;
}

export function goldHoldingCost(h) {
  return (Number(h.weightGrams) || 0) * (Number(h.purchasePricePerGram) || 0);
}

export function goldTotals(gold) {
  const holdings = gold?.holdings || [];
  const priceMap = gold?.pricePerGram || {};
  const value = holdings.reduce((s, h) => s + goldHoldingValue(h, priceMap), 0);
  const cost = holdings.reduce((s, h) => s + goldHoldingCost(h), 0);
  const weight = holdings.reduce((s, h) => s + (Number(h.weightGrams) || 0), 0);
  return { value, cost, weight, pl: value - cost, plPct: cost > 0 ? ((value - cost) / cost) * 100 : 0 };
}

export function investmentsTotals(investments) {
  const list = investments || [];
  const value = list.reduce((s, i) => s + (Number(i.currentValue) || 0), 0);
  const cost = list.reduce((s, i) => s + (Number(i.principal) || 0), 0);
  return { value, cost, pl: value - cost, plPct: cost > 0 ? ((value - cost) / cost) * 100 : 0 };
}

export function goalsTotals(goals) {
  const list = goals || [];
  const current = list.reduce((s, g) => s + (Number(g.currentAmount) || 0), 0);
  const target = list.reduce((s, g) => s + (Number(g.targetAmount) || 0), 0);
  return { current, target };
}

export function netWorth(state) {
  return accountsTotal(state.accounts) + goldTotals(state.gold).value + investmentsTotals(state.investments).value;
}
