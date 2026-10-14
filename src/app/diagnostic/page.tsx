import type { Metadata } from "next";
import { TopBar } from "@/components/ui";
import { Quiz } from "./quiz";

export const metadata: Metadata = {
  title: "Combien te coûtent tes paniers abandonnés ?",
  description: "3 questions pour chiffrer ce que tes paniers abandonnés te font perdre chaque mois.",
};

export default function DiagnosticPage() {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-xl px-4 pt-4 pb-16">
        <Quiz />
      </main>
    </>
  );
}
