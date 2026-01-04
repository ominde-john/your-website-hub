import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import { BookOpen, Calendar, Users, MessageSquare, Image, User, ArrowRight } from "lucide-react";

const QuickLinksSection = () => {
  const links = [
    {
      title: "Educational Content",
      description: "Tutorials, guides, and learning resources to master new skills.",
      icon: <BookOpen className="h-8 w-8 text-techgold group-hover:text-gray-900 transition-colors duration-300" />,
      link: "/blogs",
    },
    {
      title: "Upcoming Events",
      description: "Find webinars, hackathons, meet-ups, and tech conferences.",
      icon: <Calendar className="h-8 w-8 text-techgold group-hover:text-gray-900 transition-colors duration-300" />,
      link: "/events",
    },
    {
      title: "Community Forums",
      description: "Engage in discussions and ask questions to fellow members.",
      icon: <MessageSquare className="h-8 w-8 text-techgold group-hover:text-gray-900 transition-colors duration-300" />,
      link: "/discussion",
    },
    {
      title: "About Us",
      description: "Learn about our mission, vision, and the amazing team behind it.",
      icon: <Users className="h-8 w-8 text-techgold group-hover:text-gray-900 transition-colors duration-300" />,
      link: "/about",
    },
    {
      title: "Project Gallery",
      description: "Explore the innovative projects created by community members.",
      icon: <Image className="h-8 w-8 text-techgold group-hover:text-gray-900 transition-colors duration-300" />,
      link: "/projects",
    },
    {
      title: "Member Dashboard",
      description: "Access your profile, bookmarks, and personalized content.",
      icon: <User className="h-8 w-8 text-techgold group-hover:text-gray-900 transition-colors duration-300" />,
      link: "/dashboard",
    },
  ];

  return (
    <section className="section-padding bg-gray-800 text-white">
      <div className="container-custom">
        <SectionTitle
          title="Quick Links"
          subtitle="Navigate to popular sections of our community"
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-techgold hover:bg-techgold transition-all duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gray-900 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-800 transition-colors">
                {item.description}
              </p>
              <span className="inline-flex items-center text-techgold group-hover:text-gray-900 font-medium text-sm transition-colors">
                Explore
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;
