"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface Note {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  lastEdited?: string;
}

interface MobileNoteEditorProps {
  note?: Note;
  onBack?: () => void;
  onSave?: (note: Partial<Note>) => void;
  onCancel?: () => void;
}

export function MobileNoteEditor({
  note = { title: "", content: "", tags: [] },
  onBack = () => {},
  onSave = () => {},
  onCancel = () => {},
}: MobileNoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState(note?.tags?.join(", ") || "");

  const handleSave = () => {
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    onSave({
      title,
      content,
      tags: tagArray,
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <button
          className="flex items-center text-gray-600 dark:text-gray-300"
          onClick={onBack}
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Go Back</span>
        </button>
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-500 dark:text-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="text-blue-500 font-medium" onClick={handleSave}>
            Save Note
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full text-2xl font-bold mb-4 bg-transparent border-none focus:outline-none focus:ring-0 dark:text-white"
        />

        <div className="mb-4">
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full text-sm text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
          />
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 dark:text-white"
        />
      </div>
    </div>
  );
}
