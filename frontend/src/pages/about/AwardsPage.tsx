import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, Award, Star, Medal, ArrowRight, Calendar } from "lucide-react";

const AwardsPage = () => {
  const awards = [
    {
      year: "2024",
      title: "Top Tech Community in East Africa",
      organization: "African Tech Awards",
      description: "Recognized for our outstanding contribution to building tech talent across the region.",
      icon: <Trophy className="h-8 w-8" />,
      color: "bg-yellow-500",
    },
    {
      year: "2024",
      title: "Community Impact Award",
      organization: "Kenya Tech Week",
      description: "Awarded for our social impact initiatives and community development programs.",
      icon: <Award className="h-8 w-8" />,
      color: "bg-blue-500",
    },
    {
      year: "2023",
      title: "Best Bootcamp Program",
      organization: "EdTech Africa",
      description: "Our web development bootcamp was recognized as the best in the region.",
      icon: <Star className="h-8 w-8" />,
      color: "bg-purple-500",
    },
    {
      year: "2023",
      title: "Innovation Excellence Award",
      organization: "Nairobi Innovation Week",
      description: "Recognized for fostering innovation and supporting tech startups.",
      icon: <Medal className="h-8 w-8" />,
      color: "bg-green-500",
    },
    {
      year: "2022",
      title: "Rising Tech Community",
      organization: "Tech Communities Africa",
      description: "Awarded as the fastest-growing tech community in Kenya.",
      icon: <Trophy className="h-8 w-8" />,
      color: "bg-orange-500",
    },
    {
      year: "2022",
      title: "Youth Empowerment Award",
      organization: "Youth in Tech Foundation",
      description: "Recognized for our efforts in empowering young people with tech skills.",
      icon: <Award className="h-8 w-8" />,
      color: "bg-red-500",
    },
  ];

  const memberAchievements = [
    {
      name: "John Ominde",
      achievement: "Open Source Contributor of the Year 2024",
      project: "Community Platform Development",
    },
    {
      name: "Evans Richard",
      achievement: "Best Technical Mentor 2023",
      project: "Web Development Bootcamp",
    },
    {
      name: "Sarah Mwangi",
      achievement: "Community Builder Award 2023",
      project: "Member Engagement Initiatives",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Awards & Recognition"
        description="Celebrating our achievements and the impact we've made"
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              title="Recognized for Excellence"
              centered
            />
            <p className="text-gray-600 text-lg">
              Over the years, Teksoft Community has been honored with various awards and 
              recognitions from industry bodies, reflecting our commitment to excellence 
              and impact in the tech ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Our Awards"
            subtitle="Recognition from industry leaders"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`${award.color} text-white p-6`}>
                  <div className="flex items-center justify-between">
                    {award.icon}
                    <span className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                      <Calendar className="h-4 w-4" />
                      {award.year}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{award.title}</h3>
                  <p className="text-techblue text-sm font-medium mb-3">{award.organization}</p>
                  <p className="text-gray-600 text-sm">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Achievements */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Member Achievements"
            subtitle="Celebrating individual excellence within our community"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {memberAchievements.map((member, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 text-center hover:border-techgold transition-colors">
                <div className="h-12 w-12 bg-techgold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-techgold" />
                </div>
                <h4 className="font-bold text-gray-900">{member.name}</h4>
                <p className="text-techblue text-sm font-medium mt-1">{member.achievement}</p>
                <p className="text-gray-500 text-xs mt-2">{member.project}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-techblue text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10+", label: "Industry Awards" },
              { number: "25+", label: "Member Recognitions" },
              { number: "5", label: "International Features" },
              { number: "3", label: "Years of Excellence" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-techgold">{stat.number}</p>
                <p className="text-white/80 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Be Part of Our Winning Team</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join a community that's recognized for excellence and making a real impact.
          </p>
          <Button asChild size="lg" className="bg-techblue hover:bg-techblue-dark text-white">
            <Link to="/register" className="flex items-center gap-2">
              Join Teksoft Community <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AwardsPage;
