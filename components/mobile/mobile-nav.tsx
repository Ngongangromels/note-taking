"use client";

import { Home, Search, PlusCircle, Tag, Settings } from "lucide-react";

interface MobileNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function MobileNav({
  activeTab = "home",
  onTabChange = () => {},
}: MobileNavProps) {
  const tabs = [
    { id: "home", icon: <Home size={24} /> },
    { id: "search", icon: <Search size={24} /> },
    { id: "create", icon: <PlusCircle size={24} /> },
    { id: "tags", icon: <Tag size={24} /> },
    { id: "settings", icon: <Settings size={24} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 md:hidden">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              activeTab === tab.id
                ? "text-blue-500"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
