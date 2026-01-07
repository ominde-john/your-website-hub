import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not defined in environment variables");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  firstName: string;
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
    const { email, firstName }: WelcomeEmailRequest = await req.json();

    console.log(`Sending welcome email to ${email}`);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Teksoft Community <teksoft@jonzjohn.com>",
        to: [email],
        subject: "Welcome to Teksoft Community! 🎉",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 10px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1a1a2e; margin: 0; font-size: 32px;">🎉 Welcome to Teksoft Community!</h1>
              </div>
              
              <p style="color: #333; font-size: 18px; line-height: 1.6;">
                Hi ${firstName},
              </p>
              
              <p style="color: #333; font-size: 16px; line-height: 1.8;">
                We're thrilled to have you join the Teksoft Community! You're now part of an innovative network of tech enthusiasts, developers, and creators.
              </p>
              
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 10px; text-align: center; margin: 30px 0;">
                <p style="color: #ffffff; font-size: 18px; margin: 0; font-weight: 500;">
                  Your account is now active and ready to explore!
                </p>
              </div>
              
              <h2 style="color: #1a1a2e; font-size: 20px; margin-top: 30px;">What you can do now:</h2>
              
              <ul style="color: #333; font-size: 16px; line-height: 2;">
                <li>Explore our tech projects and innovations</li>
                <li>Connect with fellow community members</li>
                <li>Access exclusive resources and events</li>
                <li>Participate in discussions and workshops</li>
              </ul>
              
              <div style="text-align: center; margin: 35px 0;">
                <a href="https://teksoftllc.jonzjohn.com/dashboard" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                  Go to Dashboard
                </a>
              </div>
              
              <p style="color: #666; font-size: 14px; line-height: 1.6;">
                If you have any questions or need assistance, feel free to reach out to our support team. We're here to help!
              </p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              
              <p style="color: #999; font-size: 12px; text-align: center;">
                © 2026 Teksoft Community. All rights reserved.<br>
                Building the future of technology, together.
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

    console.log("Welcome email sent successfully");
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
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
