"use client";

import { TagIcon } from "lucide-react";

interface Tag {
  id: string;
  name: string;
}

interface TagItemProps {
  tag: Tag;
  isActive?: boolean;
  onClick?: () => void;
}

export function TagItem({ tag, isActive = false, onClick }: TagItemProps) {
  return (
    <div
      className={`
        flex items-center p-2 rounded-md cursor-pointer
        ${isActive ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800"}
      `}
      onClick={onClick}
    >
      <TagIcon size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
      <span className="dark:text-gray-300">{tag.name}</span>
    </div>
  );
}
