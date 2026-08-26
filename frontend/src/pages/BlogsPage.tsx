import { useState } from "react";
import PageHeader from "../components/PageHeader";
import SectionTitle from "../components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BlogsPage = () => {
  const categories = ["All", "Tech News", "Tutorials", "Coding Challenge", "Reviews", "Member Spotlight", "Career Advice"];
  const [activeCategory, setActiveCategory] = useState("All");

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Software Development",
      excerpt: "Exploring how artificial intelligence is changing the landscape of software development and what developers need to know.",
      category: "Tech News",
      author: "Jeremy Bravoge",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
      date: "May 15, 2024",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Building Your First React Application: A Step-by-Step Guide",
      excerpt: "Learn how to create your first React application from scratch with this comprehensive tutorial for beginners.",
      category: "Tutorials",
      author: "Evans Richard",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      date: "May 10, 2024",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Top 10 VS Code Extensions for Web Developers",
      excerpt: "Boost your productivity with these essential VS Code extensions every web developer should have installed.",
      category: "Reviews",
      author: "Sarah Mwangi",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      date: "May 5, 2024",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      readTime: "4 min read",
    },
    {
      id: 4,
      title: "Career Transition: From Marketing to Tech",
      excerpt: "One member's inspiring journey of transitioning from a marketing career to becoming a successful software developer.",
      category: "Member Spotlight",
      author: "John Ominde",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      date: "April 28, 2024",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read",
    },
  ];

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div>
      <PageHeader
        title="Blogs & Articles"
        description="Stay updated with the latest tech trends, tutorials, and community stories"
      >
        <div className="relative max-w-md mx-auto">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70"
          />
        </div>
      </PageHeader>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-techblue text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-techblue text-white text-xs px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <span className="text-gray-900 font-medium">{post.author}</span>
                      <span className="text-gray-400 mx-2">·</span>
                      <span className="text-gray-500">{post.date}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-techblue transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <Link
                      to={`/blogs/${post.id}`}
                      className="text-techblue font-medium text-sm flex items-center gap-1 hover:underline"
                    >
                      Read more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-techblue text-techblue hover:bg-techblue hover:text-white">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
