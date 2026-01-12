import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  User,
  MessageSquare,
  Send,
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
// Web3Forms access key is public and safe to use in client-side code
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

  // Load reCAPTCHA ONLY in browser (prevents Vercel crash)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (typeof window !== "undefined" && SITE_KEY) {
      import("react-google-recaptcha")
        .then((mod) => {
          setReCAPTCHA(() => mod.default);
          setRecaptchaLoading(false);

          timeoutId = setTimeout(() => {
            const grecaptcha = (window as { grecaptcha?: unknown }).grecaptcha;
            if (!grecaptcha) {
              console.warn("reCAPTCHA failed to render");
              setRecaptchaFailed(true);
            }
          }, 5000);
        })
        .catch(() => {
          setRecaptchaLoading(false);
          setRecaptchaFailed(true);
        });
    } else {
      setRecaptchaLoading(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const canSubmit = () => {
    if (loading) return false;
    if (!form.name || !form.email || !form.message) return false;
    if (SITE_KEY && ReCAPTCHA && !recaptchaFailed && !captchaToken) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission started", { form, captchaToken, recaptchaFailed, SITE_KEY: !!SITE_KEY });

    if (SITE_KEY && ReCAPTCHA && !recaptchaFailed && !captchaToken) {
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
        subject: "New Contact Form Message from Teksoft Website",
        from_name: form.name,
        replyto: form.email,
        name: form.name,
        email: form.email,
        message: form.message,
        // Web3Forms free bot protection (honeypot) - must be empty
        botcheck: "",
      };

      // Note: Don't send g-recaptcha-response to Web3Forms on free plan
      // The reCAPTCHA widget still provides client-side protection

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Web3Forms response:", data);

      if (data.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. We'll get back to you shortly.",
        });

        setForm({ name: "", email: "", message: "" });
        setCaptchaToken(null);
      } else {
        console.error("Web3Forms error:", data);
        throw new Error(data.message || "Submission failed");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: "Failed to Send Message",
        description: error.message || "Something went wrong. Please try again or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-techgold" />,
      title: "Email Us",
      value: "contact@teksoft.co.ke",
      link: "mailto:contact@teksoft.co.ke",
    },
    {
      icon: <Phone className="h-6 w-6 text-techgold" />,
      title: "Call Us",
      value: "+254 115 000 514/+254 111 276 271",
      link: "tel:0111276271",
    },
    {
      icon: <MapPin className="h-6 w-6 text-techgold" />,
      title: "Visit Us",
      value: "Nairobi, Kenya",
      link: null,
    },
    {
      icon: <Clock className="h-6 w-6 text-techgold" />,
      title: "Working Hours",
      value: "Mon – Sat, 9am – 5pm",
      link: null,
    },
  ];
// Add this to your component (outside the return)
const [userLocation, setUserLocation] = useState<string>("");

useEffect(() => {
  // Get user's approximate location (city level)
  if (navigator.geolocation && typeof window !== 'undefined') {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.city) {
          setUserLocation(`Based in ${data.city}, ${data.country_name}`);
        }
      })
      .catch(() => {
        // Fallback to static location
        setUserLocation("Serving clients in Nairobi and worldwide");
      });
  }
}, []);

// Update the contactInfo array to include location info:
const contactInfo = [
  // ... existing items ...
  {
    icon: <MapPin className="h-6 w-6 text-techgold" />,
    title: "Visit Us",
    value: "Nairobi, Kenya",
    description: userLocation || "Serving clients in Nairobi and worldwide",
    link: null,
  },
  // ... rest of items ...
];
  return (
    <div>
      <PageHeader
        title="Contact Us"
        description="Have a question or want to collaborate? We'd love to hear from you."
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl border-0 bg-white">
              <div className="h-1.5 bg-gradient-to-r from-techgold via-techblue to-techgold rounded-t-lg" />
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll respond as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {recaptchaLoading && SITE_KEY ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="animate-spin mr-2" />
                      Loading verification...
                    </div>
                  ) : ReCAPTCHA && SITE_KEY && !recaptchaFailed ? (
                    <div className="flex justify-center">
                      <ReCAPTCHA
                        sitekey={SITE_KEY}
                        onChange={(token: string | null) =>
                          setCaptchaToken(token)
                        }
                        onErrored={() => setRecaptchaFailed(true)}
                      />
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={!canSubmit()}
                    className="w-full"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

      {/* Contact Info */}
      <div className="space-y-6">
        {contactInfo.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-5">
              <div className="flex gap-4">
                {item.icon}
                <div>
                  <h3>{item.title}</h3>
                  {item.link ? (
                    <a href={item.link}>{item.value}</a>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardContent className="p-5">
            <div className="flex gap-4 mb-4">
              <MapPin className="h-6 w-6 text-techgold" />
              <div>
                <h3 className="font-semibold">Our Location</h3>
                <p>Nairobi, Kenya</p>
              </div>
            </div>
            
            {/* Google Maps Embed */}
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63820.96345552068!2d36.74963509999999!3d-1.30320935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a6bf7445dc1%3A0x940b62a3c8efde4c!2sNairobi!5e0!3m2!1sen!2ske!4v1690289860127!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location in Nairobi"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}
