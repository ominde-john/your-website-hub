import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerifyCodeRequest {
  email: string;
  code: string;
  firstName?: string;
}

const sendWelcomeEmail = async (email: string, firstName: string): Promise<void> => {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return;
  }

  console.log(`Sending welcome email to ${email}`);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Teksoft Community <onboarding@teksoft.co.ke>",
      to: [email],
      subject: "Welcome to Teksoft Community! 🎉",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #0a0f1c;">
  <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0d1526 0%, #1a2744 100%); padding: 40px; border-radius: 16px; margin-top: 20px; border: 1px solid rgba(30, 64, 175, 0.3);">
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
      <h1 style="color: #1e79c9; margin: 0; font-size: 28px; font-weight: 700;">Welcome to Teksoft Community!</h1>
      <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #1e79c9, #d4a853); margin: 15px auto;"></div>
    </div>
    
    <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6;">
      Hi ${firstName},
    </p>
    
    <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6;">
      Congratulations! Your email has been verified and your Teksoft Community account is now fully activated.
    </p>

    <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6;">
      We're thrilled to have you join our vibrant community of tech enthusiasts, innovators, and creators. Here's what you can explore:
    </p>
    
    <div style="background: rgba(30, 121, 201, 0.1); border-left: 3px solid #1e79c9; padding: 15px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
      <ul style="color: #cbd5e1; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li><strong style="color: #e2e8f0;">Connect</strong> — Network with fellow developers and tech professionals</li>
        <li><strong style="color: #e2e8f0;">Learn</strong> — Access workshops, tutorials, and resources</li>
        <li><strong style="color: #e2e8f0;">Build</strong> — Collaborate on innovative projects</li>
        <li><strong style="color: #e2e8f0;">Grow</strong> — Advance your skills and career in technology</li>
      </ul>
    </div>

    <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6;">
      Ready to dive in? Head to your dashboard to complete your profile and start exploring.
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://www.teksoft.co.ke/dashboard"
         style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #1e79c9 0%, #1565a8 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(30, 121, 201, 0.3);">
         Go to My Dashboard →
      </a>
    </div>

    <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; text-align: center;">
      Have questions? Feel free to reach out to us anytime. We're here to help you succeed!
    </p>
    
    <hr style="border: none; border-top: 1px solid rgba(30, 64, 175, 0.3); margin: 30px 0;">
    
    <p style="color: #64748b; font-size: 12px; text-align: center;">
      © 2026 <span style="color: #d4a853;">Teksoft Community</span>. All rights reserved.<br>
      Building the future of technology, together.
    </p>
  </div>
</body>
</html>
      `,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Failed to send welcome email:", error);
  } else {
    console.log("Welcome email sent successfully");
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const { email, code, firstName }: VerifyCodeRequest = await req.json();

    console.log(`Verifying code for email: ${email}`);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find the verification code
    const { data: codeRecord, error: fetchError } = await supabase
      .from("email_verification_codes")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("code", code)
      .eq("used", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !codeRecord) {
      console.log("Code not found or already used");
      return new Response(
        JSON.stringify({ success: false, message: "Invalid verification code" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if code is expired
    const expiresAt = new Date(codeRecord.expires_at);
    if (expiresAt < new Date()) {
      console.log("Code expired");
      return new Response(
        JSON.stringify({ success: false, message: "Verification code has expired" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Mark code as used
    const { error: updateError } = await supabase
      .from("email_verification_codes")
      .update({ used: true })
      .eq("id", codeRecord.id);

    if (updateError) {
      console.error("Failed to mark code as used:", updateError);
    }

    console.log("Code verified successfully");

    // Send welcome email after successful verification
    try {
      await sendWelcomeEmail(email, firstName || "there");
    } catch (welcomeError) {
      console.error("Welcome email error (non-blocking):", welcomeError);
      // Don't fail the verification if welcome email fails
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email verified successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error verifying code:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
