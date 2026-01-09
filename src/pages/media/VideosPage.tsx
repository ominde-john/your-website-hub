import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Play, Clock, Eye, ThumbsUp, Youtube, Calendar, Filter } from "lucide-react";

const VideosPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Tutorials", "Tech Talks", "Event Highlights", "Interviews", "Demos", "Webinars"];

  const featuredVideo = {
    id: "featured",
    title: "TeksoftCon 2025 - Keynote: The Future of African Tech",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    duration: "45:32",
    views: "15.2K",
    likes: "1.2K",
    date: "March 15, 2025",
    description: "Watch the inspiring keynote address from TeksoftCon 2025, where industry leaders discuss the future of technology in Africa and the role of communities in driving innovation.",
    category: "Event Highlights",
  };

  const videos = [
    {
      id: 1,
      title: "Getting Started with React - Complete Beginner's Guide",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
      duration: "28:15",
      views: "8.5K",
      likes: "620",
      date: "January 20, 2025",
      category: "Tutorials",
    },
    {
      id: 2,
      title: "Tech Talk: Building Scalable APIs with Node.js",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      duration: "52:40",
      views: "5.3K",
      likes: "340",
      date: "January 15, 2025",
      category: "Tech Talks",
    },
    {
      id: 3,
      title: "Hackathon 2024 Finals - Top 5 Projects Showcase",
      thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      duration: "1:15:22",
      views: "12.1K",
      likes: "890",
      date: "December 28, 2024",
      category: "Event Highlights",
    },
    {
      id: 4,
      title: "Interview: From Bootcamp to Tech Lead in 2 Years",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      duration: "35:18",
      views: "7.8K",
      likes: "520",
      date: "December 10, 2024",
      category: "Interviews",
    },
    {
      id: 5,
      title: "Live Demo: Building a Full-Stack App with Next.js",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      duration: "1:45:30",
      views: "9.2K",
      likes: "710",
      date: "November 25, 2024",
      category: "Demos",
    },
    {
      id: 6,
      title: "Webinar: Cybersecurity Best Practices for Developers",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      duration: "58:45",
      views: "6.4K",
      likes: "480",
      date: "November 10, 2024",
      category: "Webinars",
    },
    {
      id: 7,
      title: "Python for Data Science - Tutorial Series Pt.1",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      duration: "42:18",
      views: "11.5K",
      likes: "950",
      date: "October 20, 2024",
      category: "Tutorials",
    },
    {
      id: 8,
      title: "Tech Talk: Machine Learning in Production",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      duration: "48:22",
      views: "4.8K",
      likes: "320",
      date: "October 5, 2024",
      category: "Tech Talks",
    },
  ];

  const filteredVideos = activeCategory === "All"
    ? videos
    : videos.filter(video => video.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Videos | Teksoft Community</title>
        <meta
          name="description"
          content="Watch tutorials, tech talks, event highlights, and more from Teksoft Community."
        />
      </Helmet>

      <PageHeader
        title="Video Library"
        description="Tutorials, tech talks, event highlights, and educational content"
      />

      {/* Featured Video Section */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative group cursor-pointer animate-fade-up">
              <img
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                className="w-full aspect-video object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors rounded-xl flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-techgold flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-10 w-10 text-gray-900 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-sm font-mono">
                {featuredVideo.duration}
              </div>
            </div>
            <div className="text-white animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-block bg-techgold text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                FEATURED
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredVideo.title}</h2>
              <p className="text-gray-300 mb-6">{featuredVideo.description}</p>
              <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-6">
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" /> {featuredVideo.views} views
                </span>
                <span className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" /> {featuredVideo.likes}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {featuredVideo.date}
                </span>
              </div>
              <Button className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold">
                <Play className="h-5 w-5 mr-2" fill="currentColor" /> Watch Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Library Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
              All <span className="text-techblue">Videos</span>
            </h2>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600 text-sm">Filter by:</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-techblue text-white" : "border-gray-300 hover:border-techblue hover:text-techblue"}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video, index) => (
              <div
                key={video.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="h-14 w-14 rounded-full bg-techgold flex items-center justify-center">
                      <Play className="h-7 w-7 text-gray-900 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-0.5 rounded text-xs font-mono">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="bg-techblue text-white text-xs font-medium px-2 py-1 rounded">
                      {video.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-techblue transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" /> {video.likes}
                    </span>
                    <span>{video.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button className="bg-techblue hover:bg-techblue-dark text-white">
              Load More Videos
            </Button>
          </div>
        </div>
      </section>

      {/* YouTube CTA Section */}
      <section className="section-padding bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container-custom text-center">
          <Youtube className="h-16 w-16 mx-auto mb-6 animate-fade-up" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Subscribe to Our YouTube Channel
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Never miss a tutorial, tech talk, or community update. Join 10,000+ subscribers!
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-gray-100 text-red-600 font-bold animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Youtube className="h-5 w-5 mr-2" /> Subscribe Now
          </Button>
        </div>
      </section>
    </>
  );
};

export default VideosPage;
