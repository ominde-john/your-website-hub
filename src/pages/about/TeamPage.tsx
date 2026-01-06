import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Twitter, Globe } from "lucide-react";

import JeremyBravoge from "@/assets/team/jeremy-bravoge.jpg";
import JohnOminde from "@/assets/team/john-ominde.jpg";
import EvansChuchu from "@/assets/team/evanschuchu.jpg";

interface TeamMember {
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

const TeamPage = () => {
  const leadershipTeam: TeamMember[] = [
    {
      name: "Jeremy Bravoge",
      role: "Founder & CEO",
      department: "Leadership",
      image: JeremyBravoge,
      bio: "Visionary leader passionate about technology and community building. Leading Teksoft to empower developers across Africa.",
      socials: { linkedin: "#" },
    },
    {
      name: "John Ominde",
      role: "Chief Technology Officer",
      department: "Technology",
      image: JohnOminde,
      bio: "Full-stack Data Engineer with expertise in Python, SQL, React, Node.js, and cloud technologies.",
      socials: { linkedin: "https://www.linkedin.com/in/johnominde", website: "https://www.jonzjohn.com" },
    },
    {
      name: "Evans Richard",
      role: "Technical Lead",
      department: "Engineering",
      image: EvansChuchu,
      bio: "Expert in software architecture and mentoring junior developers. Committed to technical excellence.",
    },
  ];

  const coreTeam: TeamMember[] = [
    {
      name: "Sarah Mwangi",
      role: "Community Manager",
      department: "Community",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      bio: "Passionate about connecting people and fostering meaningful relationships within the tech community.",
    },
    {
      name: "David Okonkwo",
      role: "Program Coordinator",
      department: "Programs",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Organizes and manages all training programs and ensures smooth delivery of educational content.",
    },
    {
      name: "Grace Achieng",
      role: "Marketing Lead",
      department: "Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
      bio: "Creative marketer focused on spreading the word about Teksoft and attracting new members.",
    },
    {
      name: "Michael Kamau",
      role: "Backend Developer",
      department: "Engineering",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      bio: "Skilled backend developer working on building robust and scalable systems for the community.",
    },
    {
      name: "Fatima Hassan",
      role: "UI/UX Designer",
      department: "Design",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
      bio: "Creates beautiful and intuitive designs that make our platforms a joy to use.",
    },
    {
      name: "James Otieno",
      role: "DevOps Engineer",
      department: "Engineering",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "Ensures our infrastructure runs smoothly and our deployments are seamless.",
    },
  ];

  const TeamCard = ({ member }: { member: TeamMember }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {member.socials?.linkedin && (
              <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
                <Linkedin className="h-4 w-4 text-white" />
              </a>
            )}
            {member.socials?.twitter && (
              <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
                <Twitter className="h-4 w-4 text-white" />
              </a>
            )}
            {member.socials?.website && (
              <a href={member.socials.website} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
                <Globe className="h-4 w-4 text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-5">
        <span className="text-techgold text-xs font-semibold uppercase tracking-wider">{member.department}</span>
        <h3 className="text-lg font-bold text-gray-900 mt-1">{member.name}</h3>
        <p className="text-techblue text-sm font-medium">{member.role}</p>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{member.bio}</p>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Meet the Team"
        description="The passionate people behind Teksoft Community"
      />

      {/* Leadership Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Leadership Team"
            subtitle="Visionaries guiding our mission"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadershipTeam.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Core Team"
            subtitle="The talented individuals making it all happen"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreTeam.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="section-padding bg-techblue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to help us grow our community.
          </p>
          <Button asChild size="lg" className="bg-techgold hover:bg-techgold-dark text-gray-900">
            <Link to="/careers" className="flex items-center gap-2">
              View Open Positions <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
