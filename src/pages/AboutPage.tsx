import PageHeader from "../components/PageHeader";
import SectionTitle from "../components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb, GraduationCap, Network, History, ArrowRight } from "lucide-react";

// ✅ Local team images
import EvansChuchu from "../assets/team/evanschuchu.jpg";
import JohnOminde from "../assets/team/john-ominde.jpg";
import JeremyBravoge from "../assets/team/jeremy-bravoge.jpg";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  portfolio?: string;
}

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-techblue/20 group">
    <div className="w-full aspect-square relative overflow-hidden">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 bg-black/50 text-white px-4 py-2 text-sm font-semibold w-full backdrop-blur-sm">
        {member.role}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-extrabold mb-1 text-gray-900">
        {member.name}
      </h3>
      <p className="text-sm font-medium mb-3 text-techgold uppercase tracking-wider">
        {member.role}
      </p>
      <p className="text-gray-600 text-sm line-clamp-3">
        {member.bio}
      </p>

      {member.portfolio && (
        <a
          href={member.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 text-sm font-semibold text-techblue hover:underline"
        >
          Read more <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      )}
    </div>


const AboutPage = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Jeremy Bravoge",
      role: "Founder & CEO",
      image: JeremyBravoge,
      bio: "Visionary leader with a passion for technology and community building. Leading Tech Team to empower developers across Africa.",
    },
    {
      name: "John Ominde",
      role: "Lead Developer",
      image: JohnOminde,
      link: "https://www.jonzjohn.com",
      bio: "Full-stack Data Engineer with expertise in Python, SQL, React, Node.js, and cloud technologies. Building the future of tech education.",
    },
    {
      name: "Sarah Mwangi",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      bio: "Passionate about connecting people and fostering meaningful relationships within the tech community.",
    },
    {
      name: "Evans Richard",
      role: "Technical Lead",
      image: EvansChuchu,
      bio: "Expert in software architecture and mentoring junior developers. Committed to technical excellence.",
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-techgold" />,
      title: "Innovation",
      description: "We embrace new ideas and technologies to drive progress in our community.",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-techgold" />,
      title: "Education",
      description: "We believe in continuous learning and sharing knowledge with others.",
    },
    {
      icon: <Network className="h-8 w-8 text-techgold" />,
      title: "Collaboration",
      description: "We work together to achieve greater outcomes than we could alone.",
    },
    {
      icon: <History className="h-8 w-8 text-techgold" />,
      title: "Legacy",
      description: "We're building lasting impact for future generations of tech enthusiasts.",
    },
  ];

  return (
    <div>
      <PageHeader
        title="About Us"
        description="Learn about our mission, vision, and the amazing team behind Tech Team"
      />

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Our Mission" />
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Tech Team is dedicated to empowering technology professionals and enthusiasts across
                Africa. We provide a platform for learning, collaboration, and growth in the
                ever-evolving tech landscape.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our community brings together developers, designers, data scientists, and tech
                enthusiasts from all backgrounds to share knowledge, build projects, and create
                meaningful connections.
              </p>
              <Button asChild className="bg-techblue hover:bg-techblue-dark text-white">
                <Link to="/contact" className="flex items-center gap-2">
                  Get In Touch <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-100">
        <div className="container-custom">
          <SectionTitle
            title="Our Values"
            subtitle="The principles that guide everything we do"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Meet Our Team"
            subtitle="The passionate people behind Tech Team"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-techblue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to be part of our journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our growing community of tech enthusiasts and help us shape the future of technology in Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-techgold hover:bg-techgold-dark text-gray-900">
              <Link to="/contact">Join Our Community</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/careers">View Open Positions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
