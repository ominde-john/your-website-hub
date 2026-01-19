import React, { useState } from "react";
import {
  mockBookings,
  mockStats,
  mockCurrentUser,
  mockConversations,
  mockMessages,
  mockProfile
} from "./mockData";
import { Sidebar } from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import MessagePanel from "./MessagePanel";
import Chat from "./Chat";
import Profile from "./Profile";
import { Message } from "./types";
import Dashboard from "./Dashboard";

const MemberDashboard = () => {
  const [activeNav, setActiveNav] = useState("messages");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState("u-4");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [messageText, setMessageText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: mockCurrentUser.id,
      senderName: "David Whyte",
      text: messageText,
      timestamp:
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }) +
        " " +
        (new Date().getHours() >= 12 ? "pm" : "am"),
      read: true
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");
  };

  const selectedConversation = mockConversations.find(
    (c) => c.id === selectedConversationId
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* CONTENT WRAPPER */}
      <div className="flex-1 flex min-h-0">
        {activeNav === "bookings" ? (
          <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <DashboardHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <div className="flex-1 min-h-0 overflow-y-auto">
              <DashboardContent
                stats={mockStats}
                bookings={mockBookings}
              />
            </div>
          </main>
        ) : activeNav === "messages" ? (
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <MessagePanel
              conversations={mockConversations}
              selectedConversationId={selectedConversationId}
              onConversationSelect={setSelectedConversationId}
              currentUser={mockCurrentUser}
            />
            <Chat
              messages={messages}
              currentUserId={mockCurrentUser.id}
              messageText={messageText}
              onMessageChange={setMessageText}
              onSendMessage={handleSendMessage}
              conversationName={
                selectedConversation?.name || "Messages"
              }
            />
          </div>
        ) : activeNav === "profile" ? (
          <div className="flex-1 min-h-0 overflow-y-auto">
            <Profile
              profile={mockProfile}
              onUpdate={(updatedProfile) => {}}
            />
          </div>
        )
         : activeNav === "dashboard" ? (
          <div className="flex-1 min-h-0 overflow-y-auto">
            <Dashboard
              profile={mockProfile}
              onUpdate={(updatedProfile) => {}}
            />
          </div>
          ) : (
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {activeNav.charAt(0).toUpperCase() +
                  activeNav.slice(1)}
              </h2>
              <p className="text-slate-500">
                This section is coming soon
              </p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;
