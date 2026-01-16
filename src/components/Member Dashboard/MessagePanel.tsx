import React from "react";
import { Search, Users } from "lucide-react";
import { Conversation } from "./types";

interface MessagePanelProps {
  conversations: Conversation[];
  selectedConversationId: string;
  onConversationSelect: (id: string) => void;
  currentUser: {
    name: string;
    role: string;
    avatar: string;
  };
}

const MessagePanel: React.FC<MessagePanelProps> = ({
  conversations,
  selectedConversationId,
  onConversationSelect,
  currentUser
}) => {
  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col">
      {/* User Profile Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="font-bold text-slate-800">{currentUser.name}</h2>
            <p className="text-xs text-slate-500">{currentUser.role}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Team Messages Section */}
      <div className="px-4 py-3 border-b border-slate-200">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">
          Team messages
        </h3>
        {conversations.slice(0, 2).map((conv) => (
          <button
            key={conv.id}
            onClick={() => onConversationSelect(conv.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              selectedConversationId === conv.id ? "bg-slate-100" : "hover:bg-slate-50"
            }`}
          >
            <Users className="w-5 h-5 text-slate-400" />
            <span className="flex-1 text-left text-sm font-medium text-slate-700">
              {conv.name}
            </span>
            {conv.unreadCount > 0 && (
              <span className="w-5 h-5 bg-teal-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                {conv.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Private Messages Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">
            Private messages
          </h3>
          {conversations.slice(2).map((conv) => (
            <button
              key={conv.id}
              onClick={() => onConversationSelect(conv.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 ${
                selectedConversationId === conv.id ? "bg-slate-100" : "hover:bg-slate-50"
              }`}
            >
              <div className="relative">
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                {conv.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <span className="flex-1 text-left text-sm font-medium text-slate-700">
                {conv.name}
              </span>
              {conv.unreadCount > 0 && (
                <span className="w-5 h-5 bg-teal-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                  {conv.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default MessagePanel;