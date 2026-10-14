"use client";

import { ButtonLink, TopBar } from "@/components/ui";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-xl px-4 pt-10 pb-16">
        <h1 className="font-display text-3xl font-bold">Oups, quelque chose a coincé.</h1>
        <p className="mt-3 text-muted">Rien n&apos;a été prélevé. Réessaie, ou repars de l&apos;accueil.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="min-h-14 rounded-lg border-2 border-ink px-6 font-semibold">Réessayer</button>
          <ButtonLink href="/">Revenir à l&apos;accueil</ButtonLink>
        </div>
      </main>
    </>
  );
}
