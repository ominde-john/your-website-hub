import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const WEB3FORMS_KEY = "cfeb2c00-e884-4f54-8496-315cf9f85c42";

const ContactPage = () => {
  const { toast } = useToast();
  const [Recaptcha, setRecaptcha] = useState<any>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    import("react-google-recaptcha").then((mod) => {
      setRecaptcha(() => mod.default);
    });
  }, []);

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

    setLoading(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Contact: ${formData.subject}`,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
          "g-recaptcha-response": captchaToken,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you soon.",
        });

        setFormData({ name: "", email: "", subject: "", message: "" });
        setCaptchaToken(null);
      } else {
        throw new Error(data.message);
      }
    } catch {
      toast({
        title: "Failed to send",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Contact Us" description="Get in touch with the Teksoft community" />
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <Input
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />

                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />

                {Recaptcha && (
                  <Recaptcha
                    sitekey={SITE_KEY}
                    onChange={(token: string | null) => setCaptchaToken(token)}
                  />
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-techblue hover:bg-techblue-dark text-white w-full"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-techblue" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">Nairobi CBD, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-techblue" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">0115 000 514</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-techblue" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">info@teksoft.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-techblue" />
                  <div>
                    <h3 className="font-semibold">Hours</h3>
                    <p className="text-gray-600">Mon - Fri: 9AM - 6PM</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
