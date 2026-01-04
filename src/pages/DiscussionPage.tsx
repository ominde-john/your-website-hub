import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Users, ChevronRight, Eye, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const DiscussionPage = () => {
  const categories = [
    {
      id: "ai-ml",
      name: "Artificial Intelligence & Machine Learning",
      description: "Discuss the latest in AI research, machine learning models, and their applications.",
      icon: "🤖",
      topics: 156,
      posts: 2341,
    },
    {
      id: "web-dev",
      name: "Web Development",
      description: "Everything about frontend, backend, and full-stack web development.",
      icon: "🌐",
      topics: 234,
      posts: 4521,
    },
    {
      id: "mobile",
      name: "Mobile Development",
      description: "iOS, Android, React Native, Flutter, and cross-platform development.",
      icon: "📱",
      topics: 89,
      posts: 1234,
    },
    {
      id: "career",
      name: "Career & Job Hunting",
      description: "Share tips, ask questions, and help each other land dream tech jobs.",
      icon: "💼",
      topics: 67,
      posts: 892,
    },
  ];

  const recentTopics = [
    {
      id: 1,
      title: "GPT-4 and Its Implications for Software Development",
      category: "AI & ML",
      author: "Alex Johnson",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
      date: "2 hours ago",
      replies: 24,
      views: 156,
    },
    {
      id: 2,
      title: "Best practices for React Server Components",
      category: "Web Dev",
      author: "Sarah Mwangi",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      date: "5 hours ago",
      replies: 18,
      views: 234,
    },
    {
      id: 3,
      title: "How to prepare for FAANG interviews?",
      category: "Career",
      author: "John Ominde",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      date: "1 day ago",
      replies: 45,
      views: 567,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Discussion Forums"
        description="Join conversations on cutting-edge technologies and connect with fellow tech enthusiasts"
      >
        <div className="relative max-w-md mx-auto">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search discussions..."
            className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70"
          />
        </div>
      </PageHeader>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <Tabs defaultValue="categories">
            <TabsList className="mb-8">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="recent">Recent Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="categories">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/discussion/${category.id}`}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{category.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-techblue transition-colors mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" /> {category.topics} topics
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" /> {category.posts} posts
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-techblue transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {recentTopics.map((topic, index) => (
                  <Link
                    key={topic.id}
                    to={`/discussion/topic/${topic.id}`}
                    className={`flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors ${
                      index !== recentTopics.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <img
                      src={topic.authorImage}
                      alt={topic.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 hover:text-techblue transition-colors">
                        {topic.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>{topic.author}</span>
                        <span>·</span>
                        <span className="bg-techblue/10 text-techblue px-2 py-0.5 rounded text-xs">
                          {topic.category}
                        </span>
                        <span>·</span>
                        <span>{topic.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" /> {topic.replies}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" /> {topic.views}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Start Discussion CTA */}
          <div className="mt-12 text-center bg-techblue/5 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Have a question or idea?</h3>
            <p className="text-gray-600 mb-6">Start a new discussion and get insights from the community.</p>
            <Button className="bg-techblue hover:bg-techblue-dark text-white">
              Start New Discussion
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscussionPage;
