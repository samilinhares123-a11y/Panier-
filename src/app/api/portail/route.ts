import { NextResponse, type NextRequest } from "next/server";
import { getCheckoutSession } from "@/lib/paid-session";
import { getStripe } from "@/lib/stripe";

// Ouvre le portail client Stripe (résiliation, carte, factures) depuis la page d'accès.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("session_id");
  const result = await getCheckoutSession(id);
  const stripe = getStripe();
  const customer = result.state === "paid" ? result.data.session.customer : null;
  if (!stripe || !customer) return NextResponse.redirect(new URL("/", req.url));

  try {
    const portal = await stripe.billingPortal.sessions.create({
      customer: typeof customer === "string" ? customer : customer.id,
      return_url: `${req.nextUrl.origin}/acces?session_id=${id}`,
      locale: "fr",
    });
    return NextResponse.redirect(portal.url, 303);
  } catch (err) {
    console.error("[portail] ouverture impossible", err);
    return NextResponse.redirect(new URL(`/acces?session_id=${id}`, req.url));
  }
}
