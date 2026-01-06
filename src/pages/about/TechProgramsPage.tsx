import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code, Database, Smartphone, Shield, Cloud, Brain, Clock, Users, CheckCircle, ArrowRight } from "lucide-react";

const TechProgramsPage = () => {
  const programs = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Web Development Bootcamp",
      duration: "12 weeks",
      level: "Beginner to Intermediate",
      description: "Master HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and deploy them to the cloud.",
      topics: ["HTML & CSS", "JavaScript", "React", "Node.js", "Databases", "Deployment"],
      color: "bg-blue-500",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile App Development",
      duration: "10 weeks",
      level: "Intermediate",
      description: "Learn to build cross-platform mobile applications using React Native and Flutter.",
      topics: ["React Native", "Flutter", "UI/UX for Mobile", "API Integration", "App Store Publishing"],
      color: "bg-green-500",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Science & Analytics",
      duration: "14 weeks",
      level: "Beginner to Advanced",
      description: "From Python basics to machine learning. Analyze data, build models, and create visualizations.",
      topics: ["Python", "Pandas", "Machine Learning", "Data Visualization", "SQL", "Statistics"],
      color: "bg-purple-500",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Cybersecurity Essentials",
      duration: "8 weeks",
      level: "Beginner",
      description: "Understand security fundamentals, ethical hacking basics, and how to protect digital assets.",
      topics: ["Network Security", "Ethical Hacking", "Cryptography", "Security Tools", "Best Practices"],
      color: "bg-red-500",
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Computing & DevOps",
      duration: "10 weeks",
      level: "Intermediate to Advanced",
      description: "Master AWS, Docker, Kubernetes, and CI/CD pipelines for modern software deployment.",
      topics: ["AWS/GCP", "Docker", "Kubernetes", "CI/CD", "Infrastructure as Code", "Monitoring"],
      color: "bg-orange-500",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI & Machine Learning",
      duration: "16 weeks",
      level: "Advanced",
      description: "Deep dive into neural networks, deep learning, and building AI-powered applications.",
      topics: ["Deep Learning", "TensorFlow", "Natural Language Processing", "Computer Vision", "MLOps"],
      color: "bg-indigo-500",
    },
  ];

  const benefits = [
    { icon: <Users className="h-5 w-5" />, text: "Expert instructors from the industry" },
    { icon: <Code className="h-5 w-5" />, text: "Hands-on projects and real-world experience" },
    { icon: <CheckCircle className="h-5 w-5" />, text: "Certificates upon completion" },
    { icon: <Clock className="h-5 w-5" />, text: "Flexible learning schedules" },
  ];

  return (
    <div>
      <PageHeader
        title="Tech Programs"
        description="Comprehensive training programs to accelerate your tech career"
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              title="Learn. Build. Grow."
              centered
            />
            <p className="text-gray-600 text-lg">
              Our carefully designed programs combine theory with practical experience, 
              preparing you for real-world challenges in the tech industry. Whether you're 
              just starting out or looking to level up, we have a program for you.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-8 bg-techblue text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 justify-center text-sm">
                <span className="text-techgold">{benefit.icon}</span>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Available Programs"
            subtitle="Choose the path that matches your goals"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`${program.color} text-white p-6`}>
                  <div className="flex items-center gap-4">
                    {program.icon}
                    <div>
                      <h3 className="text-lg font-bold">{program.title}</h3>
                      <p className="text-sm opacity-90">{program.duration} • {program.level}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-900">What you'll learn:</p>
                    <div className="flex flex-wrap gap-2">
                      {program.topics.map((topic, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="How It Works"
            subtitle="Simple steps to start your learning journey"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Choose", description: "Select a program that aligns with your career goals" },
              { step: "02", title: "Register", description: "Sign up and complete your enrollment" },
              { step: "03", title: "Learn", description: "Attend classes, complete projects, and collaborate" },
              { step: "04", title: "Certify", description: "Complete the program and receive your certificate" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="h-12 w-12 rounded-full bg-techgold text-gray-900 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of learners who have transformed their careers through our programs.
          </p>
          <Button asChild size="lg" className="bg-techgold hover:bg-techgold-dark text-gray-900">
            <Link to="/contact" className="flex items-center gap-2">
              Contact Us for Enrollment <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TechProgramsPage;
