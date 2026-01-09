import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Shield, User, Crown } from "lucide-react";
import { formatLastSeen } from "@/hooks/useOnlinePresence";

interface MemberCardProps {
  member: {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    username: string;
    avatar_url?: string;
    role: 'admin' | 'moderator' | 'user';
    last_seen?: string | null;
  };
  currentUserId: string;
  onStartChat: (memberId: string) => void;
  unreadCount?: number;
  isOnline?: boolean;
}

const roleIcons = {
  admin: Crown,
  moderator: Shield,
  user: User,
};

const roleColors = {
  admin: "bg-techgold text-background",
  moderator: "bg-primary text-primary-foreground",
  user: "bg-muted text-muted-foreground",
};

const MemberCard = ({ member, currentUserId, onStartChat, unreadCount = 0, isOnline = false }: MemberCardProps) => {
  const RoleIcon = roleIcons[member.role];
  const isCurrentUser = member.user_id === currentUserId;
  const initials = `${member.first_name?.[0] || ''}${member.last_name?.[0] || ''}`.toUpperCase() || 'U';

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-14 w-14 border-2 border-primary/20">
              <AvatarImage src={member.avatar_url || undefined} alt={member.first_name} />
              <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* Online indicator */}
            <span 
              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${
                isOnline ? 'bg-green-500' : 'bg-gray-400'
              }`}
              title={isOnline ? 'Online' : `Last seen: ${formatLastSeen(member.last_seen)}`}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">
                {member.first_name} {member.last_name}
              </h3>
              {isCurrentUser && (
                <Badge variant="outline" className="text-xs">You</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{member.username}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={`text-xs ${roleColors[member.role]}`}>
                <RoleIcon className="w-3 h-3 mr-1" />
                {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
              </Badge>
              <span className={`text-xs ${isOnline ? 'text-green-500' : 'text-muted-foreground'}`}>
                {isOnline ? 'Online' : formatLastSeen(member.last_seen)}
              </span>
            </div>
          </div>
          
          {!isCurrentUser && (
            <Button 
              size="sm" 
              onClick={() => onStartChat(member.user_id)}
              className="bg-primary hover:bg-primary/90"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Chat
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
