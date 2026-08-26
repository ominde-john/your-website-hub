import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, Bug, Server, Users, ArrowRight, CheckCircle2 } from "lucide-react";

const CybersecurityPage = () => {
  const tracks = [
    {
      icon: <Shield className="h-8 w-8 text-techgold" />,
      title: "Ethical Hacking",
      description: "Learn penetration testing methodologies, vulnerability assessment, and ethical hacking techniques used by security professionals.",
    },
    {
      icon: <Lock className="h-8 w-8 text-techgold" />,
      title: "Network Security",
      description: "Master firewall configuration, intrusion detection systems, and secure network architecture design.",
    },
    {
      icon: <Eye className="h-8 w-8 text-techgold" />,
      title: "Digital Forensics",
      description: "Investigate cyber incidents, recover digital evidence, and understand forensic analysis techniques.",
    },
    {
      icon: <Bug className="h-8 w-8 text-techgold" />,
      title: "Malware Analysis",
      description: "Analyze malicious software, understand threat behaviors, and develop countermeasures.",
    },
    {
      icon: <Server className="h-8 w-8 text-techgold" />,
      title: "Cloud Security",
      description: "Secure cloud environments, implement best practices for AWS, Azure, and GCP security.",
    },
    {
      icon: <Users className="h-8 w-8 text-techgold" />,
      title: "Security Operations",
      description: "Run security operations centers (SOC), incident response, and threat intelligence.",
    },
  ];

  const certifications = [
    "CompTIA Security+",
    "Certified Ethical Hacker (CEH)",
    "CISSP Preparation",
    "OSCP Training",
    "AWS Security Specialty",
    "Azure Security Engineer",
  ];

  return (
    <>
      <Helmet>
        <title>Cybersecurity Squad | Teksoft Community</title>
        <meta
          name="description"
          content="Join the Cybersecurity Squad at Teksoft Community - learn ethical hacking, network security, digital forensics, and cyber defense."
        />
      </Helmet>

      {/* Hero Section */}
      <PageHeader
        title="Cybersecurity Squad"
        description="Learn ethical hacking, network security, digital forensics, and cyber defense through practical labs and simulations."
      />

      {/* Tracks Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Security <span className="text-techgold">Tracks</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your path in cybersecurity and develop expertise in your area of interest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-techblue hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-14 w-14 rounded-full bg-gray-900 flex items-center justify-center mb-4">
                  {track.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{track.title}</h3>
                <p className="text-gray-600">{track.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Environment Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Hands-On <span className="text-techgold">Lab Environment</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Practice in safe, isolated lab environments that simulate real-world attack and defense scenarios.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Virtual penetration testing labs",
                  "Capture The Flag (CTF) challenges",
                  "Real malware analysis sandboxes",
                  "Network simulation environments",
                  "Incident response scenarios",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-techgold flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                alt="Cybersecurity lab"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Certification <span className="text-techgold">Preparation</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We help you prepare for industry-recognized certifications that boost your career.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200 hover:border-techblue hover:shadow-md transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-gray-700 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            Join the <span className="text-techgold">Cybersecurity Squad</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Become a defender of the digital world. Start your cybersecurity journey today.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link to="/register" className="flex items-center gap-2">
              Enlist Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default CybersecurityPage;
