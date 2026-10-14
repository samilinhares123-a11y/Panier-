import { Suspense } from "react";
import { PageSkeleton } from "@/components/skeleton";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TopBar } from "@/components/ui";
import { parsePlan } from "@/lib/answers";
import { Preview } from "./preview";

export const metadata: Metadata = {
  title: "Tes relances, prêtes à l'emploi",
  description: "Ta séquence de relances de paniers abandonnés, écrite pour ta boutique.",
  robots: { index: false },
};

async function Content({ searchParams }: Pick<PageProps<"/plan">, "searchParams">) {
  const a = parsePlan(await searchParams);
  if (!a) redirect("/diagnostic");
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-xl px-4 pt-4 pb-16">
        <Preview initial={a} />
      </main>
    </>
  );
}

export default function Page(props: PageProps<"/plan">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Content searchParams={props.searchParams} />
    </Suspense>
  );
}
