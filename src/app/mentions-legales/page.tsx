import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales", description: "Mentions légales du site Panier Perdu." };

export default function Page() {
  const l = site.legal;
  return (
    <LegalPage title="Mentions légales" updated="14 octobre 2026">
      <h2>Éditeur du site</h2>
      <p>
        <mark>{l.owner}</mark>, <mark>{l.status}</mark>
        <br />SIRET : <mark>{l.siret}</mark>
        <br />Adresse : <mark>{l.address}</mark>
        <br />Email : <mark>{site.contactEmail}</mark>
        <br />Directeur de la publication : <mark>{l.publisher}</mark>
      </p>
      <h2>Hébergement</h2>
      <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com</p>
      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, éléments graphiques et le logiciel Panier Perdu appartiennent à l&apos;éditeur. Toute reproduction sans autorisation
        est interdite. Les modèles de relances livrés aux clients peuvent être librement utilisés par eux pour leur boutique.
      </p>
    </LegalPage>
  );
}
