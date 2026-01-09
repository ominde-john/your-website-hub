import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Users, ChevronRight, Eye, MessageCircle, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useOnlinePresence } from "@/hooks/useOnlinePresence";
import MemberCard from "@/components/members/MemberCard";
import ChatWindow from "@/components/members/ChatWindow";
import CreateTopicDialog from "@/components/discussions/CreateTopicDialog";
import TopicCard from "@/components/discussions/TopicCard";
import TopicChatWindow from "@/components/discussions/TopicChatWindow";

interface MemberWithRole {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar_url?: string;
  last_seen?: string | null;
  role: 'admin' | 'moderator' | 'user';
}

interface ChatPartner {
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar_url?: string;
  last_seen?: string | null;
}

interface Topic {
  id: string;
  title: string;
  description?: string;
  category: string;
  created_by: string;
  created_at: string;
}

const DiscussionPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState<MemberWithRole[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [activeChatPartner, setActiveChatPartner] = useState<ChatPartner | null>(null);
  const { isUserOnline } = useOnlinePresence(user?.id);
  
  // Topics state
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [topicSearchQuery, setTopicSearchQuery] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data: profiles } = await supabase.from("profiles").select("id, user_id, first_name, last_name, username, avatar_url, last_seen");
        const { data: roles } = await supabase.from("user_roles").select("user_id, role");
        const membersWithRoles: MemberWithRole[] = (profiles || []).map((profile) => {
          const userRole = roles?.find((r) => r.user_id === profile.user_id);
          return { ...profile, role: (userRole?.role as 'admin' | 'moderator' | 'user') || 'user' };
        });
        membersWithRoles.sort((a, b) => ({ admin: 0, moderator: 1, user: 2 }[a.role] - { admin: 0, moderator: 1, user: 2 }[b.role]));
        setMembers(membersWithRoles);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoadingMembers(false);
      }
    };
    fetchMembers();
  }, []);

  // Fetch topics
  const fetchTopics = async () => {
    setLoadingTopics(true);
    try {
      const { data, error } = await supabase
        .from("discussion_topics")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTopics(data || []);
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setLoadingTopics(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleStartChat = (memberId: string) => {
    if (!user) { navigate("/auth"); return; }
    const member = members.find((m) => m.user_id === memberId);
    if (member) setActiveChatPartner({ user_id: member.user_id, first_name: member.first_name, last_name: member.last_name, username: member.username, avatar_url: member.avatar_url, last_seen: member.last_seen });
  };

  const handleJoinTopic = (topic: Topic) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setActiveTopic(topic);
  };

  const filteredMembers = members.filter((m) => m.first_name?.toLowerCase().includes(memberSearchQuery.toLowerCase()) || m.last_name?.toLowerCase().includes(memberSearchQuery.toLowerCase()) || m.username?.toLowerCase().includes(memberSearchQuery.toLowerCase()));

  const filteredTopics = topics.filter((t) => 
    t.title.toLowerCase().includes(topicSearchQuery.toLowerCase()) ||
    t.description?.toLowerCase().includes(topicSearchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(topicSearchQuery.toLowerCase())
  );

  const categories = [
    { id: "ai-ml", name: "Artificial Intelligence & Machine Learning", description: "Discuss the latest in AI research, machine learning models, and their applications.", icon: "🤖", topics: 156, posts: 2341 },
    { id: "web-dev", name: "Web Development", description: "Everything about frontend, backend, and full-stack web development.", icon: "🌐", topics: 234, posts: 4521 },
    { id: "mobile", name: "Mobile Development", description: "iOS, Android, React Native, Flutter, and cross-platform development.", icon: "📱", topics: 89, posts: 1234 },
    { id: "career", name: "Career & Job Hunting", description: "Share tips, ask questions, and help each other land dream tech jobs.", icon: "💼", topics: 67, posts: 892 },
  ];

  const recentTopics = [
    { id: 1, title: "GPT-4 and Its Implications for Software Development", category: "AI & ML", author: "Alex Johnson", authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80", date: "2 hours ago", replies: 24, views: 156 },
    { id: 2, title: "Best practices for React Server Components", category: "Web Dev", author: "Sarah Mwangi", authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", date: "5 hours ago", replies: 18, views: 234 },
    { id: 3, title: "How to prepare for FAANG interviews?", category: "Career", author: "John Ominde", authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", date: "1 day ago", replies: 45, views: 567 },
  ];

  return (
    <div>
      <PageHeader title="Discussion Forums" description="Join conversations on cutting-edge technologies and connect with fellow tech enthusiasts">
        <div className="relative max-w-md mx-auto">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input type="search" placeholder="Search discussions..." className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70" />
        </div>
      </PageHeader>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <Tabs defaultValue="topics">
            <TabsList className="mb-8">
              <TabsTrigger value="topics"><MessageSquare className="w-4 h-4 mr-2" />Group Topics</TabsTrigger>
              <TabsTrigger value="members"><Users className="w-4 h-4 mr-2" />Members</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            <TabsContent value="topics">
              <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input 
                    placeholder="Search topics..." 
                    value={topicSearchQuery} 
                    onChange={(e) => setTopicSearchQuery(e.target.value)} 
                    className="pl-10" 
                  />
                </div>
                {user && <CreateTopicDialog onTopicCreated={fetchTopics} />}
              </div>

              {loadingTopics ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
              ) : filteredTopics.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No discussions yet</h3>
                  <p className="text-muted-foreground mb-4">Be the first to start a group discussion!</p>
                  {user ? (
                    <CreateTopicDialog onTopicCreated={fetchTopics} />
                  ) : (
                    <Button onClick={() => navigate("/auth")}>Sign in to create a topic</Button>
                  )}
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredTopics.map((topic) => (
                    <TopicCard key={topic.id} topic={topic} onJoin={handleJoinTopic} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="members">
              <div className="relative mb-8 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input placeholder="Search members..." value={memberSearchQuery} onChange={(e) => setMemberSearchQuery(e.target.value)} className="pl-10" />
              </div>
              {loadingMembers ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMembers.map((member) => (
                    <MemberCard key={member.id} member={member} currentUserId={user?.id || ''} onStartChat={handleStartChat} isOnline={isUserOnline(member.user_id)} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="categories">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => (
                  <Link key={category.id} to={`/discussion/${category.id}`} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{category.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-techblue transition-colors mb-2">{category.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {category.topics} topics</span>
                          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {category.posts} posts</span>
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
                  <Link key={topic.id} to={`/discussion/topic/${topic.id}`} className={`flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors ${index !== recentTopics.length - 1 ? "border-b" : ""}`}>
                    <img src={topic.authorImage} alt={topic.author} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 hover:text-techblue transition-colors">{topic.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>{topic.author}</span><span>·</span><span className="bg-techblue/10 text-techblue px-2 py-0.5 rounded text-xs">{topic.category}</span><span>·</span><span>{topic.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4" /> {topic.replies}</span>
                      <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {topic.views}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center bg-primary/5 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Have a question or idea?</h3>
            <p className="text-muted-foreground mb-6">Start a new discussion and get insights from the community.</p>
            {user ? (
              <CreateTopicDialog onTopicCreated={fetchTopics} />
            ) : (
              <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign in to Start Discussion
              </Button>
            )}
          </div>
        </div>
      </section>

      {activeChatPartner && user && <ChatWindow currentUserId={user.id} partner={activeChatPartner} onClose={() => setActiveChatPartner(null)} isPartnerOnline={isUserOnline(activeChatPartner.user_id)} />}
      
      {activeTopic && user && <TopicChatWindow topic={activeTopic} currentUserId={user.id} onClose={() => setActiveTopic(null)} />}
    </div>
  );
};

export default DiscussionPage;
