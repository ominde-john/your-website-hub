import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function ContactPage() {
  const { toast } = useToast();

  const [ReCAPTCHA, setReCAPTCHA] = useState<any>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Load reCAPTCHA ONLY in browser (prevents Vercel crash)
  useEffect(() => {
    if (typeof window !== "undefined" && SITE_KEY) {
      import("react-google-recaptcha")
        .then((mod) => setReCAPTCHA(() => mod.default))
        .catch(() => console.error("Failed to load reCAPTCHA"));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast({
        title: "Verification required",
        description: "Please confirm you are not a robot.",
        variant: "destructive",
      });
      return;
    }

    if (!WEB3FORMS_KEY) {
      toast({
        title: "Configuration error",
        description: "Web3Forms key is missing.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          "g-recaptcha-response": captchaToken,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Message sent",
          description: "We’ll get back to you shortly.",
        });

        setForm({ name: "", email: "", message: "" });
        setCaptchaToken(null);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <Textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        {/* ✅ reCAPTCHA renders ONLY if safe */}
        {ReCAPTCHA && SITE_KEY && (
          <ReCAPTCHA
            sitekey={SITE_KEY}
            onChange={(token: string | null) => setCaptchaToken(token)}
          />
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>

      {/* Optional Contact Info */}
      <div className="mt-10 space-y-2 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <Mail size={16} /> support@yourdomain.com
        </p>
        <p className="flex items-center gap-2">
          <Phone size={16} /> +254 XXX XXX XXX
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={16} /> Nairobi, Kenya
        </p>
        <p className="flex items-center gap-2">
          <Clock size={16} /> Mon – Fri, 9am – 5pm
        </p>
      </div>
    </section>
  );
}
