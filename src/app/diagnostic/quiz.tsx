"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BASKETS, CURRENT, ORDERS } from "@/lib/answers";

const questions = [
  {
    key: "c",
    title: "Combien de commandes fais-tu par mois ?",
    why: "Pour chaque commande passée, environ deux autres paniers sont abandonnés en route.",
    options: ORDERS,
  },
  {
    key: "p",
    title: "Quel est ton panier moyen ?",
    why: "Chaque panier abandonné, c'est cette somme qui reste sur la table.",
    options: BASKETS,
  },
  {
    key: "r",
    title: "Quand un client abandonne son panier, que se passe-t-il aujourd'hui ?",
    why: "Un client qui a rempli son panier était à un clic d'acheter. C'est le plus facile à faire revenir.",
    options: CURRENT,
  },
] as const;

export function Quiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const q = questions[step];

  function choose(value: string) {
    const next = { ...answers, [q.key]: value };
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0 });
    } else {
      router.push(`/resultat?${new URLSearchParams(next).toString()}`);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span className="num">
          Question {step + 1} sur {questions.length}
        </span>
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="min-h-11 px-2 underline underline-offset-4">
            ← Retour
          </button>
        )}
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={step + 1}
        aria-label="Progression"
      >
        <div className="h-full rounded-full bg-action transition-all duration-300" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
      </div>

      <h1 className="mt-8 font-display text-3xl leading-tight font-bold tracking-tight">{q.title}</h1>

      <ul className="mt-6 flex flex-col gap-3">
        {Object.entries(q.options).map(([value, label]) => {
          const selected = answers[q.key] === value;
          return (
            <li key={value}>
              <button
                type="button"
                onClick={() => choose(value)}
                className={`flex min-h-16 w-full items-center justify-between rounded-lg border-2 px-5 text-left text-lg font-medium transition-colors ${
                  selected ? "border-action bg-card" : "border-line bg-card hover:border-ink"
                }`}
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
                <span aria-hidden="true" className="text-muted">→</span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 border-l-4 border-action pl-4 text-muted">{q.why}</p>
    </div>
  );
}
