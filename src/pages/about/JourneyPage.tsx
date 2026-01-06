import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket, Users, Award, Globe, Calendar, ArrowRight } from "lucide-react";

const JourneyPage = () => {
  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Teksoft Community was founded by Jeremy Bravoge with a vision to create a supportive tech community in Kenya.",
      icon: <Rocket className="h-5 w-5" />,
    },
    {
      year: "2021",
      title: "First 100 Members",
      description: "We reached our first 100 members and hosted our inaugural tech meetup in Nairobi.",
      icon: <Users className="h-5 w-5" />,
    },
    {
      year: "2022",
      title: "Programs Launch",
      description: "Launched our flagship bootcamp programs, training over 50 developers in web and mobile development.",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      year: "2023",
      title: "Regional Expansion",
      description: "Expanded to 5 African countries with local chapters and partnerships with international organizations.",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      year: "2024",
      title: "Recognition",
      description: "Received recognition as one of the top tech communities in East Africa. Crossed 500 active members.",
      icon: <Award className="h-5 w-5" />,
    },
    {
      year: "2025",
      title: "Platform Launch",
      description: "Launched our new digital platform to better serve our growing community with resources and opportunities.",
      icon: <Rocket className="h-5 w-5" />,
    },
  ];

  const achievements = [
    { number: "500+", label: "Members Trained" },
    { number: "50+", label: "Events Hosted" },
    { number: "200+", label: "Jobs Secured" },
    { number: "10+", label: "Countries Reached" },
  ];

  return (
    <div>
      <PageHeader
        title="Our Journey"
        description="From a small idea to a thriving community—this is our story"
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              title="A Story of Growth and Impact"
              centered
            />
            <p className="text-gray-600 text-lg leading-relaxed">
              What started as a small group of passionate developers has grown into one of 
              Africa's most vibrant tech communities. Our journey is marked by countless 
              moments of learning, collaboration, and celebration. Here's how we got here.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Milestones"
            subtitle="Key moments in our history"
            centered
          />
          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-techblue/20 hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex gap-6">
                  {/* Timeline dot */}
                  <div className="hidden md:flex h-16 w-16 rounded-full bg-techblue text-white items-center justify-center flex-shrink-0 z-10">
                    {milestone.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-techgold text-gray-900 text-sm font-bold px-3 py-1 rounded-full">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-techblue text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {achievements.map((achievement, index) => (
              <div key={index}>
                <p className="text-4xl md:text-5xl font-bold text-techgold">{achievement.number}</p>
                <p className="text-white/80 mt-2">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Looking Forward */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Future vision"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <SectionTitle title="Looking Forward" />
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our journey is far from over. We're more committed than ever to expanding 
                our reach, deepening our impact, and creating more opportunities for tech 
                enthusiasts across Africa and beyond.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                In the coming years, we aim to reach 10,000 members, establish presence 
                in 20 African countries, and help 1,000 people launch successful tech careers.
              </p>
              <Button asChild className="bg-techblue hover:bg-techblue-dark text-white">
                <Link to="/register" className="flex items-center gap-2">
                  Be Part of Our Story <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JourneyPage;
