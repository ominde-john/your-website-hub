import React, { useRef, useEffect } from "react";
import { Message } from "./types";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

interface ChatProps {
  messages: Message[];
  currentUserId: string;
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  conversationName: string;
}

const Chat: React.FC<ChatProps> = ({
  messages,
  currentUserId,
  messageText,
  onMessageChange,
  onSendMessage,
  conversationName
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex-1 flex flex-col bg-slate-50 min-h-0">
      {/* Chat Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-slate-800">{conversationName}</h2>
        </div>
        <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors">
          + Create new
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg) => {
            const isMine = msg.senderId === currentUserId;
            return (
              <MessageBubble
                key={msg.id}
                message={msg}
                isMine={isMine}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="shrink-0">
        <MessageInput
          messageText={messageText}
          onMessageChange={onMessageChange}
          onSendMessage={onSendMessage}
        />
      </div>
    </main>
  );
};

export default Chat;
