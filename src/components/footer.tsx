import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-8 text-sm text-muted">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {site.name}</p>
        <nav aria-label="Informations légales" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link className="underline-offset-4 hover:underline" href="/mentions-legales">Mentions légales</Link>
          <Link className="underline-offset-4 hover:underline" href="/cgv">CGV</Link>
          <Link className="underline-offset-4 hover:underline" href="/confidentialite">Confidentialité</Link>
          <a className="underline-offset-4 hover:underline" href={`mailto:${site.contactEmail}`}>Contact</a>
        </nav>
      </div>
    </footer>
  );
}
