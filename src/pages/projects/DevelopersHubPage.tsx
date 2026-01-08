import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Code, GitBranch, MessageSquare, Rocket, Award, ArrowRight, CheckCircle2 } from "lucide-react";

const DevelopersHubPage = () => {
  const features = [
    {
      icon: <Code className="h-8 w-8 text-techgold" />,
      title: "Open Source Projects",
      description: "Contribute to real-world open source projects and build your portfolio with meaningful work that impacts the community.",
    },
    {
      icon: <Users className="h-8 w-8 text-techgold" />,
      title: "Mentorship Programs",
      description: "Connect with experienced developers who guide your learning journey and help you navigate the tech industry.",
    },
    {
      icon: <GitBranch className="h-8 w-8 text-techgold" />,
      title: "Code Reviews",
      description: "Get constructive feedback on your code from peers and mentors to improve your coding practices.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-techgold" />,
      title: "Tech Discussions",
      description: "Engage in meaningful discussions about latest technologies, best practices, and industry trends.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-techgold" />,
      title: "Hackathons",
      description: "Participate in exciting hackathons to solve real problems and showcase your innovative solutions.",
    },
    {
      icon: <Award className="h-8 w-8 text-techgold" />,
      title: "Skill Recognition",
      description: "Earn badges and certificates as you contribute and grow within the developer community.",
    },
  ];

  const highlights = [
    "Weekly coding challenges",
    "Monthly tech talks",
    "Pair programming sessions",
    "Career guidance workshops",
    "Project collaboration opportunities",
    "Industry networking events",
  ];

  return (
    <>
      <Helmet>
        <title>Developers Community Hub | Teksoft Community</title>
        <meta
          name="description"
          content="Join the Developers Community Hub at Teksoft - a collaborative space for developers to learn, build, share projects, and grow together."
        />
      </Helmet>

      {/* Hero Section */}
      <PageHeader
        title="Developers Community Hub"
        description="A collaborative space for developers to learn, build, share projects, and grow together through mentorship, open-source, and hackathons."
      />

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We <span className="text-techgold">Offer</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our hub provides everything you need to accelerate your development journey and connect with like-minded developers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-techblue hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-14 w-14 rounded-full bg-techblue/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Join the <span className="text-techgold">Hub?</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Whether you're just starting your coding journey or you're an experienced developer looking to give back, our community has something for everyone.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-techgold flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Developer collaboration"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-techblue to-techblue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Join hundreds of developers who are already part of our thriving community.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link to="/register" className="flex items-center gap-2">
              Join the Hub <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default DevelopersHubPage;
