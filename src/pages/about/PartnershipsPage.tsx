import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Handshake, Building2, GraduationCap, Globe, ArrowRight, CheckCircle } from "lucide-react";

const PartnershipsPage = () => {
  const partnerTypes = [
    {
      icon: <Building2 className="h-8 w-8 text-techblue" />,
      title: "Corporate Partners",
      description: "Leading tech companies that provide resources, mentorship, and job opportunities for our members.",
      count: "15+",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-techgold" />,
      title: "Academic Partners",
      description: "Universities and training institutions collaborating on educational programs and research.",
      count: "8",
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "NGO Partners",
      description: "Non-profit organizations working with us on community development and social impact projects.",
      count: "10+",
    },
  ];

  const featuredPartners = [
    { name: "Google Developer Groups", type: "Technology" },
    { name: "Microsoft for Startups", type: "Technology" },
    { name: "AWS Activate", type: "Cloud Services" },
    { name: "GitHub Education", type: "Developer Tools" },
    { name: "Andela", type: "Talent Network" },
    { name: "Moringa School", type: "Education" },
  ];

  const partnershipBenefits = [
    "Access to a pool of skilled tech talent",
    "Brand visibility among tech professionals",
    "Co-hosting events and workshops",
    "Collaborative project opportunities",
    "Community engagement and CSR impact",
    "Recruitment pipeline for tech roles",
  ];

  const becomePartnerSteps = [
    {
      step: "01",
      title: "Reach Out",
      description: "Contact us to express your interest in partnering with Teksoft.",
    },
    {
      step: "02",
      title: "Explore Options",
      description: "We'll discuss partnership types that align with your goals.",
    },
    {
      step: "03",
      title: "Formalize",
      description: "Sign a partnership agreement outlining mutual benefits.",
    },
    {
      step: "04",
      title: "Collaborate",
      description: "Start working together on programs, events, and initiatives.",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Partnerships"
        description="Collaborating with organizations to create greater impact"
      />

      {/* Partner Types */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Our Partnership Ecosystem"
            subtitle="We work with diverse organizations to amplify our impact"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                <p className="text-3xl font-bold text-techblue">{type.count}</p>
                <p className="text-gray-500 text-sm">Active Partners</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Featured Partners"
            subtitle="Organizations making a difference with us"
            centered
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredPartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Handshake className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{partner.name}</h4>
                <p className="text-gray-500 text-xs">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Why Partner With Us?" />
              <p className="text-gray-600 text-lg mb-6">
                Partnering with Teksoft Community gives you access to a vibrant ecosystem 
                of tech talent, innovative projects, and community engagement opportunities.
              </p>
              <div className="space-y-3">
                {partnershipBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-techgold flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                alt="Partnership"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How to Partner */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <SectionTitle
            title="Become a Partner"
            subtitle="Simple steps to start our collaboration"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {becomePartnerSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="h-12 w-12 rounded-full bg-techgold text-gray-900 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-white/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-techgold hover:bg-techgold-dark text-gray-900">
              <Link to="/contact" className="flex items-center gap-2">
                Start a Partnership <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnershipsPage;
