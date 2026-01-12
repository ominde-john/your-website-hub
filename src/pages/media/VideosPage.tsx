import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Play, Eye, ThumbsUp, Youtube, Calendar, Filter, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Video {
  id: number | string;
  title: string;
  thumbnail: string;
  youtubeId: string;
  duration: string;
  views: string;
  likes: string;
  date: string;
  description?: string;
  category: string;
}

const VideosPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories = ["All", "Tutorials", "Tech Talks", "For Kids", "Interviews", "Demos", "Webinars"];

  // Featured video - animated explainer about coding
  const featuredVideo: Video = {
    id: "featured",
    title: "What is Coding? - Animated Explainer for Everyone",
    thumbnail: `https://img.youtube.com/vi/QvyTEx1wyOY/maxresdefault.jpg`,
    youtubeId: "QvyTEx1wyOY",
    duration: "5:40",
    views: "3.2M",
    likes: "45K",
    date: "March 15, 2025",
    description: "Learn what coding is and why it's important in this fun, animated video that makes programming concepts easy to understand for beginners of all ages.",
    category: "For Kids",
  };

  // Curated videos with cartoon characters explaining tech concepts
  const videos: Video[] = [
    {
      id: 1,
      title: "What is an Algorithm? - Fun Animated Explainer",
      thumbnail: `https://img.youtube.com/vi/6hfOvs8pY1k/maxresdefault.jpg`,
      youtubeId: "6hfOvs8pY1k",
      duration: "6:25",
      views: "1.8M",
      likes: "32K",
      date: "January 20, 2025",
      category: "For Kids",
    },
    {
      id: 2,
      title: "How Do Computers Work? - Animated Guide",
      thumbnail: `https://img.youtube.com/vi/mCq8-xTH7jA/maxresdefault.jpg`,
      youtubeId: "mCq8-xTH7jA",
      duration: "8:30",
      views: "5.3M",
      likes: "98K",
      date: "January 15, 2025",
      category: "Tutorials",
    },
    {
      id: 3,
      title: "Introduction to AI - Simple Animated Explanation",
      thumbnail: `https://img.youtube.com/vi/mJeNghZXtMo/maxresdefault.jpg`,
      youtubeId: "mJeNghZXtMo",
      duration: "10:15",
      views: "2.1M",
      likes: "56K",
      date: "December 28, 2024",
      category: "Tech Talks",
    },
    {
      id: 4,
      title: "What is the Internet? - Animated Documentary",
      thumbnail: `https://img.youtube.com/vi/Dxcc6ycZ73M/maxresdefault.jpg`,
      youtubeId: "Dxcc6ycZ73M",
      duration: "9:22",
      views: "8.5M",
      likes: "120K",
      date: "December 10, 2024",
      category: "For Kids",
    },
    {
      id: 5,
      title: "How Does Wi-Fi Work? - Animation Explained",
      thumbnail: `https://img.youtube.com/vi/hePLDVbULZc/maxresdefault.jpg`,
      youtubeId: "hePLDVbULZc",
      duration: "5:45",
      views: "4.2M",
      likes: "78K",
      date: "November 25, 2024",
      category: "Tutorials",
    },
    {
      id: 6,
      title: "Cybersecurity Basics - Animated for Beginners",
      thumbnail: `https://img.youtube.com/vi/inWWhr5tnEA/maxresdefault.jpg`,
      youtubeId: "inWWhr5tnEA",
      duration: "7:30",
      views: "1.5M",
      likes: "42K",
      date: "November 10, 2024",
      category: "Webinars",
    },
    {
      id: 7,
      title: "Python Programming for Kids - Animated Tutorial",
      thumbnail: `https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg`,
      youtubeId: "kqtD5dpn9C8",
      duration: "12:18",
      views: "6.8M",
      likes: "150K",
      date: "October 20, 2024",
      category: "Tutorials",
    },
    {
      id: 8,
      title: "How Robots Learn - AI and Machine Learning Explained",
      thumbnail: `https://img.youtube.com/vi/R9OHn5ZF4Uo/maxresdefault.jpg`,
      youtubeId: "R9OHn5ZF4Uo",
      duration: "11:22",
      views: "3.8M",
      likes: "89K",
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
            <div 
              className="relative group cursor-pointer animate-fade-up"
              onClick={() => setSelectedVideo(featuredVideo)}
            >
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
              <Button 
                className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold"
                onClick={() => setSelectedVideo(featuredVideo)}
              >
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
                onClick={() => setSelectedVideo(video)}
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

      {/* Video Player Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-none">
          <DialogTitle className="sr-only">
            {selectedVideo?.title || "Video Player"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Watch {selectedVideo?.title || "video"} - embedded YouTube player
          </DialogDescription>
          <div className="relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 z-50 text-white hover:text-techgold transition-colors"
              aria-label="Close video"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="aspect-video w-full">
              {selectedVideo && (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
            <div className="p-4 bg-gray-900">
              <h3 className="text-white font-semibold text-lg mb-2">
                {selectedVideo?.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" /> {selectedVideo?.views} views
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" /> {selectedVideo?.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {selectedVideo?.date}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideosPage;
