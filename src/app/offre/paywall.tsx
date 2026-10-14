"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { PlanAnswers } from "@/lib/answers";
import { guarantee, plans, site, type PlanId } from "@/lib/site";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export function Paywall({ answers }: { answers: PlanAnswers }) {
  const [plan, setPlan] = useState<PlanId>("annuel");
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, answers }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.clientSecret) {
      setError(data.error ?? "Le paiement n'a pas pu s'ouvrir. Recharge la page ou réessaie dans un instant.");
      throw new Error("checkout");
    }
    return data.clientSecret as string;
  }, [plan, answers]);

  return (
    <>
      <fieldset className="mt-5">
        <legend className="sr-only">Choisis ta formule</legend>
        <div className="grid grid-cols-2 gap-3">
          {(["mensuel", "annuel"] as const).map((id) => {
            const p = plans[id];
            const selected = plan === id;
            const featured = id === "annuel";
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => setPlan(id)}
                className={`relative rounded-xl border-2 p-3 text-left transition-colors ${
                  selected ? "border-action bg-card" : "border-line bg-card/60"
                }`}
              >
                {featured && (
                  <span className="absolute -top-2.5 left-3 rounded bg-action px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide text-white uppercase">
                    Recommandé
                  </span>
                )}
                <span className="block text-sm font-semibold">{p.label}</span>
                <span className="mt-0.5 block font-display text-2xl font-extrabold num">
                  {p.priceLabel}
                  <span className="font-sans text-sm font-medium text-muted"> {p.periodLabel}</span>
                </span>
                <span className="block text-sm font-semibold text-win num">soit {p.perDay}/jour</span>
                <span className="mt-0.5 block text-xs text-muted">{p.note}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <section className="mt-4 rounded-xl border-2 border-win bg-win-soft p-4" aria-labelledby="garantie">
        <h2 id="garantie" className="font-semibold text-win">Satisfait ou remboursé {guarantee.days} jours</h2>
        <p className="mt-1 text-sm">
          Écris à <strong>{site.contactEmail}</strong> dans les {guarantee.days} jours qui suivent ton paiement, sans justification.
          Remboursement intégral lancé sous {guarantee.refundStart}, visible sur ton compte sous {guarantee.refundVisible}.
        </p>
      </section>

      <div className="mt-6" id="paiement">
        <p className="mb-3 text-center text-sm font-semibold">Sans engagement, résiliable à tout moment.</p>
        {!stripePromise ? (
          <p className="rounded-lg border border-action p-4 text-sm">
            Le paiement n&apos;est pas encore configuré sur ce site (clé Stripe manquante).
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-line bg-white">
            <EmbeddedCheckoutProvider key={plan} stripe={stripePromise} options={{ fetchClientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
        {error && (
          <p role="alert" className="mt-3 rounded-lg border border-action bg-card p-3 text-sm">
            {error}
          </p>
        )}
        <p className="mt-3 text-center text-xs text-muted">
          Paiement sécurisé par Stripe. En payant, tu acceptes les <Link href="/cgv" className="underline">CGV</Link>.
          Tu reçois ta séquence complète immédiatement.
        </p>
      </div>
    </>
  );
}
