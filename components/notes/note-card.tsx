"use client";

import type { Note } from "@/type";
import { Tag } from "../ui/tag";

interface NoteCardProps {
  note: Note;
  isActive: boolean;
  onClick: () => void;
}

export function NoteCard({ note, isActive, onClick }: NoteCardProps) {
  return (
    <div
      className={`
        border-b border-gray-200 dark:border-gray-700 p-4 cursor-pointer
        ${isActive ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800"}
      `}
      onClick={onClick}
    >
      <h2 className="font-medium dark:text-white">{note.title}</h2>
      <div className="flex mt-2 space-x-2 flex-wrap">
        {note.tags.map((tag, index) => (
          <Tag key={index} name={tag} />
        ))}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {note.lastEdited}
      </div>
    </div>
  );
}
