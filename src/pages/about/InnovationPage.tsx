import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb, Rocket, Code, Users, Award, TrendingUp, ArrowRight } from "lucide-react";

const InnovationPage = () => {
  const innovations = [
    {
      icon: <Code className="h-8 w-8 text-techblue" />,
      title: "Open Source Projects",
      description: "We've contributed to and launched multiple open-source projects used by developers worldwide.",
      stat: "15+",
      statLabel: "Projects Launched",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-techgold" />,
      title: "Hackathons",
      description: "Regular hackathons that bring together creative minds to solve real-world problems.",
      stat: "20+",
      statLabel: "Hackathons Hosted",
    },
    {
      icon: <Rocket className="h-8 w-8 text-green-500" />,
      title: "Startup Incubation",
      description: "Supporting member startups from idea to launch with mentorship and resources.",
      stat: "8",
      statLabel: "Startups Launched",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Industry Partnerships",
      description: "Collaborating with leading tech companies to bring opportunities to our community.",
      stat: "25+",
      statLabel: "Partners",
    },
  ];

  const impactAreas = [
    {
      title: "Skills Development",
      description: "Over 1,000 members have gained new technical skills through our programs.",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: "Job Placements",
      description: "200+ members have secured tech jobs through our career support programs.",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "Community Projects",
      description: "50+ community projects addressing local challenges using technology.",
      icon: <Lightbulb className="h-6 w-6" />,
    },
  ];

  const successStories = [
    {
      name: "Tech Skills Bootcamp",
      description: "A 12-week intensive program that transformed 50 beginners into job-ready developers.",
      outcome: "85% employment rate within 3 months of completion.",
    },
    {
      name: "AgriTech Hackathon",
      description: "A weekend hackathon focused on solving agricultural challenges with technology.",
      outcome: "Winning solution now used by 100+ farmers in rural Kenya.",
    },
    {
      name: "Women in Tech Initiative",
      description: "A dedicated program to increase female participation in technology.",
      outcome: "40% increase in female membership over 12 months.",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Innovation & Impact"
        description="Driving positive change through technology and collaboration"
      />

      {/* Innovation Areas */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Our Innovation Pillars"
            subtitle="Key areas where we're making a difference"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {innovations.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-3xl font-bold text-techblue">{item.stat}</p>
                  <p className="text-gray-500 text-sm">{item.statLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section-padding bg-techblue text-white">
        <div className="container-custom">
          <SectionTitle
            title="Our Impact"
            subtitle="Measurable outcomes that matter"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {impactAreas.map((area, index) => (
              <div key={index} className="text-center">
                <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 text-techgold">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                <p className="text-white/80">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Success Stories"
            subtitle="Real examples of innovation in action"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-techblue transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{story.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{story.description}</p>
                <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg">
                  <strong>Outcome:</strong> {story.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Be Part of the Innovation</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join us in building solutions that make a real difference in people's lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-techgold hover:bg-techgold-dark text-gray-900">
              <Link to="/projects" className="flex items-center gap-2">
                View Our Projects <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/register">Join the Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InnovationPage;
