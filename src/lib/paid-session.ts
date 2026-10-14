import "server-only";
import type Stripe from "stripe";
import { planSchema, type PlanAnswers } from "./answers";
import { getStripe } from "./stripe";

const ID = /^cs_(test|live)_[A-Za-z0-9]{10,200}$/;

export type PaidSession = { session: Stripe.Checkout.Session; answers: PlanAnswers; email: string | null };

// Vérifie auprès de Stripe (côté serveur) que la session est réellement payée.
export async function getCheckoutSession(id: unknown): Promise<
  { state: "paid"; data: PaidSession } | { state: "unpaid"; answers: PlanAnswers | null } | { state: "invalid" }
> {
  const stripe = getStripe();
  if (!stripe || typeof id !== "string" || !ID.test(id)) return { state: "invalid" };
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(id);
  } catch {
    return { state: "invalid" };
  }
  const parsed = planSchema.safeParse(session.metadata ?? {});
  const answers = parsed.success ? parsed.data : null;
  const paid = session.status === "complete" && session.payment_status !== "unpaid";
  if (!paid || !answers) return { state: "unpaid", answers };
  return { state: "paid", data: { session, answers, email: session.customer_details?.email ?? null } };
}
