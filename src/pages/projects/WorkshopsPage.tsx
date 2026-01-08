import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Users, Clock, Award, Laptop, Target, ArrowRight, CheckCircle2 } from "lucide-react";

const WorkshopsPage = () => {
  const programs = [
    {
      icon: <Laptop className="h-8 w-8 text-techgold" />,
      title: "Full-Stack Bootcamp",
      duration: "12 Weeks",
      description: "Comprehensive training covering front-end, back-end, databases, and deployment strategies.",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
    },
    {
      icon: <Target className="h-8 w-8 text-techgold" />,
      title: "Data Science Intensive",
      duration: "8 Weeks",
      description: "Master data analysis, machine learning, and visualization with hands-on projects.",
      skills: ["Python", "TensorFlow", "Pandas", "SQL"],
    },
    {
      icon: <BookOpen className="h-8 w-8 text-techgold" />,
      title: "UI/UX Design Workshop",
      duration: "6 Weeks",
      description: "Learn user-centered design principles, prototyping, and design systems.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    },
    {
      icon: <Clock className="h-8 w-8 text-techgold" />,
      title: "DevOps Fundamentals",
      duration: "4 Weeks",
      description: "Master CI/CD pipelines, containerization, and cloud infrastructure.",
      skills: ["Docker", "Kubernetes", "Jenkins", "Terraform"],
    },
  ];

  const benefits = [
    "Industry-experienced instructors",
    "Hands-on project-based learning",
    "Real-world case studies",
    "Certificate upon completion",
    "Career placement support",
    "Lifetime community access",
  ];

  return (
    <>
      <Helmet>
        <title>Tech Workshops & Bootcamps | Teksoft Community</title>
        <meta
          name="description"
          content="Join intensive tech workshops and bootcamps at Teksoft Community - hands-on training programs designed to build real-world technical skills."
        />
      </Helmet>

      {/* Hero Section */}
      <PageHeader
        title="Tech Workshops & Bootcamps"
        description="Hands-on workshops, bootcamps, and intensive training programs designed to build real-world technical skills."
      />

      {/* Programs Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-techgold">Programs</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from a variety of intensive programs designed to accelerate your tech career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-techblue hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-techblue/10 flex items-center justify-center flex-shrink-0">
                    {program.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                    <span className="text-sm text-techblue font-semibold">{program.duration}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="flex flex-wrap gap-2">
                  {program.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-techgold/10 text-techgold-dark text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                alt="Workshop session"
                className="rounded-xl shadow-2xl"
              />
            </div>
            <div className="animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Our <span className="text-techgold">Workshops?</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Our programs are crafted by industry experts and designed to give you practical skills that employers actually need.
              </p>
              <div className="space-y-4">
                {benefits.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-techgold flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Graduates" },
              { number: "20+", label: "Programs" },
              { number: "95%", label: "Completion Rate" },
              { number: "85%", label: "Job Placement" },
            ].map((stat, index) => (
              <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold text-techblue mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-techblue to-techblue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            Ready to Level Up Your Skills?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Enroll in one of our programs and transform your career in weeks, not years.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link to="/contact" className="flex items-center gap-2">
              Enroll Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default WorkshopsPage;
