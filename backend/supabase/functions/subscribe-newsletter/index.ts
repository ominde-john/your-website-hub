import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubscribeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: SubscribeRequest = await req.json();

    // Validate email
    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Check if already subscribed
    const { data: existingSubscriber } = await supabaseAdmin
      .from("subscribers")
      .select("id, is_active")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return new Response(
          JSON.stringify({ error: "This email is already subscribed to our newsletter" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } else {
        // Reactivate subscription
        await supabaseAdmin
          .from("subscribers")
          .update({ is_active: true, unsubscribed_at: null })
          .eq("id", existingSubscriber.id);
      }
    } else {
      // Add new subscriber
      const { error: insertError } = await supabaseAdmin
        .from("subscribers")
        .insert({ email: email.toLowerCase().trim() });

      if (insertError) {
        console.error("Error inserting subscriber:", insertError);
        throw new Error("Failed to subscribe");
      }
    }

    // Send welcome email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Teksoft Community <subscription@teksoft.co.ke>",
            to: [email],
            subject: "Welcome to Teksoft Community Newsletter! 🎉",
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                  <!-- Header -->
                  <div style="background-color: #1a1a2e; padding: 30px; text-align: center;">
                    <h1 style="color: #d4af37; margin: 0; font-size: 28px;">Teksoft Community</h1>
                    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">Empowering Technology Everywhere</p>
                  </div>
                  
                  <!-- Content -->
                  <div style="padding: 40px 30px;">
                    <h2 style="color: #1a1a2e; margin: 0 0 20px 0;">Welcome to Our Newsletter! 🎉</h2>
                    
                    <p style="color: #555555; line-height: 1.6; margin: 0 0 20px 0;">
                      Thank you for subscribing to the Teksoft Community newsletter! You're now part of a growing community of tech enthusiasts, developers, and innovators.
                    </p>
                    
                    <p style="color: #555555; line-height: 1.6; margin: 0 0 20px 0;">
                      Here's what you can expect from us:
                    </p>
                    
                    <ul style="color: #555555; line-height: 1.8; margin: 0 0 20px 0; padding-left: 20px;">
                      <li>Latest tech news and industry updates</li>
                      <li>Upcoming events and workshops</li>
                      <li>Project showcases and tutorials</li>
                      <li>Exclusive community announcements</li>
                      <li>Career opportunities and resources</li>
                    </ul>
                    
                    <p style="color: #555555; line-height: 1.6; margin: 0 0 30px 0;">
                      Stay connected and never miss an update from our community!
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="https://teksoft.co.ke" style="display: inline-block; background-color: #d4af37; color: #1a1a2e; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Website</a>
                    </div>
                  </div>
                  
                  <!-- Footer -->
                  <div style="background-color: #1a1a2e; padding: 20px 30px; text-align: center;">
                    <p style="color: #888888; font-size: 12px; margin: 0;">
                      © ${new Date().getFullYear()} Teksoft Community. All rights reserved.
                    </p>
                    <p style="color: #888888; font-size: 12px; margin: 10px 0 0 0;">
                      Nairobi CBD, Kenya | contact@teksoft.co.ke
                    </p>
                  </div>
                </div>
              </body>
              </html>
            `,
          }),
        });

        if (!res.ok) {
          const errorData = await res.text();
          console.error("Resend API error:", errorData);
        } else {
          console.log("Welcome email sent successfully to:", email);
        }
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
        // Don't fail the subscription if email fails
      }
    } else {
      console.warn("RESEND_API_KEY not configured, skipping welcome email");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Successfully subscribed to the newsletter!" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in subscribe-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
