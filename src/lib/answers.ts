import { z } from "zod";

// Réponses du diagnostic + personnalisation. Elles voyagent dans l'URL puis dans
// les métadonnées Stripe : tout est revalidé côté serveur avec ce schéma.

export const ORDERS = { "12": "moins de 20", "35": "20 à 50", "75": "50 à 100", "130": "plus de 100" } as const;
export const BASKETS = { "25": "moins de 30 €", "45": "30 à 60 €", "80": "60 à 100 €", "130": "plus de 100 €" } as const;
export const CURRENT = {
  rien: "Rien, le client part",
  un: "Un email automatique, sans suite",
  main: "Je relance à la main, quand j'ai le temps",
  nsp: "Je ne sais pas",
} as const;
export const PLATFORMS = { woo: "WooCommerce", shopify: "Shopify", autre: "Autre" } as const;
export const DISCOUNTS = ["0", "10", "15"] as const;

const keys = <T extends object>(o: T) => Object.keys(o) as [string, ...string[]];

export const diagnosticSchema = z.object({
  c: z.enum(keys(ORDERS)),
  p: z.enum(keys(BASKETS)),
  r: z.enum(keys(CURRENT)),
});

export const planSchema = diagnosticSchema.extend({
  b: z
    .string()
    .trim()
    .max(40)
    .regex(/^[\p{L}\p{N} '’&.\-]*$/u)
    .catch(""),
  s: z.enum(keys(PLATFORMS)).catch("woo"),
  d: z.enum(DISCOUNTS).catch("10"),
  v: z.enum(["vous", "tu"]).catch("vous"),
});

export type Diagnostic = z.infer<typeof diagnosticSchema>;
export type PlanAnswers = z.infer<typeof planSchema>;

type Raw = Record<string, string | string[] | undefined>;

const flat = (raw: Raw) =>
  Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]));

export function parseDiagnostic(raw: Raw): Diagnostic | null {
  const r = diagnosticSchema.safeParse(flat(raw));
  return r.success ? r.data : null;
}

export function parsePlan(raw: Raw): PlanAnswers | null {
  const r = planSchema.safeParse(flat(raw));
  return r.success ? r.data : null;
}

export function toQuery(a: Partial<PlanAnswers>) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(a)) if (v !== undefined && v !== "") q.set(k, String(v));
  return q.toString();
}
