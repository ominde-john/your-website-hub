import React, { useRef, useEffect, useState } from "react";
import { Message } from "./types";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { 
  Video, Phone, MoreVertical, Search, Users, Hash, 
  Shield, Lock, Info, Code, FileText, Plus, Settings, ChevronDown
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
}

const Chat: React.FC<ChatProps> = ({
  messages,
  currentUserId,
  messageText,
  onMessageChange,
  onSendMessage,
  conversationName,
  isGroup = false,
  members = 0
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
    <main className="flex-1 flex flex-col bg-white min-h-0 overflow-hidden relative">
      {/* Background Mesh Gradient - Subtle UI Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-50/20 via-white to-slate-50/50 pointer-events-none" />

      {/* --- Header Section --- */}
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between shrink-0 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <div className={`relative flex items-center justify-center w-12 h-12 rounded-2xl shadow-sm transition-transform hover:scale-105 cursor-pointer ${
            isGroup 
              ? "bg-gradient-to-tr from-blue-600 to-indigo-400" 
              : "bg-gradient-to-tr from-emerald-500 to-teal-400"
          }`}>
            {isGroup ? <Users className="w-6 h-6 text-white" /> : <Hash className="w-6 h-6 text-white" />}
            {!isGroup && <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full" />}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{conversationName}</h2>
              <ChevronDown className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
            <div className="flex items-center gap-2 h-4">
               {isTyping ? (
                <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-xs">
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  Someone is typing
                </div>
              ) : (
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  {isGroup ? <><Users className="w-3 h-3"/> {members} active contributors</> : "Ready to collaborate"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <HeaderAction icon={<Search />} label="Search" />
          <div className="w-px h-6 bg-slate-200 mx-2" />
          <HeaderAction icon={<Phone />} label="Voice Call" />
          <HeaderAction icon={<Video />} label="Video Call" />
          <HeaderAction 
            icon={<Info />} 
            label="Details" 
            isActive={showInfo} 
            onClick={() => setShowInfo(!showInfo)} 
          />
          <button className="ml-2 p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* --- Info Context Bar --- */}
      {showInfo && (
        <div className="bg-slate-900 text-white px-8 py-3 flex items-center justify-between animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-blue-400 font-bold">
              <Shield className="w-4 h-4" /> End-to-end Encrypted
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Channel visibility: <strong className="text-white">Admin Only</strong></span>
          </div>
          <button onClick={() => setShowInfo(false)} className="text-xs hover:underline text-slate-400">Dismiss</button>
        </div>
      )}

      {/* --- Messages Viewport --- */}
      <div className="flex-1 min-h-0 overflow-y-auto px-8 py-10 relative scroll-smooth custom-scrollbar">
        <div className="max-w-5xl mx-auto space-y-8">
          
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
      <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
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

const HeaderAction = ({ icon, label, onClick, isActive }: any) => (
  <button 
    onClick={onClick}
    className={`p-2.5 rounded-xl transition-all duration-200 group relative ${
      isActive ? "bg-blue-100 text-blue-600" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    }`}
  >
    {React.cloneElement(icon, { className: "w-5 h-5" })}
    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
      {label}
    </span>
  </button>
);

const EmptyState = ({ conversationName }: { conversationName: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-700">
    <div className="w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-[2rem] flex items-center justify-center mb-8 border-2 border-dashed border-blue-200">
      <Code className="w-10 h-10 text-blue-600" />
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-3">Begin the collaboration</h3>
    <p className="text-slate-500 max-w-sm mx-auto mb-10 leading-relaxed">
      Welcome to <span className="font-bold text-slate-800">#{conversationName}</span>. Send a message to start sharing insights with your team.
    </p>
    <div className="flex gap-4">
      <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-xl transition-all hover:-translate-y-1">
        <Plus className="w-4 h-4" /> Start Discussion
      </button>
      <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all">
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