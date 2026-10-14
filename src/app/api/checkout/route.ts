import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { planSchema } from "@/lib/answers";
import { plans } from "@/lib/site";
import { getStripe } from "@/lib/stripe";

const bodySchema = z.object({
  plan: z.enum(["mensuel", "annuel"]),
  answers: planSchema,
});

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Le paiement n'est pas encore configuré." }, { status: 503 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides. Recommence le diagnostic." }, { status: 400 });
  }
  const { plan, answers } = parsed.data;
  const p = plans[plan];
  // Les réponses suivent le paiement : c'est ce qui permet de livrer sans base de données.
  const metadata = { plan, ...answers };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ui_mode: "embedded_page",
      locale: "fr",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: p.amountCents,
            recurring: { interval: p.interval },
            product_data: { name: `Panier Perdu — ${p.label}` },
          },
        },
      ],
      metadata,
      subscription_data: { metadata },
      return_url: `${req.nextUrl.origin}/acces?session_id={CHECKOUT_SESSION_ID}`,
      custom_text: {
        submit: { message: "Sans engagement, résiliable à tout moment. Satisfait ou remboursé 30 jours." },
      },
    });
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("[checkout] création de session impossible", err);
    return NextResponse.json({ error: "Le paiement n'a pas pu s'ouvrir. Réessaie dans un instant." }, { status: 502 });
  }
}
