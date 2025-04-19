"use client";

import React, {  useState } from "react";
import { Button } from "@/components/ui/button";
import { Doc, Id } from "@/convex/_generated/dataModel";

;

interface NoteEditorProps {
  note?: Doc<"notes">;
  noteId?: Id<"notes">;
  onSave: (noteId: Id<"notes">, title: string, content: string, tags: string) => void;
  onCancel: () => void;
}

export function NoteEditor({ note, noteId, onSave, onCancel }: NoteEditorProps) {
   const [title, setTitle] = useState(note?.title || "");
   const [content, setContent] = useState(note?.content || "");
   const [tags, setTags] = useState(note?.tag || "");

  //  const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   // // Convertir les tags en tableau
  //   // const tagsArray = tags.split(",").map(tag => tag.trim());
    
  //   // Appeler la fonction onSave passée en props
  //   if (noteId) {
  //     onSave(noteId, title, content, tags);
  //   } else {
  //     console.error("noteId is undefined");
  //   }
  // };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-4 flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Note title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2, tag3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
          
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => {
            if (noteId) {
              onSave(noteId, title, content, tags);
            } else {
              console.error("noteId is undefined");
            }
          }}>Save</Button>
        </div>
      </div>
  );
}
