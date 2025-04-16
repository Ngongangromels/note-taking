"use client";

import { ArrowLeft, Trash2, Archive } from "lucide-react";
import type { Note } from "@/type";

interface MobileNoteDetailProps {
  note: Note;
  onBack: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function MobileNoteDetail({
  note,
  onBack,
  onSave,
  onCancel,
}: MobileNoteDetailProps) {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          className="flex items-center text-gray-600 dark:text-gray-300"
          onClick={onBack}
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Go Back</span>
        </button>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 dark:text-gray-400">
            <Trash2 size={20} />
          </button>
          <button className="text-gray-500 dark:text-gray-400">
            <Archive size={20} />
          </button>
          <button
            className="text-gray-500 dark:text-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="text-blue-500 font-medium" onClick={onSave}>
            Save Note
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          {note.title}
        </h1>

        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
            Tags
          </span>
          <div className="flex space-x-2">
            <span className="text-sm dark:text-gray-300">
              {note.tags.join(", ")}
            </span>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
            Last edited
          </span>
          <span className="text-sm dark:text-gray-300">{note.lastEdited}</span>
        </div>

        <div className="prose max-w-none dark:prose-invert">
          {note.content.split("\n").map((paragraph, index) => (
            <p key={index} className="dark:text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
