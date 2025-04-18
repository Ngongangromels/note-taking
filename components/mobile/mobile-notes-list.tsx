"use client";

import { ThemeToggle } from "@/components/theme-toggle";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastEdited: string;
}

interface MobileNotesListProps {
  notes?: Note[];
  onNoteSelect?: (noteId: string) => void;
  onCreateNote?: () => void;
}

export function MobileNotesList({
  notes = [],
  onNoteSelect = () => {},
  onCreateNote = () => {},
}: MobileNotesListProps) {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
          <h1 className="text-xl font-semibold dark:text-white">Notes</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex-1 overflow-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border-b border-gray-200 dark:border-gray-700 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => onNoteSelect(note.id)}
          >
            <h2 className="font-medium dark:text-white">{note.title}</h2>
            <div className="flex mt-2 space-x-2 flex-wrap">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded dark:text-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {note.lastEdited}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 md:hidden">
        <div className="flex justify-around items-center h-16">
          <button className="flex items-center justify-center w-12 h-12 rounded-full text-blue-500">
            Home
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-full text-gray-500 dark:text-gray-400">
            Search
          </button>
          <button
            onClick={onCreateNote}
            className="flex items-center justify-center w-12 h-12 rounded-full text-gray-500 dark:text-gray-400"
          >
            Create
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-full text-gray-500 dark:text-gray-400">
            Tags
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-full text-gray-500 dark:text-gray-400">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
