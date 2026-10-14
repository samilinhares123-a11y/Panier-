"use client";

import Link from "next/link";

export default function GlobalError() {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#f5f0e6", color: "#17171c", padding: "2rem" }}>
        <h1>Oups, quelque chose a coincé.</h1>
        <p>Rien n&apos;a été prélevé.</p>
        <Link href="/" style={{ color: "#c73d18", fontWeight: 600 }}>Revenir à l&apos;accueil</Link>
      </body>
    </html>
  );
}
