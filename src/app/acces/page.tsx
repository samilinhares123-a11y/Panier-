import { Suspense } from "react";
import { PageSkeleton } from "@/components/skeleton";
import type { Metadata } from "next";
import { EmailCard } from "@/components/email-card";
import { ButtonLink, CheckIcon, Kicker, TopBar } from "@/components/ui";
import { toQuery } from "@/lib/answers";
import { getCheckoutSession } from "@/lib/paid-session";
import { buildSequence } from "@/lib/sequence";
import { guarantee, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ton accès",
  robots: { index: false, follow: false },
};

async function Content({ searchParams }: Pick<PageProps<"/acces">, "searchParams">) {
  const { session_id } = await searchParams;
  const result = await getCheckoutSession(session_id);

  if (result.state !== "paid") {
    const retry = result.state === "unpaid" && result.answers ? `/offre?${toQuery(result.answers)}#paiement` : "/diagnostic";
    return (
      <>
        <TopBar />
        <main className="mx-auto max-w-xl px-4 pt-6 pb-16">
          <Kicker>Paiement non confirmé</Kicker>
          <h1 className="mt-3 font-display text-3xl font-bold">Ton paiement n&apos;est pas passé.</h1>
          <p className="mt-3 text-muted">
            Aucun montant n&apos;a été prélevé. Ça arrive quand la carte est refusée, que la validation bancaire n&apos;a pas
            abouti ou que la page a été fermée trop tôt. Tu peux réessayer, avec la même carte ou une autre.
          </p>
          <div className="mt-6">
            <ButtonLink href={retry}>Réessayer le paiement</ButtonLink>
          </div>
          <p className="mt-4 text-sm text-muted">
            Un doute ? Écris-nous à <a className="underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>, on te répond sous 24 h.
          </p>
        </main>
      </>
    );
  }

  const { answers, email } = result.data;
  const sequence = buildSequence(answers);

  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-xl px-4 pt-4 pb-16">
        <div className="rounded-xl bg-win p-5 text-white">
          <p className="flex items-center gap-2 font-semibold"><CheckIcon /> Paiement confirmé</p>
          <h1 className="mt-2 font-display text-3xl leading-tight font-extrabold">Bienvenue. Ton plan est à toi.</h1>
          <p className="mt-2 text-white/85">
            {email ? <>Une copie part à <strong>{email}</strong>. </> : null}
            Garde cette page dans tes favoris : c&apos;est ton accès.
          </p>
        </div>

        <h2 className="mt-8 font-display text-2xl font-bold">Ta séquence complète</h2>
        <div className="mt-4 flex flex-col gap-4">
          {sequence.map((e) => (
            <EmailCard key={e.step} email={e} />
          ))}
        </div>

        <section className="mt-8 rounded-xl border border-line bg-card p-5">
          <h2 className="font-display text-xl font-bold">La suite</h2>
          <ol className="mt-3 flex flex-col gap-3">
            <li><strong>Sous 24 h :</strong> on t&apos;écrit pour brancher ta boutique ({answers.s === "shopify" ? "Shopify" : answers.s === "woo" ? "WooCommerce" : "ta plateforme"}).</li>
            <li><strong>Sous {guarantee.setupDays} jours au plus tard :</strong> tes relances partent toutes seules, et le compteur d&apos;euros récupérés démarre.</li>
            <li><strong>En attendant :</strong> tes deux relances sont prêtes ci-dessus, tu peux déjà les utiliser.</li>
          </ol>
        </section>

        <section className="mt-6 text-sm text-muted">
          <p>
            Résilier ou changer de carte :{" "}
            <a className="font-semibold text-ink underline" href={`/api/portail?session_id=${encodeURIComponent(String(session_id))}`}>
              gérer mon abonnement
            </a>
            . Remboursement sous {guarantee.days} jours : un email à{" "}
            <a className="underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> suffit.
          </p>
        </section>
      </main>
    </>
  );
}

export default function Page(props: PageProps<"/acces">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Content searchParams={props.searchParams} />
    </Suspense>
  );
}
