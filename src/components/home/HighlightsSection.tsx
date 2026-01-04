import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import { ArrowRight, Rss, CalendarCheck, Code } from "lucide-react";

const HighlightsSection = () => {
  const highlights = [
    {
      category: "Blog",
      title: "The Future of AI in Everyday Applications",
      description:
        "Explore how artificial intelligence is being integrated into daily applications, from smart homes to mobile productivity tools.",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      link: "/blogs",
      icon: <Rss className="h-5 w-5 text-white" />,
    },
    {
      category: "Event",
      title: "Annual Tech Conference 2026",
      description:
        "Join us for our biggest tech conference of the year featuring inspiring keynotes and networking opportunities with industry leaders.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      link: "/events",
      icon: <CalendarCheck className="h-5 w-5 text-white" />,
    },
    {
      category: "Project",
      title: "Open Source AI Assistant",
      description:
        "A community-led project focusing on building an accessible, open-source AI assistant for everyone—join the development team!",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      link: "/projects",
      icon: <Code className="h-5 w-5 text-white" />,
    },
  ];

  return (
    <section className="section-padding bg-gray-800 text-white">
      <div className="container-custom">
        <SectionTitle
          title="Latest Highlights"
          subtitle="Check out the most recent and noteworthy content from our community"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-techgold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-techgold/20"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-techblue/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {item.icon}
                  <span className="text-sm font-medium text-white">{item.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-techgold transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                <span className="inline-flex items-center text-techgold font-semibold text-sm group-hover:underline">
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-techgold text-techgold hover:bg-techgold hover:text-gray-900">
            <Link to="/blogs" className="flex items-center gap-2">
              View All Content
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
