import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import {
  BookOpen,
  Calendar,
  Users,
  MessageSquare,
  Image,
  User,
  ArrowRight
} from "lucide-react";

const QuickLinksSection = () => {
  const links = [
    {
      title: "Educational Content",
      description: "Tutorials, guides, and learning resources to master new skills.",
      icon: <BookOpen className="h-8 w-8 text-techgold group-hover:text-black transition-colors duration-300" />,
      link: "/blogs"
    },
    {
      title: "Upcoming Events",
      description: "Find webinars, hackathons, meet-ups, and tech conferences.",
      icon: <Calendar className="h-8 w-8 text-techgold group-hover:text-black transition-colors duration-300" />,
      link: "/events"
    },
    {
      title: "Community Forums",
      description: "Engage in discussions and ask questions to fellow members.",
      icon: <MessageSquare className="h-8 w-8 text-techgold group-hover:text-black transition-colors duration-300" />,
      link: "/discussion"
    },
    {
      title: "About Us",
      description: "Learn about our mission, vision, and the amazing team behind it.",
      icon: <Users className="h-8 w-8 text-techgold group-hover:text-black transition-colors duration-300" />,
      link: "/about"
    },
    {
      title: "Project Gallery",
      description: "Explore the innovative projects created by community members.",
      icon: <Image className="h-8 w-8 text-techgold group-hover:text-black transition-colors duration-300" />,
      link: "/projects"
    },
    {
      title: "Member Dashboard",
      description: "Access your personal profile, settings, and contributions.",
      icon: <User className="h-8 w-8 text-techgold group-hover:text-black transition-colors duration-300" />,
      link: "/dashboard"
    }
  ];

  return (
    <section className="section-padding bg-gray-800 text-white">
      <div className="container-custom">
        <SectionTitle
          title="Quick Links"
          subtitle="Find what you're looking for with these handy shortcuts to popular sections"
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.link}
              className="group flex flex-col justify-between h-full p-6 bg-gray-900 rounded-xl border border-gray-700 shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-techgold/50"
            >
              <div className="flex items-start justify-between mb-4">
                {/* Icon Container with Hover Effect */}
                <div className="p-3 rounded-xl bg-techgold/20 group-hover:bg-techgold transition-colors duration-300">
                  {link.icon}
                </div>
                {/* Arrow Icon for Visual Cue */}
                <ArrowRight className="h-6 w-6 text-gray-600 group-hover:text-techgold transition-colors duration-300" />
              </div>

              <div>
                {/* Title and Description */}
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-techgold transition-colors duration-300">{link.title}</h3>
                <p className="text-gray-400 text-sm">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;
