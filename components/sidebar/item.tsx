"use client";

import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  hasChildren?: boolean;
  onClick?: () => void;
}

export function Item({
  icon,
  label,
  isActive = false,
  hasChildren = false,
  onClick,
}: NavItemProps) {
  return (
    <div
      className={`
        flex items-center justify-between p-2 rounded-md cursor-pointer
        ${isActive ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800"}
      `}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2">
          {icon}
        </div>
        <span className="dark:text-gray-300">{label}</span>
      </div>
      {hasChildren && <ChevronRight size={16} className="dark:text-gray-400" />}
    </div>
  );
}
