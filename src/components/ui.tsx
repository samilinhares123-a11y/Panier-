import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 5h3l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h7.6a1.5 1.5 0 0 0 1.5-1.1L21 8H7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20" r="1.6" fill="var(--color-action)" />
        <circle cx="17" cy="20" r="1.6" fill="var(--color-action)" />
      </svg>
      Panier Perdu
    </Link>
  );
}

export function TopBar({ children }: { children?: ReactNode }) {
  return (
    <header className="mx-auto flex max-w-3xl items-center justify-between px-4 pt-4 pb-2">
      <Logo />
      {children}
    </header>
  );
}

const btn =
  "inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-action px-6 text-lg font-semibold text-white transition-colors hover:bg-action-dark active:translate-y-px disabled:opacity-50 sm:w-auto";

export function ButtonLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} className={`${btn} ${props.className ?? ""}`} />;
}

export function Button(props: ComponentProps<"button">) {
  return <button {...props} className={`${btn} ${props.className ?? ""}`} />;
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{children}</p>;
}

export function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`inline-block h-4 w-4 shrink-0 ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`inline-block h-5 w-5 shrink-0 ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
