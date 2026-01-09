import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock, Headphones, Calendar, Apple, Music2, Radio, Users, Mic } from "lucide-react";

const PodcastsPage = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Tech Insights", "Career Stories", "Industry Trends", "Community Voices", "Deep Dives"];

  const featuredPodcast = {
    id: 0,
    title: "The Future of AI in Africa: Opportunities & Challenges",
    description: "Join our host as we explore the rapidly evolving AI landscape in Africa with special guests from leading tech companies and research institutions.",
    duration: "58:32",
    date: "January 25, 2025",
    episode: "Episode 47",
    guest: "Dr. Amina Osei, AI Research Lead at AfricaTech Labs",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
    listens: "5.2K",
  };

  const podcasts = [
    {
      id: 1,
      title: "Breaking Into Tech: A Non-Traditional Path",
      description: "Sarah shares her journey from marketing to senior software engineer at a Fortune 500 company.",
      duration: "42:15",
      date: "January 18, 2025",
      episode: "Episode 46",
      category: "Career Stories",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      listens: "3.8K",
    },
    {
      id: 2,
      title: "Cloud Computing Trends for 2025",
      description: "We dive deep into the latest cloud technologies and what developers should be learning this year.",
      duration: "51:40",
      date: "January 11, 2025",
      episode: "Episode 45",
      category: "Industry Trends",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
      listens: "4.1K",
    },
    {
      id: 3,
      title: "Building Inclusive Tech Communities",
      description: "Community leaders discuss strategies for creating welcoming spaces for underrepresented groups in tech.",
      duration: "45:22",
      date: "January 4, 2025",
      episode: "Episode 44",
      category: "Community Voices",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
      listens: "2.9K",
    },
    {
      id: 4,
      title: "Understanding Blockchain Beyond Crypto",
      description: "A technical deep dive into blockchain applications in supply chain, healthcare, and governance.",
      duration: "1:02:18",
      date: "December 28, 2024",
      episode: "Episode 43",
      category: "Deep Dives",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=80",
      listens: "3.5K",
    },
    {
      id: 5,
      title: "Remote Work: Tools & Productivity Tips",
      description: "Top tips and tools from developers who've mastered the art of remote work.",
      duration: "38:45",
      date: "December 21, 2024",
      episode: "Episode 42",
      category: "Tech Insights",
      image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&w=400&q=80",
      listens: "4.7K",
    },
    {
      id: 6,
      title: "From Junior to Senior: The Growth Mindset",
      description: "Veteran engineers share what it takes to progress in your tech career.",
      duration: "55:10",
      date: "December 14, 2024",
      episode: "Episode 41",
      category: "Career Stories",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      listens: "5.9K",
    },
  ];

  const filteredPodcasts = activeCategory === "All"
    ? podcasts
    : podcasts.filter(podcast => podcast.category === activeCategory);

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Podcasts | Teksoft Community</title>
        <meta
          name="description"
          content="Listen to the Teksoft Community Podcast - tech insights, career stories, and conversations with industry leaders."
        />
      </Helmet>

      <PageHeader
        title="Teksoft Podcasts"
        description="Tech insights, career stories, and conversations with industry leaders"
      />

      {/* Stats Section */}
      <section className="bg-gray-900 py-8">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center animate-fade-up">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Radio className="h-6 w-6 text-techgold" />
                <span className="text-3xl font-bold text-white">47</span>
              </div>
              <p className="text-gray-400 text-sm">Episodes</p>
            </div>
            <div className="text-center animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Headphones className="h-6 w-6 text-techgold" />
                <span className="text-3xl font-bold text-white">150K+</span>
              </div>
              <p className="text-gray-400 text-sm">Total Listens</p>
            </div>
            <div className="text-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="h-6 w-6 text-techgold" />
                <span className="text-3xl font-bold text-white">8K+</span>
              </div>
              <p className="text-gray-400 text-sm">Subscribers</p>
            </div>
            <div className="text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Mic className="h-6 w-6 text-techgold" />
                <span className="text-3xl font-bold text-white">35+</span>
              </div>
              <p className="text-gray-400 text-sm">Guest Experts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8 animate-fade-up">
            <span className="inline-block bg-techgold text-gray-900 text-xs font-bold px-4 py-2 rounded-full mb-4">
              🎙️ LATEST EPISODE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured <span className="text-techblue">Episode</span>
            </h2>
          </div>

          <div className="bg-gradient-to-br from-techblue to-techblue-dark rounded-2xl p-8 md:p-10 text-white animate-fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="relative group">
                  <img
                    src={featuredPodcast.image}
                    alt={featuredPodcast.title}
                    className="w-full aspect-square object-cover rounded-xl shadow-2xl"
                  />
                  <button 
                    onClick={() => togglePlay(featuredPodcast.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors rounded-xl"
                  >
                    <div className="h-20 w-20 rounded-full bg-techgold flex items-center justify-center group-hover:scale-110 transition-transform">
                      {playingId === featuredPodcast.id ? (
                        <Pause className="h-10 w-10 text-gray-900" />
                      ) : (
                        <Play className="h-10 w-10 text-gray-900 ml-1" fill="currentColor" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
              <div className="lg:col-span-2">
                <span className="text-techgold font-semibold">{featuredPodcast.episode}</span>
                <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-4">{featuredPodcast.title}</h3>
                <p className="text-white/80 mb-4">{featuredPodcast.description}</p>
                <p className="text-sm text-white/60 mb-6">
                  <span className="text-techgold font-medium">Guest:</span> {featuredPodcast.guest}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm mb-6">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {featuredPodcast.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <Headphones className="h-4 w-4" /> {featuredPodcast.listens} listens
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {featuredPodcast.date}
                  </span>
                </div>
                <Button className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold">
                  <Play className="h-5 w-5 mr-2" fill="currentColor" /> Listen Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Episodes */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            All <span className="text-techgold">Episodes</span>
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
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

          {/* Episodes List */}
          <div className="space-y-4">
            {filteredPodcasts.map((podcast, index) => (
              <div
                key={podcast.id}
                className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-4 md:items-center animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full md:w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => togglePlay(podcast.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors rounded-lg"
                  >
                    {playingId === podcast.id ? (
                      <Pause className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="h-8 w-8 text-white ml-0.5" fill="currentColor" />
                    )}
                  </button>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-techblue text-sm font-semibold">{podcast.episode}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {podcast.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 hover:text-techblue transition-colors cursor-pointer">
                    {podcast.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{podcast.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {podcast.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Headphones className="h-3 w-3" /> {podcast.listens}
                    </span>
                    <span>{podcast.date}</span>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2">
                  <Button size="sm" variant="outline" className="border-techblue text-techblue hover:bg-techblue hover:text-white">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button className="bg-techblue hover:bg-techblue-dark text-white">
              Load More Episodes
            </Button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="section-padding bg-gradient-to-r from-techblue to-techblue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            Listen on Your Favorite <span className="text-techgold">Platform</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Subscribe to never miss an episode of the Teksoft Podcast
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="bg-white hover:bg-gray-100 text-gray-900 font-bold">
              <Apple className="h-5 w-5 mr-2" /> Apple Podcasts
            </Button>
            <Button size="lg" className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white font-bold">
              <Music2 className="h-5 w-5 mr-2" /> Spotify
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 font-bold">
              <Radio className="h-5 w-5 mr-2" /> Google Podcasts
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PodcastsPage;
