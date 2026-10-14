import { Suspense } from "react";
import { PageSkeleton } from "@/components/skeleton";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckIcon, TopBar } from "@/components/ui";
import { parsePlan } from "@/lib/answers";
import { estimate, euros } from "@/lib/estimate";
import { guarantee, site } from "@/lib/site";
import { Paywall } from "./paywall";

export const metadata: Metadata = {
  title: "Garde ton plan de relances",
  description: "29 € par mois, sans engagement, satisfait ou remboursé 30 jours.",
  robots: { index: false },
};

async function Content({ searchParams }: Pick<PageProps<"/offre">, "searchParams">) {
  const a = parsePlan(await searchParams);
  if (!a) redirect("/diagnostic");
  const e = estimate(a);
  const shop = a.b || "ta boutique";
  const maxBar = Math.max(e.recoveredMonthly, 29);

  const faq = [
    {
      q: "Est-ce que ça marche pour ma boutique ?",
      a: `Oui si tu vends sur WooCommerce ou Shopify et que tes clients saisissent leur email avant de payer. À ton volume, on estime environ ${euros(e.recoveredMonthly)} récupérés par mois — et si ce n'est pas le cas chez toi, la garantie de ${guarantee.days} jours te rembourse.`,
    },
    {
      q: "Combien de temps ça me prend ?",
      a: "Une dizaine de minutes, une seule fois : installer le branchement, choisir ton code de réduction, relire tes deux relances. Ensuite, tout part tout seul. Tu regardes le compteur quand tu veux.",
    },
    {
      q: "Et si je veux arrêter ?",
      a: `Tu résilies en un clic depuis ton espace, ou par un simple email à ${site.contactEmail}. Les relances s'arrêtent à la fin de la période payée, sans frais. Et pendant les ${guarantee.days} premiers jours, tu es remboursé intégralement.`,
    },
    {
      q: "Qu'est-ce que je paie exactement ?",
      a: `L'outil qui repère tes paniers abandonnés, envoie tes deux relances à chaque fois, sans limite, crée ton code de réduction et compte les euros récupérés. Tout de suite après le paiement, tu reçois ta séquence complète. Le branchement automatique à ta boutique est mis en service sous ${guarantee.setupDays} jours avec toi (accès fondateur) — sinon, tu es remboursé.`,
    },
  ];

  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-xl px-4 pt-2 pb-16">
        {/* 1. Ce qui a déjà été fait pour la personne */}
        <section>
          <h1 className="font-display text-[2rem] leading-tight font-extrabold tracking-tight">Voilà ton plan, prêt.</h1>
          <ul className="mt-2 grid gap-1 text-[0.95rem]">
            <li className="flex gap-2"><CheckIcon className="text-win" /> 2 relances écrites pour {shop}</li>
            <li className="flex gap-2"><CheckIcon className="text-win" /> {a.d === "0" ? "Envoi 1 h puis 24 h après l'abandon" : `Code −${a.d} % sur la 2ᵉ relance, envoi 1 h puis 24 h après`}</li>
          </ul>
        </section>

        {/* 2. Ce que ça rapporte, comparé au prix */}
        <section className="mt-4 rounded-xl border border-line bg-card p-4" aria-label="Ce que ton plan rapporte">
          <div className="grid grid-cols-[5.5rem_1fr] items-center gap-x-3 gap-y-2 text-sm">
            <span className="text-muted">Il rapporte</span>
            <span className="flex items-center gap-2">
              <span className="h-5 rounded-sm bg-win" style={{ width: `${(e.recoveredMonthly / maxBar) * 70}%` }} />
              <strong className="num text-win">~{euros(e.recoveredMonthly)}/mois</strong>
            </span>
            <span className="text-muted">Il coûte</span>
            <span className="flex items-center gap-2">
              <span className="h-5 rounded-sm bg-ink" style={{ width: `${(29 / maxBar) * 70}%` }} />
              <strong className="num">29 €/mois</strong>
            </span>
          </div>
        </section>

        {/* 3 à 6. Formules, garantie, paiement sur le même écran */}
        <Paywall answers={a} />

        {/* 7. Questions fréquentes */}
        <section className="mt-12" aria-labelledby="faq">
          <h2 id="faq" className="font-display text-2xl font-bold">Questions fréquentes</h2>
          <div className="mt-3 divide-y divide-line border-y border-line">
            {faq.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.q}
                  <span aria-hidden="true" className="text-xl text-action transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-4 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default function Page(props: PageProps<"/offre">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Content searchParams={props.searchParams} />
    </Suspense>
  );
}
