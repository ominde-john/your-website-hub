import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter, Star, GitFork, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const projects = [
    {
      id: 1,
      title: "Open Source AI Assistant",
      description: "A community-developed AI assistant that helps answer coding questions and debug errors in real-time.",
      category: "AI Assistance",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      author: "John Ominde",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      technologies: ["Machine Learning", "Python", "MongoDB"],
      stars: 145,
      forks: 32,
    },
    {
      id: 2,
      title: "Community Job Board",
      description: "A platform connecting tech talent with companies looking for skilled developers in Africa.",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      author: "Sarah Mwangi",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      technologies: ["React", "Node.js", "PostgreSQL"],
      stars: 89,
      forks: 21,
    },
    {
      id: 3,
      title: "Mobile Learning App",
      description: "An educational app providing bite-sized tech lessons for learners on the go.",
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      author: "Evans Richard",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      technologies: ["React Native", "Firebase", "TypeScript"],
      stars: 67,
      forks: 15,
    },
    {
      id: 4,
      title: "DevOps Automation Toolkit",
      description: "A collection of scripts and tools for automating CI/CD pipelines and infrastructure management.",
      category: "DevOps",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      author: "Jeremy Bravoge",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
      technologies: ["Docker", "Kubernetes", "Terraform"],
      stars: 112,
      forks: 28,
    },
  ];

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const filteredProjects = projects.filter((project) => {
    if (categoryFilter && project.category !== categoryFilter) return false;
    if (!searchQuery) return true;
    return (
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <PageHeader
        title="Community Projects"
        description="Explore innovative projects built by our community members"
      >
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Filter className="h-4 w-4 mr-2" />
                {categoryFilter || "All Categories"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCategoryFilter(null)}>All Categories</DropdownMenuItem>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat} onClick={() => setCategoryFilter(cat)}>
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </PageHeader>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-techblue text-white text-xs px-3 py-1 rounded-full">
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={project.authorImage}
                      alt={project.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">{project.author}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-techblue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-techgold" /> {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" /> {project.forks}
                      </span>
                    </div>
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-techblue font-medium text-sm flex items-center gap-1 hover:underline"
                    >
                      View <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
