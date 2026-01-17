import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, Link as LinkIcon, Check, CheckCheck, MoreHorizontal,
  Copy, ThumbsUp, Reply, Edit, Trash2, Pin, Terminal
} from "lucide-react";

const MessageBubble = ({ message, isMine }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Advanced Detection
  const isCodeSnippet = message.text.includes("```") || message.text.includes("const ") || message.text.includes("import ");
  const cleanText = message.text.replace(/```/g, "");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-4 group mb-6 ${isMine ? "flex-row-reverse" : "flex-row"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. STYLIZED AVATAR */}
      <div className="relative flex-shrink-0 self-end mb-1">
        <div className={`w-9 h-9 rounded-2xl overflow-hidden border-2 transition-transform duration-500 hover:rotate-6 ${
          isMine ? "border-indigo-100" : "border-white shadow-sm"
        }`}>
          <img
            src={isMine ? "https://i.pravatar.cc/100?img=11" : "https://i.pravatar.cc/100?img=32"}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {!isMine && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
        )}
      </div>

      {/* 2. MESSAGE CONTENT AREA */}
      <div className={`flex flex-col ${isMine ? "items-end" : "items-start"} max-w-[75%]`}>
        
        {/* SENDER INFO PILL */}
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {isMine ? "You" : message.senderName}
          </span>
          <span className="text-[10px] text-slate-300">•</span>
          <span className="text-[10px] text-slate-400 font-medium">{message.timestamp}</span>
        </div>

        {/* 3. THE BUBBLE */}
        <div className="relative">
          <div
            className={`px-5 py-3 rounded-[2rem] shadow-sm transition-all duration-300 ${
              isMine
                ? "bg-indigo-600 text-white rounded-br-none shadow-indigo-100 hover:shadow-indigo-200"
                : "bg-white text-slate-700 rounded-bl-none border border-slate-100 hover:border-indigo-100"
            } ${isCodeSnippet ? "w-full min-w-[300px]" : ""}`}
          >
            {isCodeSnippet ? (
              <div className="rounded-xl overflow-hidden">
                <div className={`flex items-center justify-between px-3 py-2 ${isMine ? 'bg-indigo-700/50' : 'bg-slate-50 border-b border-slate-100'}`}>
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className={isMine ? "text-indigo-200" : "text-indigo-500"} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isMine ? "text-indigo-100" : "text-slate-500"}`}>Snippet</span>
                  </div>
                  <button className="p-1 hover:bg-white/10 rounded-md transition-colors">
                    <Copy size={12} className={isMine ? "text-indigo-200" : "text-slate-400"} />
                  </button>
                </div>
                <pre className={`p-4 text-xs font-mono overflow-x-auto ${isMine ? 'bg-indigo-900/30' : 'bg-slate-900 text-slate-300'}`}>
                  <code>{cleanText}</code>
                </pre>
              </div>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {message.text}
              </p>
            )}

            {/* FLOATING REACTIONS BOX */}
            <AnimatePresence>
              {isLiked && (
                <motion.div 
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  className="absolute -bottom-3 -right-2 bg-white shadow-md border border-slate-100 rounded-full p-1 flex items-center gap-1"
                >
                  <div className="bg-rose-500 p-1 rounded-full">
                    <ThumbsUp size={10} className="text-white fill-white" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 pr-1">1</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. CONTEXTUAL ACTION TOOLBAR (VISIBLE ON HOVER) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: -45 }}
                exit={{ opacity: 0, y: 5 }}
                className={`absolute ${isMine ? 'right-0' : 'left-0'} flex items-center bg-white shadow-2xl shadow-indigo-200 border border-slate-100 p-1 rounded-2xl z-10`}
              >
                <div className="flex items-center gap-0.5">
                  <ActionButton icon={<ThumbsUp size={14} />} active={isLiked} onClick={() => setIsLiked(!isLiked)} activeClass="text-rose-500 bg-rose-50" />
                  <ActionButton icon={<Reply size={14} />} />
                  <ActionButton icon={<Pin size={14} />} />
                  {isMine && <ActionButton icon={<Edit size={14} />} />}
                  {isMine && <ActionButton icon={<Trash2 size={14} />} danger />}
                  <div className="w-[1px] h-4 bg-slate-100 mx-1" />
                  <ActionButton icon={<MoreHorizontal size={14} />} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. READ RECEIPT & STATUS */}
        {isMine && (
          <div className="flex items-center gap-1 mt-1.5 px-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Delivered</span>
            {message.read ? (
              <CheckCheck className="w-3 h-3 text-indigo-500" />
            ) : (
              <Check className="w-3 h-3 text-slate-300" />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Helper Sub-component
const ActionButton = ({ icon, onClick, active = false, activeClass = "", danger = false }: { 
  icon: React.ReactNode; 
  onClick?: () => void; 
  active?: boolean; 
  activeClass?: string; 
  danger?: boolean; 
}) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-xl transition-all duration-200 ${
      active ? activeClass : 
      danger ? "hover:bg-rose-50 hover:text-rose-500 text-slate-400" : 
      "hover:bg-indigo-50 hover:text-indigo-600 text-slate-400"
    }`}
  >
    {icon}
  </button>
);

export default MessageBubble;