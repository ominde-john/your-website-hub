import React, { useRef, useEffect, useState } from "react";
import { Message } from "./types";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { 
  Video, Phone, MoreVertical, Search, Users, Hash, 
  Shield, Lock, Info, Code, FileText, Plus, Settings, ChevronDown, Menu
} from "lucide-react";

interface ChatProps {
  messages: Message[];
  currentUserId: string;
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  conversationName: string;
  isGroup?: boolean;
  members?: number;
  onMobileMenuOpen?: () => void;
}

const Chat: React.FC<ChatProps> = ({
  messages,
  currentUserId,
  messageText,
  onMessageChange,
  onSendMessage,
  conversationName,
  isGroup = false,
  members = 0,
  onMobileMenuOpen
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  // Auto-scroll to bottom with logic to prevent jumping
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <main className="flex-1 flex flex-col bg-white min-h-0 overflow-hidden relative pb-16 md:pb-0">
      {/* Background Mesh Gradient - Subtle UI Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-amber-50/20 via-white to-slate-50/50 pointer-events-none" />

      {/* --- Header Section --- */}
      <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-3 md:px-8 flex items-center justify-between shrink-0 z-10 sticky top-0">
        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
          {/* Mobile menu button */}
          {onMobileMenuOpen && (
            <button 
              onClick={onMobileMenuOpen}
              className="p-2 -ml-1 text-slate-600 hover:bg-slate-100 rounded-xl transition-all md:hidden flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          <div className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl shadow-sm transition-transform hover:scale-105 cursor-pointer flex-shrink-0 ${
            isGroup 
              ? "bg-gradient-to-tr from-techgold to-amber-400" 
              : "bg-gradient-to-tr from-emerald-500 to-teal-400"
          }`}>
            {isGroup ? <Users className="w-5 h-5 md:w-6 md:h-6 text-white" /> : <Hash className="w-5 h-5 md:w-6 md:h-6 text-white" />}
            {!isGroup && <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 md:border-4 border-white rounded-full" />}
          </div>
          
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1 md:gap-2 min-w-0">
              <h2 className="text-base md:text-xl font-extrabold text-slate-900 tracking-tight truncate">{conversationName}</h2>
              <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-slate-400 cursor-pointer hover:text-slate-600 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-2 h-4">
               {isTyping ? (
                <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-xs">
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="hidden sm:inline">Someone is typing</span>
                </div>
              ) : (
                <span className="text-[10px] md:text-xs font-medium text-slate-500 flex items-center gap-1.5 truncate">
                  {isGroup ? <><Users className="w-3 h-3"/> {members} active</> : "Ready"}
                  <span className="hidden md:inline">{isGroup ? " contributors" : " to collaborate"}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          <HeaderAction icon={<Search />} label="Search" className="hidden sm:flex" />
          <div className="w-px h-6 bg-slate-200 mx-1 md:mx-2 hidden sm:block" />
          <HeaderAction icon={<Phone />} label="Voice Call" className="hidden md:flex" />
          <HeaderAction icon={<Video />} label="Video Call" />
          <HeaderAction 
            icon={<Info />} 
            label="Details" 
            isActive={showInfo} 
            onClick={() => setShowInfo(!showInfo)} 
            className="hidden sm:flex"
          />
          <button className="ml-1 md:ml-2 p-2 md:p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
            <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </header>

      {/* --- Info Context Bar --- */}
      {showInfo && (
        <div className="bg-slate-900 text-white px-8 py-3 flex items-center justify-between animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-techgold font-bold">
              <Shield className="w-4 h-4" /> End-to-end Encrypted
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Channel visibility: <strong className="text-white">Admin Only</strong></span>
          </div>
          <button onClick={() => setShowInfo(false)} className="text-xs hover:underline text-slate-400">Dismiss</button>
        </div>
      )}

      {/* --- Messages Viewport --- */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 md:px-8 py-4 md:py-10 relative scroll-smooth custom-scrollbar">
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-8">
          
          {messages.length === 0 ? (
            <EmptyState conversationName={conversationName} />
          ) : (
            messages.map((msg, index) => (
              <MessageWrapper 
                key={msg.id} 
                msg={msg} 
                isMine={msg.senderId === currentUserId} 
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* --- Input Section --- */}
      <div className="p-3 md:p-6 bg-white border-t border-slate-100 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto">
          <MessageInput
            messageText={messageText}
            onMessageChange={onMessageChange}
            onSendMessage={onSendMessage}
            isGroup={isGroup}
          />
        </div>
      </div>
    </main>
  );
};

/* --- Helper Components for Cleanliness --- */

const HeaderAction = ({ icon, label, onClick, isActive, className = "" }: any) => (
  <button 
    onClick={onClick}
    className={`p-2 md:p-2.5 rounded-xl transition-all duration-200 group relative ${
      isActive ? "bg-amber-100 text-techgold" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    } ${className}`}
  >
    {React.cloneElement(icon, { className: "w-4 h-4 md:w-5 md:h-5" })}
    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 hidden md:block">
      {label}
    </span>
  </button>
);

const EmptyState = ({ conversationName }: { conversationName: string }) => (
  <div className="flex flex-col items-center justify-center py-10 md:py-20 text-center animate-in fade-in zoom-in duration-700 px-4">
    <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-techgold/10 to-amber-500/10 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-4 md:mb-8 border-2 border-dashed border-amber-200">
      <Code className="w-6 h-6 md:w-10 md:h-10 text-techgold" />
    </div>
    <h3 className="text-lg md:text-2xl font-black text-slate-900 mb-2 md:mb-3">Begin the collaboration</h3>
    <p className="text-slate-500 max-w-sm mx-auto mb-6 md:mb-10 leading-relaxed text-sm md:text-base">
      Welcome to <span className="font-bold text-slate-800">#{conversationName}</span>. Send a message to start sharing insights.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
      <button className="flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-slate-900 text-white rounded-xl md:rounded-2xl font-bold hover:shadow-xl transition-all hover:-translate-y-1 text-sm md:text-base">
        <Plus className="w-4 h-4" /> Start Discussion
      </button>
      <button className="flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white border border-slate-200 text-slate-700 rounded-xl md:rounded-2xl font-bold hover:bg-slate-50 transition-all text-sm md:text-base">
        <FileText className="w-4 h-4" /> Browse Docs
      </button>
    </div>
  </div>
);

const MessageWrapper = ({ msg, isMine }: { msg: Message, isMine: boolean }) => (
  <div className={`flex ${isMine ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}>
    <MessageBubble message={msg} isMine={isMine} />
  </div>
);

export default Chat;