import React, { useState, useRef } from "react";
import { Send, Paperclip, Mic, StopCircle } from "lucide-react";

interface MessageInputProps {
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  isGroup?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  messageText, 
  onMessageChange, 
  onSendMessage,
  isGroup = false 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout>();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      let time = 0;
      recordingTimerRef.current = setInterval(() => {
        time += 1;
        setRecordingTime(time);
      }, 1000);
    } else {
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      setRecordingTime(0);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="px-2 md:px-6 py-2 md:py-4">
      <div className="max-w-4xl mx-auto">
        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex items-center justify-between mb-2 md:mb-3 p-2 md:p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100 shadow-sm">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <Mic className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div className="absolute -inset-1 bg-red-500 rounded-full opacity-20 animate-ping"></div>
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-red-700">Recording</p>
                <p className="text-[10px] md:text-xs text-red-600">{formatTime(recordingTime)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleRecording}
                className="px-2 md:px-3 py-1 md:py-1.5 bg-white border border-red-300 text-red-700 text-xs md:text-sm font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1 md:gap-2"
              >
                <StopCircle className="w-3 h-3 md:w-4 md:h-4" />
                Stop
              </button>
            </div>
          </div>
        )}

        {/* Main Input Area */}
        <div className="flex items-end gap-1.5 md:gap-3">
          {/* Attachment Button */}
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleFileUpload}
              className="p-1.5 md:p-2 text-slate-500 hover:text-techgold hover:bg-amber-50 rounded-lg transition-all duration-200 group relative"
            >
              <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                Attach file
              </div>
            </button>
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              value={messageText}
              onChange={(e) => onMessageChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isGroup ? "Message #channel..." : "Type your message here..."}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white border-2 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-techgold/20 focus:border-techgold transition-all duration-300 resize-none min-h-[40px] md:min-h-[44px] max-h-[100px] md:max-h-[120px] scrollbar-thin shadow-sm"
              rows={1}
            />
            
            {/* Character Counter - hidden on mobile */}
            <div className={`absolute bottom-2 right-2 text-xs hidden md:block ${
              messageText.length > 1800 ? 'text-red-500' : 
              messageText.length > 1500 ? 'text-amber-500' : 'text-slate-400'
            }`}>
              {messageText.length}/2000
            </div>
          </div>

          {/* Voice Message Button - hidden on smaller mobile */}
          <div className="flex-col gap-2 hidden sm:flex">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".txt,.pdf,.js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.cs,.go,.rb,.php,.rs,.swift,.kt,.png,.jpg,.jpeg,.gif,.mp4,.mov"
              multiple
            />
            
            <button 
              onClick={toggleRecording}
              className={`p-1.5 md:p-2 rounded-lg transition-all duration-200 group relative ${
                isRecording 
                  ? "bg-red-100 text-red-600" 
                  : "text-slate-500 hover:text-techgold hover:bg-amber-50"
              }`}
            >
              <Mic className="w-4 h-4 md:w-5 md:h-5" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                Voice message
              </div>
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={onSendMessage}
            disabled={!messageText.trim()}
            className="p-2.5 md:p-3 rounded-xl bg-gradient-to-r from-techgold to-amber-600 hover:from-techgold-dark hover:to-amber-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-techgold/20 flex items-center justify-center group"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Simple Keyboard Hint - hidden on mobile */}
        <div className="hidden md:flex justify-end mt-2">
          <div className="text-xs text-slate-400">
            Press <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Enter</kbd> to send
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;