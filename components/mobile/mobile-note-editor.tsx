"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";


interface MobileNoteEditorProps {
  note?: Doc<"notes">;
  noteId?: Id<"notes">,
  onBack?: () => void;
  onSave?: (noteId: Id<"notes">, title: string, content: string, tag: string) => void;
  onCancel?: () => void;
}

export function MobileNoteEditor({
  note,
  noteId,
  onBack,
  onSave,
  onCancel,
}: MobileNoteEditorProps) {
 const [title, setTitle] = useState(note?.title || "");
    const [content, setContent] = useState(note?.content || "");
    const [tags, setTags] = useState(note?.tag || "");


  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
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
         <Button onClick={() => {
            if (noteId) {
              if (onSave) {
                onSave(noteId, title, content, tags);
              } else {
                console.error("onSave is undefined");
              }
            }
          }}>
            Save Note
          </Button>
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
            placeholder="Tags"
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
