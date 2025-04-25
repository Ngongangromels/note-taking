"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, TagIcon } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";


export default function TagsPage() {
  const router = useRouter();
  const tag = useQuery(api.notes.getTags)

  const handleTagSelect = (tagId: Id<"notes">) => {
    router.push(`/notes/${tagId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => router.push("/")}
          className="mr-4 text-gray-500 dark:text-gray-400"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold dark:text-white">Tags</h1>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {tag?.map((tag) => (
            <div
              key={tag.noteId}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => handleTagSelect(tag.noteId)}
            >
              <div className="flex items-center">
                <TagIcon
                  size={16}
                  className="mr-2 text-gray-500 dark:text-gray-400"
                />
                <span className="font-medium dark:text-white">{tag.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
