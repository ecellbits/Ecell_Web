"use server";

export async function verifyTurnstileToken(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || secret === "placeholder") {
    console.log("[Turnstile Mock] Skipping validation because secret is placeholder");
    return { success: true };
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });

    const data = await res.json();
    return { success: data.success };
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return { success: false };
  }
}
