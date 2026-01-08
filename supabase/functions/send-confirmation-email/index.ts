import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not defined in environment variables");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  firstName: string;
  code: string;
}

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
    const { email, firstName, code }: ConfirmationEmailRequest = await req.json();

    console.log(`Sending confirmation email to ${email} with code ${code}`);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Teksoft Community <teksoft@jonzjohn.com>",
        to: [email],
        subject: "Confirm Your Email - TekSoft Registration",
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
                <h1 style="color: #1e79c9; margin: 0; font-size: 28px; font-weight: 700;">Welcome to Teksoft Community!</h1>
                <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #1e79c9, #d4a853); margin: 15px auto;"></div>
              </div>
              
              <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6;">
                Hi ${firstName},
              </p>
              
              <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                Thank you for registering with Teksoft Community. To complete your registration, please use the verification code below:
              </p>
              
              <div style="background: linear-gradient(135deg, #1e79c9 0%, #0d1526 50%, #d4a853 100%); padding: 4px; border-radius: 12px; margin: 30px 0;">
                <div style="background: #0d1526; padding: 30px; border-radius: 10px; text-align: center;">
                  <span style="font-size: 42px; font-weight: bold; color: #ffffff; letter-spacing: 12px; font-family: monospace;">${code}</span>
                </div>
              </div>
              
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                This code will expire in 10 minutes. If you didn't create an account with Teksoft Community, you can safely ignore this email.
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

    console.log("Email sent successfully");
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending confirmation email:", error);
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
