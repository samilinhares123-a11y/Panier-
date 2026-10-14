import { TopBar } from "./ui";

export function PageSkeleton() {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-xl px-4 pt-4 pb-16" aria-busy="true">
        <div className="h-4 w-32 animate-pulse rounded bg-line" />
        <div className="mt-4 h-10 w-4/5 animate-pulse rounded bg-line" />
        <div className="mt-6 h-40 animate-pulse rounded-xl bg-line/60" />
      </main>
    </>
  );
}
