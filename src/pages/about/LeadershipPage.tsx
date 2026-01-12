import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { Building2, Users, Shield, Lightbulb, ArrowRight } from "lucide-react";

import JeremyBravoge from "@/assets/team/jeremy-bravoge.jpg";
import Jeremy from "@/assets/team/WhatsApp_Image_2026-01-08_at_11.37.34_PM-removebg-preview.png";
import JohnOminde from "@/assets/team/john-ominde.jpg";
import EvansChuchu from "@/assets/team/evanschuchu.jpg";
import Isaac from "@/assets/team/isaac.jpg";
import john from "@/assets/team/john-ominde-removebg-preview.png";


interface Leader {
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  linkedin?: string;
}

const LeadershipPage = () => {
  const executiveTeam: Leader[] = [
    {
      name: "Jeremy Bravoge",
      role: "Founder & CEO",
      department: "Executive",
      image: JeremyBravoge,
      bio: "Visionary leader with over 5 years of experience in technology and community building. Jeremy founded Teksoft with the mission of empowering developers across Africa.",
      linkedin: "https://www.linkedin.com/in/jeremy-bravoge",
    },
    {
      name: "John Ominde",
      role: "Chief Technology Officer",
      department: "Technology",
      image: JohnOminde,
      bio: "Full-stack Data Engineer with expertise in Python, SQL, React, Node.js, and cloud technologies. John leads all technical initiatives and platform development.",
      linkedin: "https://www.linkedin.com/in/john-ominde",
    },
    {  
      name: "Isaac Prinsze",
      role: "Community Manager",
      department: "Technology",
      image: Isaac,
      bio: "Passionate about connecting people and fostering meaningful relationships within the organisation",
      linkedin: "https://www.linkedin.com/in/isaac-prinsze",
    },
    {
      name: "Evans Richard",
      role: "Technical Lead",
      department: "Engineering",
      image: EvansChuchu,
      bio: "Expert in software architecture and mentoring. Evans oversees code quality, architectural decisions, and the technical mentorship program.",
      linkedin: "https://www.linkedin.com/in/Evans-Richard",
    },
  ];

  const boardMembers = [
    {
      name: "Dr. Patricia Kimani",
      role: "Board Chair",
      organization: "Tech Africa Foundation",
    },
    {
      name: "Michael Ochieng",
      role: "Board Member",
      organization: "Innovation Hub Kenya",
    },
    {
      name: "Grace Wanjiku",
      role: "Board Member",
      organization: "Women in Tech Africa",
    },
  ];

  const governanceHighlights = [
    {
      icon: <Building2 className="h-6 w-6 text-techblue" />,
      title: "Transparent Operations",
      description: "All major decisions are documented and shared with the community.",
    },
    {
      icon: <Users className="h-6 w-6 text-techblue" />,
      title: "Member Representation",
      description: "Community members have a voice in shaping our direction and programs.",
    },
    {
      icon: <Shield className="h-6 w-6 text-techblue" />,
      title: "Ethical Standards",
      description: "We uphold the highest ethical standards in all our operations.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-techblue" />,
      title: "Innovation Focus",
      description: "Our governance supports rapid innovation while maintaining stability.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <PageHeader
        title="Leadership & Governance"
        description="Meet the visionaries guiding Teksoft Community towards excellence"
      />

      {/* Executive Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Executive Team"
            subtitle="The leaders driving our mission forward"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {executiveTeam.map((leader, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-techgold text-sm font-medium">{leader.department}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{leader.name}</h3>
                  <p className="text-techblue font-medium text-sm mb-3">{leader.role}</p>
                  <p className="text-gray-600 text-sm">{leader.bio}</p>
                  {leader.linkedin && (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-sm font-semibold text-techblue hover:underline"
                    >
                      Connect on LinkedIn <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Advisory Board"
            subtitle="Industry experts guiding our strategic direction"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {boardMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="h-20 w-20 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-techblue text-sm font-medium">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Our Governance"
            subtitle="How we ensure transparency and accountability"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {governanceHighlights.map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="h-14 w-14 rounded-full bg-techblue/10 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="rounded-3xl overflow-hidden shadow-sm">
              <img 
                src={Jeremy}
                alt="Professional man"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-10 rounded-3xl shadow-sm border border-white/20 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-yellow-500 rounded-full mr-3"></span>
                Executive Summary
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                
              </p>
              <p className="text-gray-600 leading-relaxed">
                There is increased focus to ensure that members are reaping the maximum possible 
                value out of the Institute's activities. This then translates to increased quality 
                membership and retention levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Statement */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white/60 backdrop-blur-sm p-10 rounded-3xl shadow-sm border border-white/20 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-yellow-500 rounded-full mr-3"></span>
                Value Proposition Statement
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Tech soft is driven by the need to create and offer lifelong value to our members, who as 
                professional developers, are expected to be effective in their work, adding value to 
                those who rely on them including their clients, employers, and the public in general.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-sm">
              <img 
                src={john}
                alt="Professional man Smiling" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;
