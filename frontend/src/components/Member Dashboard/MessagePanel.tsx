import React, { useState } from "react";
import { Search, Settings, X, ArrowLeft } from "lucide-react";
import { Conversation } from "./types";

interface MessagePanelProps {
  conversations: Conversation[];
  selectedConversationId: string;
  onConversationSelect: (id: string) => void;
  currentUser: {
    id?: string;
    name: string;
    role: string;
    avatar: string;
  };
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const MessagePanel: React.FC<MessagePanelProps> = ({
  conversations,
  selectedConversationId,
  onConversationSelect,
  currentUser,
  isMobileOpen = false,
  onMobileClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationSelect = (id: string) => {
    onConversationSelect(id);
    // Close panel on mobile after selecting a conversation
    // On desktop, this has no visual effect since the panel is always visible
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}
      
      <aside className={`
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:relative z-50 md:z-auto
        w-[85vw] max-w-[320px] md:w-80
        bg-slate-50 border-r border-slate-200 
        flex flex-col h-full md:h-screen
        transition-transform duration-300 ease-in-out
        top-0 left-0 bottom-0
      `}>
      {/* User Profile Header */}
      <div className="p-4 md:p-5 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between mb-4 md:mb-5">
          {/* Mobile close button */}
          <button 
            onClick={onMobileClose}
            className="p-2 -ml-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative group cursor-pointer flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-teal-500 transition-all"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`;
                }}
              />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-slate-900 text-sm leading-tight truncate">{currentUser.name}</h2>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-tighter truncate">
                {currentUser.role}
              </p>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Search with Improved Focus State */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      {/* Conversations Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 md:pb-4">
        {/* Private Messages Section */}
        <div className="mt-4 px-3 pb-4">
          <div className="flex items-center justify-between px-3 mb-2">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Direct Messages
            </h3>
            <span className="text-[10px] font-semibold text-slate-400">
              {filteredConversations.length}
            </span>
          </div>
          
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              {searchQuery ? "No conversations found" : "No conversations yet. Start chatting with members!"}
            </div>
          ) : (
            <div className="space-y-0.5">
              {filteredConversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  isActive={selectedConversationId === conv.id}
                  onClick={() => handleConversationSelect(conv.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
    </>
  );
};

/* Sub-component for Cleaner Code */
interface ConversationItemProps {
  conv: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem = ({ conv, isActive, onClick }: ConversationItemProps) => (
  <button
    onClick={onClick}
    className={`w-full group flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative ${
      isActive 
        ? "bg-white shadow-sm ring-1 ring-slate-200" 
        : "hover:bg-slate-200/50"
    }`}
  >
    {/* Active Indicator Bar */}
    {isActive && (
      <div className="absolute left-0 w-1 h-6 bg-teal-500 rounded-r-full" />
    )}

    <div className="relative flex-shrink-0">
      <img
        src={conv.avatar}
        alt={conv.name}
        className="w-10 h-10 rounded-xl object-cover shadow-sm"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${conv.name}`;
        }}
      />
      {conv.isOnline && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
      )}
    </div>

    <div className="flex-1 overflow-hidden text-left">
      <div className="flex justify-between items-baseline mb-0.5">
        <span className={`text-sm truncate ${isActive ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}>
          {conv.name}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 truncate pr-2 max-w-[160px]">
          {conv.lastMessage || "Click to start chatting..."}
        </p>
        {conv.unreadCount > 0 && (
          <span className="flex-shrink-0 min-w-[18px] h-[18px] px-1 bg-teal-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-teal-500/20">
            {conv.unreadCount}
          </span>
        )}
      </div>
    </div>
  </button>
);

export default MessagePanel;
