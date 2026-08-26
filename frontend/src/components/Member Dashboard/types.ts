export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Channel {
  id: string;
  name: string;
  type: "team" | "direct";
  unreadCount: number;
  lastMessage?: string;
}

export interface Booking {
  id: string;
  vehicle: string;
  hiredBy: string;
  orderId: string;
  amount: string;
  location: string;
  date: string;
  status: 'Successful' | 'Error' | 'Cancelled';
  avatar: string;
}

export interface StatCard {
  id: string;
  value: number;
  label: string;
  color: string;
  icon: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface Profile {
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  hasLinkedIn: boolean;
  resumeFile?: {
    name: string;
    uploadedDate: string;
  };
}



export const mockCurrentUser: User = {
  id: "user-1",
  name: "TessyAmaka",
  role: "Admin, Customer Rep",
  avatar: "https://i.pravatar.cc/80?img=1",
  online: true,
  unreadCount: 0,
};

export const mockBookings: Booking[] = [
  {
    id: '1',
    vehicle: 'Ford Raptor',
    hiredBy: 'Jerry Marcos',
    orderId: '#29876',
    amount: '£35.60',
    location: 'Nsukka, Enugu',
    date: '22 Sept, 2023',
    status: 'Successful',
    avatar: 'https://i.pravatar.cc/40?img=12'
  },
  {
    id: '2',
    vehicle: 'Toyota Hilux',
    hiredBy: 'Jerry Marcos',
    orderId: '#29676',
    amount: '£35.60',
    location: 'Enugu',
    date: '22 Sept, 2023',
    status: 'Error',
    avatar: 'https://i.pravatar.cc/40?img=13'
  },
  {
    id: '3',
    vehicle: 'Ford Raptor',
    hiredBy: 'Jerry Marcos',
    orderId: '#29876',
    amount: '£35.60',
    location: 'Enugu',
    date: '22 Sept, 2023',
    status: 'Successful',
    avatar: 'https://i.pravatar.cc/40?img=14'
  },
  {
    id: '4',
    vehicle: 'Ford Raptor',
    hiredBy: 'Jerry Marcos',
    orderId: '#29676',
    amount: '£35.60',
    location: 'Enugu',
    date: '22 Sept, 2023',
    status: 'Cancelled',
    avatar: 'https://i.pravatar.cc/40?img=15'
  },
  {
    id: '5',
    vehicle: 'Ford Raptor',
    hiredBy: 'Jerry Marcos',
    orderId: '#29876',
    amount: '£35.60',
    location: 'Enugu',
    date: '22 Sept, 2023',
    status: 'Successful',
    avatar: 'https://i.pravatar.cc/40?img=16'
  },
  {
    id: '6',
    vehicle: 'Ford Raptor',
    hiredBy: 'Jerry Marcos',
    orderId: '#29676',
    amount: '£35.60',
    location: 'Enugu',
    date: '22 Sept, 2023',
    status: 'Successful',
    avatar: 'https://i.pravatar.cc/40?img=17'
  },
  {
    id: '7',
    vehicle: 'Ford Raptor',
    hiredBy: 'Jerry Marcos',
    orderId: '#29876',
    amount: '£35.60',
    location: 'Enugu',
    date: '22 Sept, 2023',
    status: 'Successful',
    avatar: 'https://i.pravatar.cc/40?img=18'
  }
];

export const mockStats: StatCard[] = [
  {
    id: 'ongoing',
    value: 1358,
    label: 'Ongoing',
    color: 'cyan',
    icon: 'package'
  },
  {
    id: 'completed',
    value: 642,
    label: 'Completed',
    color: 'emerald',
    icon: 'check'
  },
  {
    id: 'pending',
    value: 863,
    label: 'Pending',
    color: 'orange',
    icon: 'file'
  }
];

export const mockConversations: Conversation[] = [
  { id: 'ch-1', name: 'Car Hosts (22)', avatar: 'https://i.pravatar.cc/40?img=20', unreadCount: 0, isOnline: false },
  { id: 'ch-2', name: 'Customers (34)', avatar: 'https://i.pravatar.cc/40?img=21', unreadCount: 3, isOnline: false },
  { id: 'u-1', name: 'Michael', avatar: 'https://i.pravatar.cc/40?img=8', unreadCount: 2, isOnline: true },
  { id: 'u-2', name: 'Stephen', avatar: 'https://i.pravatar.cc/40?img=9', unreadCount: 1, isOnline: true },
  { id: 'u-3', name: 'Kristal', avatar: 'https://i.pravatar.cc/40?img=5', unreadCount: 0, isOnline: true },
  { id: 'u-4', name: 'Sandra', avatar: 'https://i.pravatar.cc/40?img=3', unreadCount: 0, isOnline: false },
  { id: 'u-5', name: 'Jude', avatar: 'https://i.pravatar.cc/40?img=11', unreadCount: 0, isOnline: false },
  { id: 'u-6', name: 'Queen', avatar: 'https://i.pravatar.cc/40?img=6', unreadCount: 1, isOnline: true },
  { id: 'u-7', name: 'Davis', avatar: 'https://i.pravatar.cc/40?img=7', unreadCount: 0, isOnline: false },
  { id: 'u-8', name: 'Audrey', avatar: 'https://i.pravatar.cc/40?img=4', unreadCount: 0, isOnline: true }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'u-4',
    senderName: 'Sandra',
    text: 'Jokes are finding the navigation a bit confusing. Any thoughts?',
    timestamp: '10:30 am',
    read: true,
  },
  {
    id: '2',
    senderId: 'u-4',
    senderName: 'Sandra',
    text: 'Accessibility is key. 👍😎',
    timestamp: '10:30 am',
    read: true,
  },
  {
    id: '3',
    senderId: 'user-1',
    senderName: 'David Whyte',
    text: "Absolutely, let's make our app user-friendly for everyone. Night mode is a game-changer, and we can try a color-blind navigation options.",
    timestamp: '11:20 am',
    read: true,
  },
  {
    id: '4',
    senderId: 'u-4',
    senderName: 'Sandra',
    text: "Looks like we've covered a lot! One last thing—what about user testing the new features before rolling them out?",
    timestamp: '10:30 am',
    read: true,
  },
  {
    id: '5',
    senderId: 'user-1',
    senderName: 'David Whyte',
    text: "Excellent suggestion! User testing is a must. We can run some A/B tests and gather valuable insights. Alright, I'll start drafting up specs. Thoughts? Sanchez? Anything else on your mind?",
    timestamp: '11:20 am',
    read: true,
  },
  {
    id: '6',
    senderId: 'u-4',
    senderName: 'Sandra',
    text: "That covers it for now. Thanks, David! Looking forward to seeing these improvements take shape. Let's keep the momentum going! 🚀",
    timestamp: '10:30 am',
    read: true,
  }
];

export const mockProfile = {
  fullName: "Code Master",
  email: "codemaster5362@gmail.com",
  phone: "+254 115000514",
  linkedinUrl: "https://www.linkedin.com/in/...",
  hasLinkedIn: false,
  resumeFile: {
    name: "JEREMY RESUME.pdf",
    uploadedDate: "10/21/25"
  }
};


// ============================================
// FILE: navItems.ts
// ============================================
import { Home, Package, Car, CreditCard, MessageSquare, FileText, Users, Settings } from "lucide-react";

export const navItems = [
  {
    id: "home",
    icon: Home,
    label: "Home",
  },
  {
    id: "bookings",
    icon: Package,
    label: "Bookings",
  },
  {
    id: "vehicles",
    icon: Car,
    label: "Vehicles",
  },
  {
    id: "payments",
    icon: CreditCard,
    label: "Payments",
  },
  {
    id: "messages",
    icon: MessageSquare,
    label: "Messages",
  },
  {
    id: "notifications",
    icon: FileText,
    label: "Notifications",
  },
  {
    id: "clients",
    icon: Users,
    label: "Clients",
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
  },
  {
    id: "profile",
    icon: Users,
    label: "Profile",
  },
];