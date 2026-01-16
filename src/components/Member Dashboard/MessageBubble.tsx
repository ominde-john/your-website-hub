import React from "react";
import { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
  isMine: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isMine }) => {
  const avatar = isMine 
    ? "https://i.pravatar.cc/40?img=1"
    : "https://i.pravatar.cc/40?img=3";

  return (
    <div className={`flex gap-3 ${isMine ? "flex-row-reverse" : "flex-row"}`}>
      <img
        src={avatar}
        alt={message.senderName}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className={`flex flex-col ${isMine ? "items-end" : "items-start"} max-w-xl`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-slate-700">
            {message.senderName}
          </span>
          <span className="text-xs text-slate-400">{message.timestamp}</span>
        </div>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isMine
              ? "bg-teal-500 text-white rounded-tr-sm"
              : "bg-slate-200 text-slate-800 rounded-tl-sm"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;