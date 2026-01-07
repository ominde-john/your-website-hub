import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is missing");

serve(async (req) => {
  try {
    const payload = await req.json();

    const user = payload?.record;
    const oldUser = payload?.old_record;

    if (!user?.email) {
      return new Response("No user email", { status: 200 });
    }

    // Send welcome email ONLY when email becomes confirmed
    const emailJustConfirmed =
      user.email_confirmed_at &&
      (!oldUser || !oldUser.email_confirmed_at);

    if (!emailJustConfirmed) {
      return new Response("Email not confirmed yet", { status: 200 });
    }

    const firstName =
      user.user_metadata?.full_name?.split(" ")[0] ||
      user.user_metadata?.name ||
      "there";

    console.log(`Sending welcome email to ${user.email}`);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Teksoft Community <teksoft@jonzjohn.com>",
        to: [user.email],
        subject: "Welcome to Teksoft Community! 🎉",
        html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px">
  <div style="max-width:600px;background:#fff;padding:30px;border-radius:10px">
    <h1>🎉 Welcome to Teksoft Community!</h1>
    <p>Hi ${firstName},</p>
    <p>Your account is now active. We’re excited to have you in the Teksoft Community.</p>
    <a href="https://teksoftllc.jonzjohn.com/dashboard"
       style="display:inline-block;margin-top:20px;padding:12px 24px;
       background:#667eea;color:#fff;text-decoration:none;border-radius:6px">
       Go to Dashboard
    </a>
    <p style="margin-top:30px;font-size:12px;color:#888">
      © 2026 Teksoft Community
    </p>
  </div>
</body>
</html>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend error:", error);
      throw new Error(error);
    }

    return new Response("Welcome email sent", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 });
  }
});
