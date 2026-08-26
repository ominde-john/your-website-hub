import React from "react";
import { Channel } from "./types";

interface ChannelItemProps {
  channel: Channel;
  onClick: () => void;
}

const ChannelItem: React.FC<ChannelItemProps> = ({ channel, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
            {channel.name}
          </span>
        </div>
        {channel.unreadCount > 0 && (
          <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded-full">
            {channel.unreadCount}
          </span>
        )}
      </div>
      {channel.lastMessage && (
        <p className="text-xs text-slate-500 mt-1 truncate">
          {channel.lastMessage}
        </p>
      )}
    </button>
  );
};

export default ChannelItem;

