import type { ReactNode } from "react";
import { TopBar } from "./ui";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-2xl px-4 pt-6 pb-16">
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-muted">Dernière mise à jour : {updated}</p>
        <div className="mt-6 flex flex-col gap-4 [&_h2]:mt-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_mark]:bg-action/15 [&_mark]:px-1">
          {children}
        </div>
      </main>
    </>
  );
}
