import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Globe, MessageSquare, Calendar, ArrowRight, MapPin } from "lucide-react";

const CommunityPage = () => {
  const stats = [
    { value: "50+", label: "Active Members", icon: <Users className="h-6 w-6" /> },
    { value: "3+", label: "Countries", icon: <Globe className="h-6 w-6" /> },
    { value: "50+", label: "Events Hosted", icon: <Calendar className="h-6 w-6" /> },
    { value: "100+", label: "Discussions", icon: <MessageSquare className="h-6 w-6" /> },
  ];

  const chapters = [
    { city: "Nairobi", country: "Kenya", members: 200 },
    { city: "Kampala", country: "Uganda", members: 80 },
    { city: "Dar es Salaam", country: "Tanzania", members: 60 },
    { city: "New Delhi", country: "India", members: 40 },
  ];

  const communityGroups = [
    {
      name: "Web Developers",
      description: "Frontend, backend, and full-stack developers sharing knowledge and building projects together.",
      members: 15,
    },
    {
      name: "Data Science & AI",
      description: "Data scientists, ML engineers, and AI enthusiasts exploring the world of data.",
      members: 10,
    },
    {
      name: "Mobile Developers",
      description: "iOS, Android, and cross-platform developers creating amazing mobile experiences.",
      members: 5,
    },
    {
      name: "Cybersecurity",
      description: "Security professionals and enthusiasts keeping our digital world safe.",
      members: 12,
    },
    {
      name: "DevOps & Cloud",
      description: "Infrastructure engineers and cloud architects building scalable systems.",
      members: 16,
    },
    {
      name: "UI/UX Design",
      description: "Designers creating beautiful and intuitive user experiences.",
      members: 5,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Our Community"
        description="A diverse network of tech enthusiasts united by passion and purpose"
      />

      {/* Stats */}
      <section className="py-12 bg-techblue text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2 text-techgold">{stat.icon}</div>
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Community */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="A Global Network of Innovators" />
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The Teksoft Community is more than just a group of developers—it's a family 
                of like-minded individuals who believe in the power of technology to change lives.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our members come from diverse backgrounds: students just starting their tech 
                journey, professionals looking to upskill, entrepreneurs building startups, 
                and seasoned experts willing to mentor the next generation.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you're in Nairobi, Lagos, or anywhere in the world, you'll find a 
                welcoming community ready to support your growth and celebrate your achievements.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
                alt="Community gathering"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Groups */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Special Interest Groups"
            subtitle="Find your tribe within our community"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityGroups.map((group, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{group.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{group.description}</p>
                <div className="flex items-center gap-2 text-techblue text-sm font-medium">
                  <Users className="h-4 w-4" />
                  <span>{group.members} members</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Chapters */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Regional Chapters"
            subtitle="Our presence across Africa and beyond"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {chapters.map((chapter, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                <MapPin className="h-5 w-5 text-techgold mx-auto mb-2" />
                <h4 className="font-bold text-gray-900">{chapter.city}</h4>
                <p className="text-gray-500 text-sm">{chapter.country}</p>
                <p className="text-techblue text-sm font-medium mt-2">{chapter.members} members</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-techblue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Connect with hundreds of tech enthusiasts, learn new skills, and grow your career.
          </p>
          <Button asChild size="lg" className="bg-techgold hover:bg-techgold-dark text-gray-900">
            <Link to="/register" className="flex items-center gap-2">
              Become a Member <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
