import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cpu, Brain, Cog, Lightbulb, Zap, CircuitBoard, ArrowRight, CheckCircle2 } from "lucide-react";

const AIRoboticsPage = () => {
  const features = [
    {
      icon: <Cpu className="h-8 w-8 text-techgold" />,
      title: "Robotics Engineering",
      description: "Design and build autonomous robots, smart devices, and embedded systems using modern hardware platforms and intelligent control software.",
    },
    {
      icon: <Brain className="h-8 w-8 text-techgold" />,
      title: "Artificial Intelligence",
      description: "Apply machine learning, deep learning, computer vision, and NLP to real-world challenges across multiple industries.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-techgold" />,
      title: "Innovation & Research",
      description: "Collaborate on cutting-edge research, hackathons, and innovation missions that solve meaningful real-world problems.",
    },
    {
      icon: <Cog className="h-8 w-8 text-techgold" />,
      title: "Automation Systems",
      description: "Build intelligent automation pipelines, IoT solutions, and smart manufacturing systems.",
    },
    {
      icon: <Zap className="h-8 w-8 text-techgold" />,
      title: "Edge Computing",
      description: "Develop AI solutions that run on edge devices, enabling real-time processing and decision making.",
    },
    {
      icon: <CircuitBoard className="h-8 w-8 text-techgold" />,
      title: "Hardware Prototyping",
      description: "Learn electronics, PCB design, and hardware integration for robotics and IoT projects.",
    },
  ];

  const technologies = [
    "TensorFlow & PyTorch",
    "ROS (Robot Operating System)",
    "Arduino & Raspberry Pi",
    "Computer Vision (OpenCV)",
    "Natural Language Processing",
    "Reinforcement Learning",
  ];

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>AI & Robotics Unit | Teksoft Community</title>
        <meta
          name="description"
          content="The AI & Robotics Unit at Teksoft Community focuses on artificial intelligence, robotics innovation, research, and hands-on projects."
        />
      </Helmet>

      {/* Hero Section */}
      <PageHeader
        title="AI & Robotics Unit"
        description="A forward-thinking innovation unit exploring artificial intelligence, robotics, automation, and intelligent systems through hands-on research, workshops, and real-world projects."
      />

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-techgold">Focus Areas</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the cutting-edge domains where AI and robotics intersect to create transformative solutions.
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

      {/* Technologies Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Technologies We <span className="text-techgold">Master</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Get hands-on experience with industry-leading tools and frameworks used by AI and robotics professionals worldwide.
              </p>
              <div className="space-y-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-techgold flex-shrink-0" />
                    <span className="text-gray-200">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <img
                src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80"
                alt="AI and Robotics"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current <span className="text-techgold">Projects</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join ongoing projects or propose your own innovative ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Agriculture Drone",
                status: "In Progress",
                members: 8,
              },
              {
                title: "Voice-Controlled Assistant",
                status: "Recruiting",
                members: 5,
              },
              {
                title: "Autonomous Navigation Bot",
                status: "In Progress",
                members: 12,
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-techblue hover:shadow-md transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-3 py-1 rounded-full font-medium ${
                    project.status === "Recruiting" 
                      ? "bg-techgold/10 text-techgold-dark" 
                      : "bg-techblue/10 text-techblue"
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-gray-500">{project.members} members</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-techblue to-techblue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            Build the Future with Us
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Join the AI & Robotics Unit and shape the next generation of intelligent systems.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link to="/contact" className="flex items-center gap-2">
              Get Involved <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default AIRoboticsPage;
