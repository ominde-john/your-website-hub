import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not defined in environment variables");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailChangeRequest {
  newEmail: string;
  firstName: string;
}

const generateCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    // Get the authorization header to verify the user
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify the user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Auth error:", userError);
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { newEmail, firstName }: EmailChangeRequest = await req.json();

    console.log(`Sending email change verification to ${newEmail} for user ${user.id}`);

    // Generate a 6-digit code
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

    // Store the verification code in the database
    const { error: insertError } = await supabase
      .from("email_verification_codes")
      .insert({
        email: newEmail,
        code,
        expires_at: expiresAt,
        used: false,
      });

    if (insertError) {
      console.error("Error storing verification code:", insertError);
      throw new Error("Failed to generate verification code");
    }

    // Send the verification email
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Teksoft Community <no-reply@teksoft.co.ke>",
        to: [newEmail],
        subject: "Verify Your New Email - Teksoft Community",
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
                <h1 style="color: #1e79c9; margin: 0; font-size: 28px; font-weight: 700;">Email Change Verification</h1>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #1e79c9, #d4a853); margin: 15px auto;"></div>
              </div>
              
              <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6;">
                Hi ${firstName},
              </p>
              
              <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                You requested to change your email address to <strong style="color: #d4a853;">${newEmail}</strong>. Please use the verification code below to confirm this change:
              </p>
              
              <div style="background: linear-gradient(135deg, #1e79c9 0%, #0d1526 50%, #d4a853 100%); padding: 4px; border-radius: 12px; margin: 30px 0;">
                <div style="background: #0d1526; padding: 30px; border-radius: 10px; text-align: center;">
                  <span style="font-size: 42px; font-weight: bold; color: #ffffff; letter-spacing: 12px; font-family: monospace;">${code}</span>
                </div>
              </div>
              
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                This code will expire in 10 minutes. If you didn't request this email change, you can safely ignore this email.
              </p>
              
              <hr style="border: none; border-top: 1px solid rgba(30, 64, 175, 0.3); margin: 30px 0;">
              
              <p style="color: #64748b; font-size: 12px; text-align: center;">
                © 2026 <span style="color: #d4a853;">Teksoft Community</span>. All rights reserved.<br>
                This is an automated message, please do not reply.
              </p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    console.log("Email change verification sent successfully");
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending email change verification:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
