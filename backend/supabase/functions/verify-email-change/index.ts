import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerifyEmailChangeRequest {
  newEmail: string;
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
    // Get the authorization header to verify the user
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client with user auth
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

    const { newEmail, code }: VerifyEmailChangeRequest = await req.json();

    console.log(`Verifying email change for user ${user.id} to ${newEmail}`);

    // Use service role key for admin operations
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Check the verification code
    const { data: codeData, error: codeError } = await supabaseAdmin
      .from("email_verification_codes")
      .select("*")
      .eq("email", newEmail)
      .eq("code", code)
      .eq("used", false)
      .gte("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (codeError || !codeData) {
      console.error("Code verification error:", codeError);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid or expired verification code" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Mark the code as used
    await supabaseAdmin
      .from("email_verification_codes")
      .update({ used: true })
      .eq("id", codeData.id);

    // Update the user's email using admin client
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { email: newEmail, email_confirm: true }
    );

    if (updateError) {
      console.error("Error updating user email:", updateError);
      throw new Error(updateError.message);
    }

    // Update the profiles table
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({ email: newEmail })
      .eq("user_id", user.id);

    if (profileError) {
      console.error("Error updating profile email:", profileError);
      // Don't throw, as the auth email was already updated
    }

    console.log("Email changed successfully for user:", user.id);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error verifying email change:", error);
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
