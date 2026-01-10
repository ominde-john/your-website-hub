import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Users, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface Topic {
  id: string;
  title: string;
  description?: string;
  category: string;
  created_by: string;
  created_at: string;
}

interface TopicCardProps {
  topic: Topic;
  onJoin: (topic: Topic) => void;
}

const getCategoryInfo = (category: string) => {
  const categories: Record<string, { label: string; icon: string; color: string }> = {
    general: { label: "General", icon: "💬", color: "bg-gray-100 text-gray-700" },
    "ai-ml": { label: "AI & ML", icon: "🤖", color: "bg-purple-100 text-purple-700" },
    "web-dev": { label: "Web Dev", icon: "🌐", color: "bg-blue-100 text-blue-700" },
    mobile: { label: "Mobile", icon: "📱", color: "bg-green-100 text-green-700" },
    career: { label: "Career", icon: "💼", color: "bg-amber-100 text-amber-700" },
    projects: { label: "Projects", icon: "🚀", color: "bg-rose-100 text-rose-700" },
    help: { label: "Help", icon: "❓", color: "bg-cyan-100 text-cyan-700" },
  };
  return categories[category] || categories.general;
};

const TopicCard = ({ topic, onJoin }: TopicCardProps) => {
  const [creator, setCreator] = useState<{
    first_name: string;
    last_name: string;
    avatar_url?: string;
  } | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const [participantCount, setParticipantCount] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      // Fetch creator profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name, avatar_url")
        .eq("user_id", topic.created_by)
        .maybeSingle();

      if (profile) setCreator(profile);

      // Fetch message stats
      const { data: messages } = await supabase
        .from("topic_messages")
        .select("sender_id")
        .eq("topic_id", topic.id);

      if (messages) {
        setMessageCount(messages.length);
        setParticipantCount(new Set(messages.map((m) => m.sender_id)).size);
      }
    };

    fetchDetails();
  }, [topic.id, topic.created_by]);

  const categoryInfo = getCategoryInfo(topic.category);

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all group">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        <div className="text-2xl sm:text-3xl hidden sm:block">{categoryInfo.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${categoryInfo.color}`}>
              {categoryInfo.label}
            </span>
          </div>
          <h3 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {topic.title}
          </h3>
          {topic.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {topic.description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={creator?.avatar_url || undefined} />
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                    {creator?.first_name?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
                <span>{creator?.first_name}</span>
              </div>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {messageCount}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {participantCount}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
              </span>
            </div>
            <Button
              size="sm"
              onClick={() => onJoin(topic)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
            >
              Join Discussion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
