import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const emailSchema = z.string().email("Please enter a valid email address").max(255);

interface NewsletterFormProps {
  variant?: "footer" | "page";
}

const NewsletterForm = ({ variant = "footer" }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const result = emailSchema.safeParse(email.trim());
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/subscribe-newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      toast.success("Successfully subscribed! Check your email for confirmation.");
      setEmail("");
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast.error(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-techgold"
          disabled={loading}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="p-3 rounded-lg bg-techgold text-gray-900 font-semibold hover:bg-techgold-dark transition duration-300 disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
    );
  }

  // Page variant (for Newsletter.tsx page)
  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto flex flex-col md:flex-row gap-0 rounded-md overflow-hidden shadow-lg"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your Email"
        className="flex-1 px-4 py-4 bg-white border-none focus:ring-0 text-sm outline-none"
        disabled={loading}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
};

export default NewsletterForm;
