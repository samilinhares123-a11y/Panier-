import type { PlanAnswers } from "./answers";

export type RelanceEmail = {
  step: 1 | 2;
  delay: string;
  subject: string;
  body: string;
};

// Génère la séquence de 2 relances à partir des réponses. [Prénom] et [Lien du panier]
// sont remplacés automatiquement à l'envoi.
export function buildSequence(a: PlanAnswers): RelanceEmail[] {
  const shop = a.b || "notre boutique";
  const tu = a.v === "tu";
  const discount = a.d !== "0" ? Number(a.d) : 0;
  const code = `RETOUR${discount}`;

  const first: RelanceEmail = {
    step: 1,
    delay: "1 h après l'abandon",
    subject: tu ? `Tu as oublié quelque chose chez ${shop}` : `Vous avez oublié quelque chose chez ${shop}`,
    body: tu
      ? `Bonjour [Prénom],

Tu as laissé des articles dans ton panier chez ${shop}. On te les a gardés de côté.

Tu peux reprendre ta commande exactement là où tu l'as laissée :
[Lien du panier]

Une question sur un produit, la livraison ou la taille ? Réponds simplement à cet email, c'est une vraie personne qui te lira.

À tout de suite,
L'équipe ${shop}`
      : `Bonjour [Prénom],

Vous avez laissé des articles dans votre panier chez ${shop}. Nous vous les avons gardés de côté.

Vous pouvez reprendre votre commande exactement là où vous l'avez laissée :
[Lien du panier]

Une question sur un produit, la livraison ou la taille ? Répondez simplement à cet email, c'est une vraie personne qui vous lira.

À très vite,
L'équipe ${shop}`,
  };

  const offer = discount
    ? tu
      ? `\n\nPour te décider, voici ${discount} % de réduction sur ce panier avec le code ${code}, valable 48 h.`
      : `\n\nPour vous décider, voici ${discount} % de réduction sur ce panier avec le code ${code}, valable 48 h.`
    : "";

  const second: RelanceEmail = {
    step: 2,
    delay: "24 h après l'abandon",
    subject: discount
      ? tu
        ? `Ton panier t'attend encore (−${discount} % pendant 48 h)`
        : `Votre panier vous attend encore (−${discount} % pendant 48 h)`
      : tu
        ? "Ton panier t'attend encore"
        : "Votre panier vous attend encore",
    body: tu
      ? `Bonjour [Prénom],

Petit rappel : ton panier chez ${shop} est toujours là, mais on ne pourra pas garder les articles indéfiniment.${offer}

Reprendre ma commande :
[Lien du panier]

Si ce n'est plus le bon moment, pas de souci : c'est notre dernier message à ce sujet.

L'équipe ${shop}`
      : `Bonjour [Prénom],

Petit rappel : votre panier chez ${shop} est toujours là, mais nous ne pourrons pas garder les articles indéfiniment.${offer}

Reprendre ma commande :
[Lien du panier]

Si ce n'est plus le bon moment, aucun souci : c'est notre dernier message à ce sujet.

L'équipe ${shop}`,
  };

  return [first, second];
}
