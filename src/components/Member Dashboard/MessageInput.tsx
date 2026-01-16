import React from "react";
import { Send, Link, Plus, Smile, Mic } from "lucide-react";

interface MessageInputProps {
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ messageText, onMessageChange, onSendMessage }) => {
  return (
    <div className="border-t border-slate-200 bg-white px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={messageText}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSendMessage();
              }
            }}
            placeholder="Message..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
          
          <button className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
            <Link className="w-5 h-5" />
          </button>
          
          <button className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          
          <button className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
            <Smile className="w-5 h-5" />
          </button>
          
          <button className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
            <Mic className="w-5 h-5" />
          </button>

          <button
            onClick={onSendMessage}
            disabled={!messageText.trim()}
            className="w-10 h-10 rounded-full bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;