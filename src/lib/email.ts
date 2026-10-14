import "server-only";

// Envoi via l'API HTTP de Resend (pas de bibliothèque à charger).
// Sans RESEND_API_KEY, l'email est seulement écrit dans les logs Vercel.
export async function sendEmail(to: string, subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Panier Perdu <onboarding@resend.dev>";
  if (!key) {
    console.log(`[email non envoyé — RESEND_API_KEY absente] à ${to} : ${subject}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text }),
  });
  if (!res.ok) console.error(`[email] échec d'envoi à ${to}`, res.status, await res.text());
}
