"use client";

import { useState } from "react";
import { EmailCard } from "@/components/email-card";
import { ButtonLink, Kicker, LockIcon } from "@/components/ui";
import { PLATFORMS, toQuery, type PlanAnswers } from "@/lib/answers";
import { buildSequence } from "@/lib/sequence";

const field = "mt-1.5 min-h-12 w-full rounded-lg border-2 border-line bg-card px-3 text-base focus:border-ink focus:outline-none";

function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Record<T, string>;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {(Object.entries(options) as [T, string][]).map(([k, v]) => (
          <button
            key={k}
            type="button"
            aria-pressed={value === k}
            onClick={() => onChange(k)}
            className={`min-h-11 rounded-lg border-2 px-4 text-sm font-medium ${
              value === k ? "border-ink bg-ink text-paper" : "border-line bg-card"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function Preview({ initial }: { initial: PlanAnswers }) {
  const [a, setA] = useState(initial);
  const set = <K extends keyof PlanAnswers>(k: K, v: PlanAnswers[K]) => setA((prev) => ({ ...prev, [k]: v }));
  const [first, second] = buildSequence(a);

  return (
    <>
      <Kicker>Ton avant-goût gratuit</Kicker>
      <h1 className="mt-3 font-display text-3xl leading-tight font-bold tracking-tight">
        Tes relances, écrites pour ta boutique.
      </h1>
      <p className="mt-2 text-muted">Remplis deux secondes, le texte s&apos;adapte en direct.</p>

      <div className="mt-6 flex flex-col gap-5 rounded-xl border border-line p-4">
        <label className="block">
          <span className="text-sm font-semibold">Nom de ta boutique</span>
          <input
            className={field}
            value={a.b}
            maxLength={40}
            placeholder="Ex. : Atelier Lune"
            autoComplete="organization"
            onChange={(e) => set("b", e.target.value.replace(/[^\p{L}\p{N} '’&.\-]/gu, ""))}
          />
        </label>
        <Choice label="Tes clients, tu les…" value={a.v} options={{ vous: "Vouvoies", tu: "Tutoies" }} onChange={(v) => set("v", v)} />
        <Choice
          label="Code de réduction sur la 2ᵉ relance"
          value={a.d}
          options={{ "0": "Aucun", "10": "−10 %", "15": "−15 %" }}
          onChange={(v) => set("d", v)}
        />
        <Choice label="Ta boutique est sur" value={a.s} options={PLATFORMS} onChange={(v) => set("s", v)} />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <EmailCard email={first} />
        <p className="text-sm text-muted">
          Celle-ci est à toi, gratuitement : copie-la et colle-la dans ton outil d&apos;emailing si tu en as un.
        </p>
        <EmailCard email={second} locked />
      </div>

      <section className="mt-8 rounded-xl border border-dashed border-ink/40 p-5">
        <h2 className="font-display text-xl font-bold">Ce qui se débloque avec ton plan</h2>
        <ul className="mt-3 flex flex-col gap-2.5">
          {[
            a.d === "0" ? "La 2ᵉ relance, envoyée le lendemain" : `La 2ᵉ relance, avec ton code −${a.d} % qui se crée tout seul`,
            "L'envoi automatique, à chaque panier abandonné, sans limite",
            "Le compteur des euros récupérés, commande par commande",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <LockIcon className="mt-1 text-action" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8">
        <ButtonLink href={`/offre?${toQuery(a)}`}>Garder mon plan</ButtonLink>
        <p className="mt-2 text-sm text-muted">Tu vois le prix et la garantie avant de décider.</p>
      </div>
    </>
  );
}
