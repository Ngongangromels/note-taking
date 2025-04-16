"use client";

import { Home, Archive } from "lucide-react";
import { NavItem } from "./item";
import { TagItem } from "./tag-item";
import type { Tag } from "@/type";

interface SidebarProps {
  tags: Tag[];
  activeTag?: string;
  onTagSelect?: (tagId: string) => void;
}

export function Sidebar({ tags, activeTag, onTagSelect }: SidebarProps) {
  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-4 flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
        <h1 className="text-xl font-semibold dark:text-white">Notes</h1>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="px-2 py-1">
          <NavItem
            icon={<Home size={16} />}
            label="All Notes"
            isActive={true}
            hasChildren={true}
          />
        </div>

        <div className="px-2 py-1">
          <NavItem icon={<Archive size={16} />} label="Archived Notes" />
        </div>

        <div className="mt-6 px-4">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Tags
          </h2>
          <div className="mt-2 space-y-1">
            {tags.map((tag) => (
              <TagItem
                key={tag.id}
                tag={tag}
                isActive={activeTag === tag.id}
                onClick={() => onTagSelect?.(tag.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
