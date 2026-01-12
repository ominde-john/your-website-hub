import type { VercelRequest, VercelResponse } from "@vercel/node";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  if (!RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return res.status(500).send("Server misconfigured");
  }

  try {
    const payload = req.body;

    const user = payload?.record;
    const oldUser = payload?.old_record;

    if (!user?.email) {
      return res.status(200).send("No user email");
    }

    const emailJustConfirmed =
      user.email_confirmed_at &&
      (!oldUser || !oldUser.email_confirmed_at);

    if (!emailJustConfirmed) {
      return res.status(200).send("Email not confirmed yet");
    }

    const firstName =
      user.user_metadata?.full_name?.split(" ")[0] ||
      user.user_metadata?.name ||
      "there";

    console.log("Sending welcome email to:", user.email);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Teksoft Community <teksoft@jonzjohn>",
        to: [user.email],
        subject: "Welcome to Teksoft Community 🎉",
        html: `
          <h1>Welcome ${firstName}!</h1>
          <p>Your account is now active.</p>
          <a href="https://www.teksoft.co.ke/dashboard">
            Go to Dashboard
          </a>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend error:", errorText);
      return res.status(500).send("Email failed");
    }

    return res.status(200).send("Welcome email sent");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
}
