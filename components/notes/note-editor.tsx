"use client";

import React, {  useState } from "react";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";

;

interface NoteEditorProps {
  note?: Doc<"notes">;
  onSave: (id: string) => void;
  onCancel: () => void;
}

export function NoteEditor({ note, onSave, onCancel }: NoteEditorProps) {
  const [value, setValue] = useState(note)

   const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setValue((prev) => {
       if (!prev) return prev;
       return {
         ...prev,
         tag: e.target.value,
       };
     });
   };

   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) =>  {
      if (!prev) return prev
      return  {
        ...prev,
        title: e.target.value,
      }
    })
   }

   const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue((prev) => {
      if(!prev) return prev
      return {
        ...prev,
        content: e.target.value
      }
    })
   }


//TODO: onSave() note


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
              value={value?.title}
              onChange={handleTitleChange} 
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
              value={value?.tag}
              onChange={handleTagChange}
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
              value={value?.content}
              onChange={handleContentChange}
              placeholder="Write your note here..."
              rows={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto flex justify-end space-x-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => {}}>Save</Button>
        </div>
      </div>
    </div>
  );
}
