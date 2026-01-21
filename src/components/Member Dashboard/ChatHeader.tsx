import React, { useState } from "react";
import { 
  Phone, 
  Video, 
  Star, 
  MoreVertical, 
  Search, 
  Users, 
  Info, 
  Settings,
  Hash,
  Shield,
  Lock,
  Bell,
  BellOff,
  Pin,
  Archive,
  AtSign,
  ExternalLink,
  ChevronDown,
  MessageSquare
} from "lucide-react";
import { User } from "./types";

interface ChatHeaderProps {
  selectedUser: User | undefined;
  isGroup?: boolean;
  members?: number;
  isMuted?: boolean;
  onToggleMute?: () => void;
  onViewInfo?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  selectedUser, 
  isGroup = false,
  members = 0,
  isMuted = false,
  onToggleMute,
  onViewInfo
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  return (
    <header className="h-16 px-6 bg-gradient-to-r from-white to-amber-50/30 border-b border-slate-200 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`relative rounded-xl overflow-hidden ${
              isGroup 
                ? "bg-gradient-to-br from-amber-100 to-yellow-100 p-2" 
                : ""
            }`}>
              <img
                src={selectedUser?.avatar}
                alt={selectedUser?.name}
                className={`${isGroup ? "w-8 h-8" : "w-10 h-10"} rounded-xl object-cover`}
              />
              {!isGroup && (
                <div
                  className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                    selectedUser?.online ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                  }`}
                ></div>
              )}
            </div>
            {isGroup && (
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-techgold rounded-full border-2 border-white flex items-center justify-center">
                <Users className="w-2 h-2 text-white" />
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">
                {isGroup ? "#" : ""}{selectedUser?.name}
              </h3>
              {isGroup && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                  {members} members
                </span>
              )}
              {!isGroup && selectedUser?.role && (
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                  {selectedUser.role}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-0.5">
              {isGroup ? (
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Shield className="w-3 h-3" />
                  <span>Tech community channel</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      selectedUser?.online ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                    }`}></div>
                    <span className="text-slate-500">
                      {selectedUser?.online ? "Active now • " : "Last seen "}
                      {selectedUser?.online ? "Typing..." : "2 hours ago"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {!isGroup && (
          <>
            <button className="w-9 h-9 rounded-lg hover:bg-amber-50 flex items-center justify-center text-slate-600 hover:text-techgold transition-all duration-200 group relative">
              <Phone className="w-5 h-5" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Voice Call
              </div>
            </button>
            
            <button className="w-9 h-9 rounded-lg hover:bg-amber-50 flex items-center justify-center text-slate-600 hover:text-techgold transition-all duration-200 group relative">
              <Video className="w-5 h-5" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Video Call
              </div>
            </button>
          </>
        )}
        
        <button 
          onClick={() => setIsStarred(!isStarred)}
          className="w-9 h-9 rounded-lg hover:bg-amber-50 flex items-center justify-center text-slate-600 hover:text-techgold transition-all duration-200 group relative"
        >
          <Star className={`w-5 h-5 ${isStarred ? "fill-amber-400 text-amber-400" : ""}`} />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isStarred ? "Unstar" : "Star conversation"}
          </div>
        </button>
        
        {onToggleMute && (
          <button 
            onClick={onToggleMute}
            className="w-9 h-9 rounded-lg hover:bg-amber-50 flex items-center justify-center text-slate-600 hover:text-techgold transition-all duration-200 group relative"
          >
            {isMuted ? <BellOff className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {isMuted ? "Unmute" : "Mute"} notifications
            </div>
          </button>
        )}
        
        <button className="w-9 h-9 rounded-lg hover:bg-amber-50 flex items-center justify-center text-slate-600 hover:text-techgold transition-all duration-200 group relative">
          <Search className="w-5 h-5" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Search messages
          </div>
        </button>
        
        <div className="w-px h-6 bg-slate-200 mx-1"></div>
        
        <div className="relative">
          <button 
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="w-9 h-9 rounded-lg hover:bg-amber-50 flex items-center justify-center text-slate-600 hover:text-techgold transition-all duration-200"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          
          {/* More Menu Dropdown */}
          {showMoreMenu && (
            <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50">
              <div className="p-2">
                {onViewInfo && (
                  <button 
                    onClick={onViewInfo}
                    className="w-full px-3 py-2.5 text-sm text-slate-700 hover:bg-amber-50 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <Info className="w-4 h-4 text-techgold" />
                    <span>View {isGroup ? "channel" : "user"} info</span>
                  </button>
                )}
                
                <button className="w-full px-3 py-2.5 text-sm text-slate-700 hover:bg-amber-50 rounded-lg flex items-center gap-3 transition-colors">
                  <Pin className="w-4 h-4 text-amber-600" />
                  <span>Pin conversation</span>
                </button>
                
                <button className="w-full px-3 py-2.5 text-sm text-slate-700 hover:bg-amber-50 rounded-lg flex items-center gap-3 transition-colors">
                  <Archive className="w-4 h-4 text-slate-600" />
                  <span>Archive chat</span>
                </button>
                
                <div className="my-2 border-t border-slate-100"></div>
                
                <button className="w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-3 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>Mark as spam</span>
                </button>
                
                <button className="w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-3 transition-colors">
                  <Lock className="w-4 h-4" />
                  <span>Block user</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;