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
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #0a0f1c;">
  <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0d1526 0%, #1a2744 100%); padding: 40px; border-radius: 16px; border: 1px solid rgba(30, 64, 175, 0.3);">
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
      <h1 style="color: #1e79c9; margin: 0; font-size: 28px; font-weight: 700;">Welcome to Teksoft Community!</h1>
      <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #1e79c9, #d4a853); margin: 15px auto;"></div>
    </div>
    
    <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6;">
      Hi ${firstName},
    </p>
    
    <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6;">
      Your account is now active! We're thrilled to have you as part of our growing tech community. Connect with developers, explore resources, and start your journey with us.
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://teksoftllc.jonzjohn.com/dashboard"
         style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #1e79c9 0%, #1565a8 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(30, 121, 201, 0.3);">
         Go to Dashboard →
      </a>
    </div>
    
    <hr style="border: none; border-top: 1px solid rgba(30, 64, 175, 0.3); margin: 30px 0;">
    
    <p style="color: #64748b; font-size: 12px; text-align: center;">
      © 2026 <span style="color: #d4a853;">Teksoft Community</span>. All rights reserved.
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
