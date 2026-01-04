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
  </div>
);

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
      portfolio: "https://www.jonzjohn.com",
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

  return (
    <div>
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
    </div>
  );
};

export default AboutPage;
