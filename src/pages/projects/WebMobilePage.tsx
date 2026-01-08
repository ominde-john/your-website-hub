import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Smartphone, Code2, Layers, Zap, Palette, ArrowRight, CheckCircle2 } from "lucide-react";

const WebMobilePage = () => {
  const services = [
    {
      icon: <Globe className="h-8 w-8 text-techgold" />,
      title: "Web Development",
      description: "Build responsive, modern websites using React, Vue, Angular, and other cutting-edge frameworks.",
      tech: ["React", "Next.js", "Vue.js", "TypeScript"],
    },
    {
      icon: <Smartphone className="h-8 w-8 text-techgold" />,
      title: "Mobile Development",
      description: "Create native and cross-platform mobile apps for iOS and Android using modern tools.",
      tech: ["React Native", "Flutter", "Swift", "Kotlin"],
    },
    {
      icon: <Code2 className="h-8 w-8 text-techgold" />,
      title: "Backend Development",
      description: "Design scalable APIs, microservices, and server-side applications.",
      tech: ["Node.js", "Python", "Go", "PostgreSQL"],
    },
    {
      icon: <Layers className="h-8 w-8 text-techgold" />,
      title: "Full Stack Projects",
      description: "End-to-end application development from database design to deployment.",
      tech: ["MERN Stack", "JAMstack", "AWS", "Docker"],
    },
  ];

  const projectTypes = [
    {
      title: "E-Commerce Platforms",
      description: "Build complete online stores with payment integration",
    },
    {
      title: "Social Applications",
      description: "Create community platforms with real-time features",
    },
    {
      title: "Dashboard & Analytics",
      description: "Design data visualization and management tools",
    },
    {
      title: "Progressive Web Apps",
      description: "Develop offline-capable web applications",
    },
    {
      title: "API Development",
      description: "Create RESTful and GraphQL APIs",
    },
    {
      title: "Real-time Applications",
      description: "Build chat apps and live collaboration tools",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Web & Mobile Dev Missions | Teksoft Community</title>
        <meta
          name="description"
          content="Join Web & Mobile Dev Missions at Teksoft Community - build modern websites and mobile applications using cutting-edge frameworks."
        />
      </Helmet>

      {/* Hero Section */}
      <PageHeader
        title="Web & Mobile Dev Missions"
        description="Build modern websites and mobile applications using cutting-edge frameworks and real client-style projects."
      />

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Development <span className="text-techgold">Tracks</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Master the skills needed to build world-class web and mobile applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-techblue hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-techblue/10 flex items-center justify-center flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((item, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-techblue/10 text-techblue text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real-World <span className="text-techgold">Projects</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Work on practical projects that mirror real industry challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectTypes.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-techgold transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
                alt="Coding on laptop"
                className="rounded-xl shadow-xl"
              />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Join Our <span className="text-techgold">Missions?</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Our project-based approach ensures you're not just learning theory, but building real applications that demonstrate your skills.
              </p>
              <div className="space-y-4">
                {[
                  "Portfolio-ready projects",
                  "Code reviews from senior developers",
                  "Agile development methodology",
                  "Git and collaboration workflows",
                  "Deployment and DevOps basics",
                  "Industry best practices",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-techgold flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
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
            Start Your Development Mission
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Join our community and build applications that make a difference.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link to="/register" className="flex items-center gap-2">
              Begin Mission <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default WebMobilePage;
