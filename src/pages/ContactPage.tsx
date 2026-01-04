import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you soon." });
    setFormData({ name: "", email: "", subject: "", message: "" });
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
                <Input placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                <Input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <Input placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
                <Textarea placeholder="Your Message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                <Button type="submit" className="bg-techblue hover:bg-techblue-dark text-white w-full">Send Message</Button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4"><MapPin className="h-6 w-6 text-techblue" /><div><h3 className="font-semibold">Address</h3><p className="text-gray-600">Nairobi CBD, Kenya</p></div></div>
                <div className="flex items-start gap-4"><Phone className="h-6 w-6 text-techblue" /><div><h3 className="font-semibold">Phone</h3><p className="text-gray-600">0115 000 514</p></div></div>
                <div className="flex items-start gap-4"><Mail className="h-6 w-6 text-techblue" /><div><h3 className="font-semibold">Email</h3><p className="text-gray-600">info@teksoft.org</p></div></div>
                <div className="flex items-start gap-4"><Clock className="h-6 w-6 text-techblue" /><div><h3 className="font-semibold">Hours</h3><p className="text-gray-600">Mon - Fri: 9AM - 6PM</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
