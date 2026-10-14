import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { planSchema } from "@/lib/answers";
import { sendEmail } from "@/lib/email";
import { buildSequence } from "@/lib/sequence";
import { site } from "@/lib/site";
import { getStripe } from "@/lib/stripe";

// Seule source de vérité sur les paiements : chaque événement est vérifié par sa signature Stripe.
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!stripe || !secret || !signature) return NextResponse.json({ error: "non configuré" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "signature invalide" }, { status: 400 });
  }

  const admin = process.env.ADMIN_EMAIL;

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (session.payment_status === "unpaid") break;
      const email = session.customer_details?.email;
      const parsed = planSchema.safeParse(session.metadata ?? {});
      const accessUrl = `${site.url}/acces?session_id=${session.id}`;

      if (email && parsed.success) {
        const [r1, r2] = buildSequence(parsed.data);
        await sendEmail(
          email,
          "Ton plan Panier Perdu est prêt",
          `Bonjour,

Merci pour ta confiance. Ton paiement est confirmé.

Ton accès (garde ce lien) : ${accessUrl}

— Relance 1 (${r1.delay}) —
Objet : ${r1.subject}

${r1.body}

— Relance 2 (${r2.delay}) —
Objet : ${r2.subject}

${r2.body}

La suite : on t'écrit sous 24 h pour brancher ta boutique.
Satisfait ou remboursé 30 jours : réponds simplement à cet email.

${site.name}`,
        );
      }
      if (admin) {
        const m = session.metadata ?? {};
        await sendEmail(
          admin,
          `💶 Nouvelle vente : ${(session.amount_total ?? 0) / 100} € — ${m.b || "boutique sans nom"}`,
          `Client : ${email ?? "?"}\nFormule : ${m.plan}\nPlateforme : ${m.s}\nCommandes/mois : ${m.c} · Panier : ${m.p} € · Situation : ${m.r}\nAccès : ${accessUrl}\n\nÀ faire : écrire au client sous 24 h pour le branchement.`,
        );
      }
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      if (admin) await sendEmail(admin, "Paiement échoué", `Client : ${invoice.customer_email ?? invoice.customer}\nFacture : ${invoice.id}`);
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      if (admin) await sendEmail(admin, "Résiliation", `Abonnement résilié : ${sub.id} (client ${sub.customer})`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
