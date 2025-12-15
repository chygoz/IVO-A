"use client";

import { motion } from "framer-motion";
import { User, FileText, Lock, Bell, Trash2 } from "lucide-react";

interface AccountSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function AccountSidebar({
  activeTab,
  setActiveTab,
}: AccountSidebarProps) {
  const sidebarItems: SidebarItem[] = [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="h-5 w-5 mr-2" />,
    },
    {
      id: "basic-information",
      label: "Basic Information",
      icon: <FileText className="h-5 w-5 mr-2" />,
    },
    {
      id: "password",
      label: "Change Password",
      icon: <Lock className="h-5 w-5 mr-2" />,
    },
    {
      id: "notification",
      label: "Notification",
      icon: <Bell className="h-5 w-5 mr-2" />,
    },
    {
      id: "delete-account",
      label: "Delete account",
      icon: <Trash2 className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <ul className="space-y-1">
        {sidebarItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition ${
                activeTab === item.id
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>

              {activeTab === item.id && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="ml-auto w-1.5 h-5 bg-primary rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
