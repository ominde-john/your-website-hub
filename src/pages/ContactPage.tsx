import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Clock, User, MessageSquare, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

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
    if (typeof window !== "undefined" && SITE_KEY) {
      import("react-google-recaptcha")
        .then((mod) => {
          setReCAPTCHA(() => mod.default);
          setRecaptchaLoading(false);
          
          // Set a timeout to detect if reCAPTCHA fails to render
          // (e.g., blocked by ad blocker or network issues)
          const timeout = setTimeout(() => {
            // Check if Google's reCAPTCHA API loaded successfully
            // window.grecaptcha is the official reCAPTCHA API indicator
            const grecaptcha = (window as { grecaptcha?: unknown }).grecaptcha;
            if (!grecaptcha) {
              console.warn("reCAPTCHA failed to render - possibly blocked");
              setRecaptchaFailed(true);
            }
          }, 5000);
          
          return () => clearTimeout(timeout);
        })
        .catch((err) => {
          console.error("Failed to load reCAPTCHA:", err);
          setRecaptchaLoading(false);
          setRecaptchaFailed(true);
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

  // Check if form can be submitted (allow submission if reCAPTCHA failed to load)
  const canSubmit = () => {
    if (loading) return false;
    if (!form.name || !form.email || !form.message) return false;
    // If reCAPTCHA is configured and loaded successfully, require token
    // If reCAPTCHA failed to load, allow submission without token
    if (SITE_KEY && ReCAPTCHA && !recaptchaFailed && !captchaToken) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only require captcha if reCAPTCHA loaded successfully
    if (SITE_KEY && ReCAPTCHA && !recaptchaFailed && !captchaToken) {
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
        description: "Contact form is not configured. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const payload: Record<string, string> = {
        access_key: WEB3FORMS_KEY,
        name: form.name,
        email: form.email,
        message: form.message,
      };

      // Only include captcha token if available
      if (captchaToken) {
        payload["g-recaptcha-response"] = captchaToken;
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. We'll get back to you shortly.",
        });

        setForm({ name: "", email: "", message: "" });
        setCaptchaToken(null);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Failed to Send Message",
        description: "Something went wrong. Please try again or contact us directly via email.",
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
      value: "info@teksoft.org",
      link: "mailto:info@teksoft.org",
    },
    {
      icon: <Phone className="h-6 w-6 text-techgold" />,
      title: "Call Us",
      value: "0115 000 514",
      link: "tel:0115000514",
    },
    {
      icon: <MapPin className="h-6 w-6 text-techgold" />,
      title: "Visit Us",
      value: "Nairobi CBD, Kenya",
      link: null,
    },
    {
      icon: <Clock className="h-6 w-6 text-techgold" />,
      title: "Working Hours",
      value: "Mon – Fri, 9am – 5pm",
      link: null,
    },
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-600 mb-6">Fill out the form below and we'll respond as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">Your Name</Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-techblue transition-colors" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        className="pl-12 h-12 border-gray-200 focus:border-techblue focus:ring-techblue/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-techblue transition-colors" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="yourname@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="pl-12 h-12 border-gray-200 focus:border-techblue focus:ring-techblue/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 font-medium">Your Message</Label>
                    <div className="relative group">
                      <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-techblue transition-colors" />
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us how we can help you..."
                        value={form.message}
                        onChange={handleChange}
                        className="pl-12 min-h-[140px] border-gray-200 focus:border-techblue focus:ring-techblue/20 transition-all resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* reCAPTCHA section */}
                  {recaptchaLoading && SITE_KEY ? (
                    <div className="flex items-center justify-center p-4 border rounded-lg bg-gray-50">
                      <Loader2 className="h-5 w-5 animate-spin text-techblue mr-2" />
                      <p className="text-sm text-gray-500">Loading verification...</p>
                    </div>
                  ) : ReCAPTCHA && SITE_KEY && !recaptchaFailed ? (
                    <div className="flex justify-center">
                      <ReCAPTCHA
                        sitekey={SITE_KEY}
                        onChange={(token: string | null) => setCaptchaToken(token)}
                        onErrored={() => setRecaptchaFailed(true)}
                      />
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={!canSubmit()}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-techblue to-techblue-dark hover:from-techblue-dark hover:to-techblue text-white shadow-lg shadow-techblue/25 transition-all duration-300 hover:shadow-xl hover:shadow-techblue/30 hover:scale-[1.02]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
                <p className="text-gray-600">
                  Whether you have a question about our programs, partnerships, or anything else, our team is ready to answer all your questions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <Card
                    key={index}
                    className="bg-white border border-gray-100 hover:shadow-lg hover:shadow-techblue/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-techblue/10">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          {item.link ? (
                            <a
                              href={item.link}
                              className="text-techblue hover:text-techblue-dark transition-colors font-medium"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-gray-600">{item.value}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional CTA Section */}
              <Card className="bg-gradient-to-br from-techblue to-techblue-dark text-white border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
                  <p className="text-white/90 mb-4">
                    Be part of a growing network of tech enthusiasts, developers, and innovators.
                  </p>
                  <Button
                    asChild
                    className="bg-techgold hover:bg-techgold-dark text-gray-900 font-semibold"
                  >
                    <a href="/register">Join Teksoft Today</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
