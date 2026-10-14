import { Suspense } from "react";
import { PageSkeleton } from "@/components/skeleton";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ButtonLink, Kicker, TopBar } from "@/components/ui";
import { BASKETS, CURRENT, ORDERS, parseDiagnostic, toQuery } from "@/lib/answers";
import { ASSUMPTIONS, estimate, euros } from "@/lib/estimate";

export const metadata: Metadata = {
  title: "Ce que tes paniers abandonnés te coûtent",
  description: "Ton estimation personnalisée, à partir de tes réponses.",
  robots: { index: false },
};

const situation: Record<string, string> = {
  rien: "Aujourd'hui, ces paniers ne reçoivent aucune relance. Ils sont perdus, en silence.",
  un: "Ton email automatique fait une partie du travail. Ce qui manque : une seconde relance, avec un code, pour faire revenir ceux qui hésitent.",
  main: "Relancer à la main te prend du temps, et part souvent trop tard : la plupart des ventes se rattrapent dans les 24 heures.",
  nsp: "Si tu ne sais pas, c'est très probablement qu'aucune relance ne part — ou que personne ne vérifie ce qu'elle rapporte.",
};

async function Content({ searchParams }: Pick<PageProps<"/resultat">, "searchParams">) {
  const a = parseDiagnostic(await searchParams);
  if (!a) redirect("/diagnostic");
  const e = estimate(a);
  const ordersLabel = ORDERS[a.c as keyof typeof ORDERS];
  const basketLabel = BASKETS[a.p as keyof typeof BASKETS];
  const currentLabel = CURRENT[a.r as keyof typeof CURRENT];
  const pct = (n: number) => `${Math.round(n * 100)} %`;

  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-xl px-4 pt-4 pb-16">
        <Kicker>Ton résultat</Kicker>
        <p className="mt-3 text-lg">
          Tu fais <strong>{ordersLabel} commandes</strong> par mois, avec un panier moyen de{" "}
          <strong>{basketLabel}</strong>. Et quand un client abandonne : <strong>« {currentLabel} »</strong>.
        </p>

        <section className="mt-6 rounded-xl border border-line bg-card p-5">
          <h1 className="text-sm font-semibold tracking-wide text-muted uppercase">Ce que ça te coûte aujourd&apos;hui</h1>
          <p className="mt-2 font-display text-5xl font-extrabold text-action num">{euros(e.lostValue)}</p>
          <p className="mt-1">
            laissés chaque mois dans environ <strong className="num">{e.abandoned} paniers abandonnés</strong>.
          </p>
          <p className="rule-dashed mt-4 pt-4 text-muted">{situation[a.r]}</p>
        </section>

        <section className="mt-4 rounded-xl border-2 border-win bg-win-soft p-5">
          <h2 className="text-sm font-semibold tracking-wide text-win uppercase">Avec Panier Perdu</h2>
          <p className="mt-2 font-display text-5xl font-extrabold text-win num">
            +{euros(e.recoveredMonthly)}
            <span className="font-sans text-xl font-semibold"> /mois</span>
          </p>
          <p className="mt-1">
            soit environ <strong className="num">{euros(e.recoveredYearly)} par an</strong> récupérés, pour 29 € par mois.
          </p>
          {e.ratio >= 1.5 ? (
            <p className="mt-3 font-medium">
              Chaque euro payé t&apos;en rapporterait environ <span className="num">{e.ratio.toLocaleString("fr-FR")}</span>.
            </p>
          ) : (
            <p className="mt-3 font-medium">
              À ton volume actuel, le gain estimé est proche du prix. La garantie de 30 jours te laisse vérifier sur tes vrais chiffres, sans risque.
            </p>
          )}
        </section>

        <details className="mt-4 text-sm text-muted">
          <summary className="min-h-11 cursor-pointer py-2 underline underline-offset-4">Comment on calcule ?</summary>
          <p className="mt-2">
            Estimation volontairement prudente : {pct(ASSUMPTIONS.abandonRate)} de paniers abandonnés (moyenne Baymard Institute),
            email connu pour {pct(ASSUMPTIONS.reachableRate)} d&apos;entre eux, et {pct(ASSUMPTIONS.recoveryRate)} de ces clients
            qui reviennent acheter après deux relances
            {a.r === "un" ? ", dont on ne compte ici que la part apportée par la seconde relance" : ""}. Soit environ{" "}
            <span className="num">{e.recoveredOrders.toLocaleString("fr-FR")}</span> commande(s) récupérée(s) par mois.
          </p>
        </details>

        <div className="mt-8">
          <ButtonLink href={`/plan?${toQuery(a)}`}>Voir mes relances, prêtes à l&apos;emploi</ButtonLink>
          <p className="mt-2 text-sm text-muted">Gratuit. Tu peux copier la première tout de suite.</p>
        </div>
      </main>
    </>
  );
}

export default function Page(props: PageProps<"/resultat">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Content searchParams={props.searchParams} />
    </Suspense>
  );
}
