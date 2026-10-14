import { ButtonLink, TopBar } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-xl px-4 pt-10 pb-16">
        <p className="font-display text-6xl font-extrabold text-action num">404</p>
        <h1 className="mt-3 font-display text-3xl font-bold">Cette page s&apos;est perdue, elle aussi.</h1>
        <p className="mt-3 text-muted">Le lien est peut-être incomplet. Repars de l&apos;accueil, tout y est.</p>
        <div className="mt-6"><ButtonLink href="/">Revenir à l&apos;accueil</ButtonLink></div>
      </main>
    </>
  );
}
