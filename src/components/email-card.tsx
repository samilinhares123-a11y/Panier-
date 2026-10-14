"use client";

import { useState } from "react";
import type { RelanceEmail } from "@/lib/sequence";
import { LockIcon } from "./ui";

function Body({ text }: { text: string }) {
  // Met en valeur les variables remplacées à l'envoi.
  return (
    <>
      {text.split(/(\[[^\]]+\])/g).map((part, i) =>
        part.startsWith("[") ? (
          <span key={i} className="rounded bg-line/70 px-1 font-medium">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function EmailCard({ email, locked = false }: { email: RelanceEmail; locked?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`Objet : ${email.subject}\n\n${email.body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="relative overflow-hidden rounded-xl border border-line bg-card">
      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="text-sm font-semibold">
          Relance {email.step} <span className="font-normal text-muted">· {email.delay}</span>
        </p>
        {!locked && (
          <button
            type="button"
            onClick={copy}
            className="min-h-10 rounded-md border border-ink px-3 text-sm font-semibold hover:bg-ink hover:text-paper"
          >
            {copied ? "Copié ✓" : "Copier"}
          </button>
        )}
      </header>
      <div className={locked ? "pointer-events-none select-none blur-[5px]" : ""} aria-hidden={locked}>
        <p className="px-4 pt-3 font-semibold">Objet : {email.subject}</p>
        <p className="px-4 pt-2 pb-4 whitespace-pre-line text-[0.95rem]">
          <Body text={email.body} />
        </p>
      </div>
      {locked && (
        <div className="absolute inset-0 top-12 flex items-center justify-center bg-paper/40 p-4">
          <p className="flex items-center gap-2 rounded-lg bg-ink px-4 py-3 text-center text-sm font-medium text-paper">
            <LockIcon /> Incluse dans ton plan : débloquée dès l&apos;inscription
          </p>
        </div>
      )}
    </article>
  );
}
