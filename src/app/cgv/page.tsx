import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal";
import { guarantee, site } from "@/lib/site";

export const metadata: Metadata = { title: "Conditions générales de vente", description: "Conditions générales de vente de Panier Perdu." };

export default function Page() {
  const l = site.legal;
  return (
    <LegalPage title="Conditions générales de vente" updated="14 octobre 2026">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent la vente de l&apos;abonnement Panier Perdu, service en ligne de relance des paniers abandonnés,
        vendu par <mark>{l.owner}</mark> (SIRET <mark>{l.siret}</mark>, <mark>{l.address}</mark>), ci-après « le Prestataire ». Le service
        s&apos;adresse à des professionnels (commerçants en ligne).
      </p>
      <h2>2. Le service</h2>
      <p>L&apos;abonnement comprend, pour une boutique :</p>
      <ul>
        <li>la détection des paniers abandonnés, une fois la boutique branchée au service ;</li>
        <li>l&apos;envoi d&apos;une séquence de deux relances par email, sans limite de volume, avec un code de réduction facultatif sur la seconde ;</li>
        <li>le suivi du chiffre d&apos;affaires récupéré, en euros.</li>
      </ul>
      <p>
        La séquence de relances personnalisée est livrée immédiatement après le paiement. Pendant la phase « accès fondateur », le
        branchement automatique à la boutique est mis en service avec le client au plus tard {guarantee.setupDays} jours après le paiement.
        À défaut, le client est remboursé intégralement sur simple demande.
      </p>
      <h2>3. Prix et paiement</h2>
      <p>
        Formule mensuelle : 29 € par mois. Formule annuelle : 290 € par an. <mark>{l.vat}</mark>. Le paiement s&apos;effectue par carte
        bancaire via Stripe, à la souscription puis automatiquement à chaque échéance. En cas d&apos;échec de paiement, le client est
        prévenu ; le service peut être suspendu si le paiement n&apos;est pas régularisé.
      </p>
      <h2>4. Durée et résiliation</h2>
      <p>
        L&apos;abonnement est sans engagement et se renouvelle automatiquement à chaque période (mois ou année). Le client peut le résilier
        à tout moment depuis le lien « gérer mon abonnement » de sa page d&apos;accès ou par email à {site.contactEmail}. La résiliation prend
        effet à la fin de la période en cours, sans frais.
      </p>
      <h2>5. Garantie satisfait ou remboursé</h2>
      <p>
        Pendant {guarantee.days} jours à compter du premier paiement, le client peut demander le remboursement intégral de ce paiement,
        sans justification, par email à {site.contactEmail}. Le remboursement est lancé sous {guarantee.refundStart} sur le moyen de
        paiement utilisé et apparaît sur le compte sous {guarantee.refundVisible}, selon la banque. L&apos;abonnement est alors résilié.
      </p>
      <h2>6. Obligations du client</h2>
      <p>
        Le client reste responsable des emails envoyés en son nom à ses propres clients : il les informe de ces relances dans sa politique
        de confidentialité et respecte la réglementation applicable (RGPD, recommandations de la CNIL).
      </p>
      <h2>7. Responsabilité</h2>
      <p>
        Le Prestataire est tenu à une obligation de moyens. Les montants récupérés présentés avant l&apos;achat sont des estimations, pas une
        garantie de résultat. La responsabilité du Prestataire est limitée au montant payé par le client au cours des douze derniers mois.
      </p>
      <h2>8. Données personnelles</h2>
      <p>
        Pour les données des clients de la boutique, le Prestataire agit en sous-traitant du client (article 28 du RGPD). Voir la{" "}
        <Link className="underline" href="/confidentialite">politique de confidentialité</Link>.
      </p>
      <h2>9. Droit applicable</h2>
      <p>
        Droit français. En cas de litige, les parties recherchent d&apos;abord une solution amiable ; à défaut, les tribunaux du ressort du
        siège du Prestataire sont compétents.
      </p>
    </LegalPage>
  );
}
