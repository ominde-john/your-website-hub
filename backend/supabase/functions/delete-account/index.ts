import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with user's token to get their info
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Client with user's token to verify identity
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create admin client for deletion operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Delete user's avatar files from storage
    try {
      const { data: avatarFiles } = await supabaseAdmin.storage
        .from("avatars")
        .list(user.id);

      if (avatarFiles && avatarFiles.length > 0) {
        const filePaths = avatarFiles.map((file) => `${user.id}/${file.name}`);
        await supabaseAdmin.storage.from("avatars").remove(filePaths);
      }
    } catch (storageError) {
      console.error("Error deleting avatar files:", storageError);
      // Continue with account deletion even if storage cleanup fails
    }

    // Delete user's messages
    await supabaseAdmin
      .from("messages")
      .delete()
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

    // Delete user's message requests
    await supabaseAdmin
      .from("message_requests")
      .delete()
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

    // Delete user's topic messages
    await supabaseAdmin
      .from("topic_messages")
      .delete()
      .eq("sender_id", user.id);

    // Delete user's discussion topics
    await supabaseAdmin
      .from("discussion_topics")
      .delete()
      .eq("created_by", user.id);

    // Delete user's video call signals
    await supabaseAdmin
      .from("video_call_signals")
      .delete()
      .or(`caller_id.eq.${user.id},receiver_id.eq.${user.id}`);

    // Delete user's roles
    await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", user.id);

    // Delete user's profile
    await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("user_id", user.id);

    // Finally, delete the user from auth
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error("Error deleting user from auth:", deleteError);
      return new Response(
        JSON.stringify({ error: "Failed to delete user account" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Account deleted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in delete-account function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
