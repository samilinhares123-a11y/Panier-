import type { Diagnostic } from "./answers";

// Hypothèses volontairement prudentes, affichées telles quelles à l'utilisateur.
export const ASSUMPTIONS = {
  abandonRate: 0.7, // Baymard Institute : ~70 % de paniers abandonnés en moyenne
  reachableRate: 0.3, // part des paniers abandonnés où l'email du client est connu
  recoveryRate: 0.1, // part de ces clients qui reviennent acheter après 2 relances
  alreadyOneEmailShare: 0.4, // si une relance existe déjà : gain de la 2ᵉ relance + code seulement
};

export type Estimate = {
  orders: number;
  basket: number;
  abandoned: number;
  lostValue: number;
  reachable: number;
  recoveredOrders: number;
  recoveredMonthly: number;
  recoveredYearly: number;
  ratio: number;
};

export function estimate(a: Diagnostic, monthlyPrice = 29): Estimate {
  const orders = Number(a.c);
  const basket = Number(a.p);
  const abandoned = Math.round((orders * ASSUMPTIONS.abandonRate) / (1 - ASSUMPTIONS.abandonRate));
  const reachable = Math.round(abandoned * ASSUMPTIONS.reachableRate);
  let recoveredOrders = abandoned * ASSUMPTIONS.reachableRate * ASSUMPTIONS.recoveryRate;
  if (a.r === "un") recoveredOrders *= ASSUMPTIONS.alreadyOneEmailShare;
  const recoveredMonthly = Math.round(recoveredOrders * basket);
  return {
    orders,
    basket,
    abandoned,
    lostValue: abandoned * basket,
    reachable,
    recoveredOrders: Math.round(recoveredOrders * 10) / 10,
    recoveredMonthly,
    recoveredYearly: recoveredMonthly * 12,
    ratio: Math.round((recoveredMonthly / monthlyPrice) * 10) / 10,
  };
}

export const euros = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
