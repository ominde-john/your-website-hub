import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const WEB3FORMS_KEY = "cfeb2c00-e884-4f54-8496-315cf9f85c42";

export default function ContactPage() {
  const { toast } = useToast();

  const [ReCAPTCHA, setReCAPTCHA] = useState<any>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recaptchaLoading, setRecaptchaLoading] = useState(true);
  const [recaptchaFailed, setRecaptchaFailed] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && SITE_KEY) {
      import("react-google-recaptcha")
        .then((mod) => {
          setReCAPTCHA(() => mod.default);
          setRecaptchaLoading(false);
        })
        .catch(() => {
          setRecaptchaFailed(true);
          setRecaptchaLoading(false);
        });
    } else {
      setRecaptchaLoading(false);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (SITE_KEY && !captchaToken && !recaptchaFailed) {
      toast({
        title: "Verification required",
        description: "Please confirm you are not a robot.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const payload: Record<string, string> = {
        access_key: WEB3FORMS_KEY,
        subject: "New Contact Form Message",
        name: form.name,
        email: form.email,
        message: form.message,
      };

      if (captchaToken) {
        payload["g-recaptcha-response"] = captchaToken;
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      toast({
        title: "Message Sent Successfully",
        description: "Thank you for reaching out. We'll get back to you shortly.",
      });

      setForm({ name: "", email: "", message: "" });
      setCaptchaToken(null);
    } catch (err) {
      toast({
        title: "Failed to Send Message",
        description:
          "Something went wrong. Please try again or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Contact Us"
        description="Have a question or want to collaborate? We'd love to hear from you."
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <Card className="shadow-xl border-0 bg-white max-w-xl mx-auto">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label>Your Name</Label>
                  <Input name="name" value={form.name} onChange={handleChange} />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {recaptchaLoading && SITE_KEY ? (
                  <div className="flex justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : ReCAPTCHA && SITE_KEY && !recaptchaFailed ? (
                  <ReCAPTCHA
                    sitekey={SITE_KEY}
                    onChange={(token: string | null) =>
                      setCaptchaToken(token)
                    }
                    onErrored={() => setRecaptchaFailed(true)}
                  />
                ) : null}

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
