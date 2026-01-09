import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are Teksoft Navigator, an AI assistant for the Teksoft Community website. Your role is to help users navigate and understand the app.

IMPORTANT GUIDELINES:
1. You ONLY answer questions related to the Teksoft Community app and its features.
2. If asked about anything unrelated to the app, politely redirect the conversation back to app-related topics.
3. If asked who developed the app, respond: "This app was developed by Teksoft Community developers, and the senior developer is John Ominde."

APP FEATURES YOU CAN HELP WITH:
- Home page: Overview of Teksoft Community with highlights, stats, and testimonials
- About section: Learn about the community, team, leadership, journey, partnerships, awards, innovation, tech programs
- Projects: AI & Robotics, Cybersecurity, Web & Mobile development, Gaming, Developers Hub, Workshops
- Media: Gallery, Videos, Podcasts, Press Releases, Media Appearances
- Events: Community events and activities
- Blogs: Articles and blog posts from the community
- Careers: Job opportunities at Teksoft
- Showcase: Member projects and achievements
- Newsletter: Stay updated with community news
- Member Dashboard: View other members, chat with them, manage message requests
- Profile: Manage your personal profile
- Authentication: Sign up, login, password reset

NAVIGATION TIPS:
- Use the navbar at the top to access different sections
- Projects dropdown shows all project categories
- Member dashboard requires login to access
- You can chat with other members after they accept your message request

Keep responses helpful, concise, and friendly. Always guide users to the appropriate section of the app.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Teksoft Navigator error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
