import React from "react";
import { Phone, Video, Star, MoreVertical } from "lucide-react";
import { User } from "./types";

interface ChatHeaderProps {
  selectedUser: User | undefined;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedUser }) => {
  return (
    <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser?.avatar}
              alt={selectedUser?.name}
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                selectedUser?.online ? "bg-green-500" : "bg-slate-300"
              }`}
            ></div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{selectedUser?.name}</h3>
            <p className="text-xs text-slate-500">
              {selectedUser?.online ? "Active now" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
          <Phone className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
          <Video className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
          <Star className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-slate-200 mx-1"></div>
        <button className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
