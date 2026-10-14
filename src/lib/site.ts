// Réglages publics du site. Les champs [À COMPLÉTER] sont à remplir avant la mise en production.

export const site = {
  name: "Panier Perdu",
  // La promesse : à reprendre mot pour mot dans les vidéos.
  promise: "Récupère les paniers abandonnés de ta boutique.",
  description:
    "Deux relances bien écrites, envoyées au bon moment, et le compteur des euros récupérés. 29 € par mois, sans engagement.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "[EMAIL DE CONTACT À COMPLÉTER]",
  legal: {
    owner: "[NOM PRÉNOM ou RAISON SOCIALE — À COMPLÉTER]",
    status: "[STATUT : micro-entreprise / EI / SASU — À COMPLÉTER]",
    siret: "[SIRET — À COMPLÉTER]",
    address: "[ADRESSE POSTALE — À COMPLÉTER]",
    publisher: "[NOM DU DIRECTEUR DE LA PUBLICATION — À COMPLÉTER]",
    vat: "TVA non applicable, art. 293 B du CGI [À CONFIRMER selon ton statut]",
  },
} as const;

export const plans = {
  mensuel: {
    id: "mensuel",
    label: "Mensuel",
    amountCents: 2900,
    interval: "month",
    priceLabel: "29 €",
    periodLabel: "par mois",
    perDay: "0,95 €",
    note: "Le plus souple",
  },
  annuel: {
    id: "annuel",
    label: "Annuel",
    amountCents: 29000,
    interval: "year",
    priceLabel: "290 €",
    periodLabel: "par an",
    perDay: "0,79 €",
    note: "2 mois offerts · 24,17 €/mois",
  },
} as const;

export type PlanId = keyof typeof plans;

export const guarantee = {
  days: 30,
  refundStart: "48 h",
  refundVisible: "5 à 10 jours ouvrés",
  setupDays: 14,
};
