import { ButtonLink, Kicker, TopBar } from "@/components/ui";
import { site } from "@/lib/site";

const benefits = [
  {
    title: "Branché à ta boutique, sans une ligne de code",
    text: "Une extension à installer sur WooCommerce. Panier Perdu repère tout seul les clients qui partent avant de payer.",
  },
  {
    title: "Deux relances qui donnent envie de revenir",
    text: "La première 1 h après l'abandon, la seconde le lendemain, avec un code de réduction si tu le souhaites. Écrites en bon français, à ton nom.",
  },
  {
    title: "Tu vois ce que ça rapporte, en euros",
    text: "Chaque commande récupérée s'ajoute au compteur. Tu sais chaque mois si tes 29 € valent le coup.",
  },
];

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-3xl px-4 pb-28 sm:pb-16">
        {/* Promesse : reprise mot pour mot des vidéos */}
        <section className="pt-6 pb-10 sm:pt-12">
          <Kicker>Pour les boutiques WooCommerce et Shopify</Kicker>
          <h1 className="mt-3 font-display text-[2.6rem] leading-[1.02] font-extrabold tracking-tight sm:text-6xl">
            {site.promise}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{site.description}</p>
          <div className="mt-7 hidden sm:block">
            <ButtonLink href="/diagnostic">Commencer — c&apos;est gratuit</ButtonLink>
            <p className="mt-3 text-sm text-muted">3 questions · 1 minute · sans carte bancaire</p>
          </div>
        </section>

        {/* La douleur, chiffrée */}
        <section aria-labelledby="douleur" className="rounded-xl border border-line bg-card p-5 sm:p-8">
          <div className="flex items-end gap-3">
            <p id="douleur" className="font-display text-6xl leading-none font-extrabold text-action num">7/10</p>
            <p className="pb-1 font-medium">paniers sont abandonnés avant le paiement.</p>
          </div>
          <div className="mt-5 grid grid-cols-10 gap-1.5" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className={`h-8 rounded-sm ${i < 3 ? "bg-ink" : "border-2 border-dashed border-action"}`}
              />
            ))}
          </div>
          <div className="rule-dashed mt-5 pt-4 text-[0.95rem] text-muted">
            <p>
              Une boutique qui fait 40 commandes par mois laisse filer environ{" "}
              <strong className="text-ink">93 paniers</strong>. Sans relance, presque aucun ne revient.
            </p>
            <p className="mt-2 text-xs">Source : Baymard Institute, moyenne de 49 études sur l&apos;abandon de panier.</p>
          </div>
        </section>

        {/* Trois bénéfices */}
        <section aria-label="Ce que fait Panier Perdu" className="mt-10">
          <ol className="divide-y divide-line border-y border-line">
            {benefits.map((b, i) => (
              <li key={b.title} className="flex gap-4 py-5">
                <span className="font-display text-xl font-extrabold text-action num">0{i + 1}</span>
                <div>
                  <h2 className="font-display text-xl leading-tight font-bold">{b.title}</h2>
                  <p className="mt-1.5 text-muted">{b.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 rounded-xl bg-ink p-6 text-paper sm:p-8">
          <p className="font-display text-2xl font-bold">
            29 € par mois pour toute ta boutique. Relances illimitées.
          </p>
          <p className="mt-2 text-paper/75">
            Sans engagement. Satisfait ou remboursé pendant 30 jours. Une seule commande récupérée par mois suffit, en général, à le rembourser.
          </p>
          <div className="mt-6 hidden sm:block">
            <ButtonLink href="/diagnostic">Commencer — c&apos;est gratuit</ButtonLink>
          </div>
        </section>
      </main>

      {/* Bouton collé en bas sur mobile, atteignable au pouce */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
        <ButtonLink href="/diagnostic">Commencer — c&apos;est gratuit</ButtonLink>
        <p className="mt-1.5 text-center text-xs text-muted">3 questions · 1 minute · sans carte bancaire</p>
      </div>
    </>
  );
}
