import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad2, Trophy, Lightbulb, Users, Zap, Star, ArrowRight, CheckCircle2 } from "lucide-react";

const GamingPage = () => {
  const areas = [
    {
      icon: <Gamepad2 className="h-8 w-8 text-techgold" />,
      title: "Game Development",
      description: "Create games using Unity, Unreal Engine, and Godot. Learn game mechanics, physics, and AI programming.",
    },
    {
      icon: <Trophy className="h-8 w-8 text-techgold" />,
      title: "Esports Innovation",
      description: "Develop esports platforms, tournament management systems, and competitive gaming tools.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-techgold" />,
      title: "VR/AR Experiences",
      description: "Build immersive virtual and augmented reality applications for gaming and beyond.",
    },
    {
      icon: <Users className="h-8 w-8 text-techgold" />,
      title: "Multiplayer Systems",
      description: "Design and implement real-time multiplayer game architectures and networking.",
    },
    {
      icon: <Zap className="h-8 w-8 text-techgold" />,
      title: "Game AI",
      description: "Create intelligent NPCs, procedural content generation, and adaptive difficulty systems.",
    },
    {
      icon: <Star className="h-8 w-8 text-techgold" />,
      title: "Interactive Media",
      description: "Explore interactive storytelling, simulations, and educational games.",
    },
  ];

  const technologies = [
    { name: "Unity", category: "Engine" },
    { name: "Unreal Engine", category: "Engine" },
    { name: "Godot", category: "Engine" },
    { name: "C#", category: "Language" },
    { name: "C++", category: "Language" },
    { name: "Blender", category: "3D Art" },
    { name: "Photon", category: "Multiplayer" },
    { name: "PlayFab", category: "Backend" },
  ];

  const events = [
    "Monthly game jams",
    "Annual gaming hackathon",
    "Esports tournaments",
    "Developer showcases",
    "Industry speaker sessions",
    "Portfolio review days",
  ];

  return (
    <>
      <Helmet>
        <title>Gaming & Innovation League | Teksoft Community</title>
        <meta
          name="description"
          content="Join the Gaming & Innovation League at Teksoft Community - explore game development, esports innovation, VR/AR, and interactive technology."
        />
      </Helmet>

      {/* Hero Section */}
      <PageHeader
        title="Gaming & Innovation League"
        description="Explore game development, esports innovation, simulations, and interactive technology experiences."
      />

      {/* Areas Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Innovation <span className="text-techgold">Areas</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dive into various aspects of gaming and interactive technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-b-4 border-techgold hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-14 w-14 rounded-full bg-techblue/10 flex items-center justify-center mb-4">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tools & <span className="text-techgold">Technologies</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Master the industry-standard tools and technologies used by professional game developers.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-techgold transition-all duration-300"
                  >
                    <span className="text-white font-semibold">{tech.name}</span>
                    <span className="text-techgold text-sm block">{tech.category}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
                alt="Gaming setup"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                alt="Gaming event"
                className="rounded-xl shadow-xl"
              />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                League <span className="text-techgold">Events</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Participate in exciting events that challenge your creativity and skills while connecting you with fellow gaming enthusiasts.
              </p>
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-techgold flex-shrink-0" />
                    <span className="text-gray-700">{event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-techblue to-techblue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            Join the <span className="text-techgold">League</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Turn your passion for gaming into innovation. Be part of our creative community.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link to="/register" className="flex items-center gap-2">
              Join the League <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default GamingPage;
