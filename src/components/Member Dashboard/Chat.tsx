import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Paperclip,
  Smile,
  Send,
  MoreVertical,
  Star,
  FolderKanban,
  FileText,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

/* ------------------ TYPES ------------------ */

interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  lastActive: string;
  unreadCount: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

/* ------------------ COMPONENT ------------------ */

const Messages = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* ------------------ AUTH USER ------------------ */
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setCurrentUserId(data.user.id);
    };
    loadUser();
  }, []);

  /* ------------------ FETCH USERS ------------------ */
  useEffect(() => {
    if (!currentUserId) return;

    const fetchUsers = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, is_online, last_seen")
        .neq("id", currentUserId);

      if (!data) return;

      const mapped: User[] = data.map((u) => ({
        id: u.id,
        name: u.full_name,
        avatar: u.avatar_url || "https://i.pravatar.cc/44",
        online: u.is_online,
        lastActive: u.last_seen
          ? new Date(u.last_seen).toLocaleTimeString()
          : "Offline",
        unreadCount: 0,
      }));

      setUsers(mapped);
      if (!selectedUserId && mapped.length > 0) {
        setSelectedUserId(mapped[0].id);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  /* ------------------ FETCH MESSAGES ------------------ */
  useEffect(() => {
    if (!currentUserId || !selectedUserId) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${currentUserId},receiver_id.eq.${selectedUserId}),
           and(sender_id.eq.${selectedUserId},receiver_id.eq.${currentUserId})`
        )
        .order("created_at", { ascending: true });

      if (!data) return;

      setMessages(
        data.map((m) => ({
          id: m.id,
          senderId: m.sender_id,
          text: m.content,
          timestamp: new Date(m.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }))
      );
    };

    fetchMessages();
  }, [currentUserId, selectedUserId]);

  /* ------------------ REALTIME ------------------ */
  useEffect(() => {
    if (!currentUserId || !selectedUserId) return;

    const channel = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const m = payload.new;
          if (
            (m.sender_id === currentUserId &&
              m.receiver_id === selectedUserId) ||
            (m.sender_id === selectedUserId &&
              m.receiver_id === currentUserId)
          ) {
            setMessages((prev) => [
              ...prev,
              {
                id: m.id,
                senderId: m.sender_id,
                text: m.content,
                timestamp: new Date(m.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, selectedUserId]);

  /* ------------------ SEND MESSAGE ------------------ */
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageText.trim() || !currentUserId || !selectedUserId) return;

    await supabase.from("messages").insert({
      sender_id: currentUserId,
      receiver_id: selectedUserId,
      content: messageText,
    });

    setMessageText("");
  };

  /* ------------------ SCROLL ------------------ */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ------------------ FILTER ------------------ */
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedUser = users.find((u) => u.id === selectedUserId);

  /* ------------------ UI ------------------ */
  return (
    <div className="flex h-[90vh] max-w-7xl mx-auto overflow-hidden bg-white border border-slate-200 shadow-2xl rounded-2xl m-4">
      {/* SIDEBAR */}
      <aside
        className={cn(
          "bg-slate-50 border-r border-slate-200 flex flex-col transition-all duration-300",
          isSidebarOpen ? "w-full md:w-80" : "w-0 overflow-hidden"
        )}
      >
        <div className="p-4">
          <h1 className="text-xl font-bold mb-3">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              className="w-full pl-10 py-2 rounded-xl bg-slate-200/60"
              placeholder="Search chats..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              onClick={() => {
                setSelectedUserId(u.id);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl cursor-pointer",
                u.id === selectedUserId
                  ? "bg-white shadow border"
                  : "hover:bg-slate-200/40"
              )}
            >
              <img src={u.avatar} className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <p className="font-semibold text-sm">{u.name}</p>
                <p className="text-xs text-slate-500 truncate">
                  {u.lastActive}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* CHAT */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 px-4 flex items-center justify-between bg-white border-b">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu />
            </Button>
            <span className="font-bold text-sm">{selectedUser?.name}</span>
          </div>
          <MoreVertical />
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-slate-500">
              No messages yet
            </div>
          ) : (
            messages.map((m) => {
              const isMine = m.senderId === currentUserId;
              return (
                <div
                  key={m.id}
                  className={cn("flex", isMine ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "px-4 py-2 rounded-2xl max-w-[70%]",
                      isMine
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white border rounded-tl-none"
                    )}
                  >
                    <p className="text-sm">{m.text}</p>
                    <p className="text-[10px] mt-1 opacity-70">
                      {m.timestamp}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t bg-white flex gap-2"
        >
          <input
            className="flex-1 bg-slate-100 rounded-xl px-4"
            placeholder="Write a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Button type="submit" disabled={!messageText.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Messages;
