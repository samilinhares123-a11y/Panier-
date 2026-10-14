import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Politique de confidentialité", description: "Comment Panier Perdu traite les données personnelles." };

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité" updated="14 octobre 2026">
      <p>
        Responsable du traitement : <mark>{site.legal.owner}</mark>, <mark>{site.legal.address}</mark>. Contact : {site.contactEmail}.
      </p>
      <h2>Ce que nous collectons, et pourquoi</h2>
      <ul>
        <li>
          <strong>Réponses au diagnostic</strong> (volume de commandes, panier moyen, nom de la boutique) : pour calculer ton estimation
          et écrire tes relances. Elles ne sont conservées que si tu t&apos;abonnes.
        </li>
        <li>
          <strong>Email et informations de paiement</strong> : pour gérer ton abonnement (exécution du contrat). Les données de carte sont
          traitées uniquement par Stripe ; nous n&apos;y avons jamais accès.
        </li>
        <li>
          <strong>Mesure d&apos;audience</strong> : Vercel Web Analytics, sans cookie et sans identification individuelle (intérêt légitime).
          Aucun cookie publicitaire.
        </li>
        <li>
          <strong>Données des clients de ta boutique</strong> (email, prénom, contenu du panier) : traitées uniquement pour envoyer tes
          relances et compter les ventes récupérées, sur tes instructions, en tant que sous-traitant.
        </li>
      </ul>
      <h2>Durée de conservation</h2>
      <p>
        Données d&apos;abonnement : pendant l&apos;abonnement, puis supprimées dans les 3 mois suivant la résiliation (factures conservées
        10 ans, obligation légale). Données des paniers abandonnés : supprimées 90 jours après la relance.
      </p>
      <h2>Prestataires</h2>
      <ul>
        <li>Vercel (hébergement) — États-Unis, clauses contractuelles types</li>
        <li>Stripe (paiement) — Irlande et États-Unis</li>
        <li>Resend (envoi des emails) — États-Unis, clauses contractuelles types</li>
      </ul>
      <h2>Tes droits</h2>
      <p>
        Accès, rectification, suppression, opposition, portabilité : écris à {site.contactEmail}, réponse sous un mois. Tu peux aussi
        saisir la CNIL (cnil.fr).
      </p>
    </LegalPage>
  );
}
