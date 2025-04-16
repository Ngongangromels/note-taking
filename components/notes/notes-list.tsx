"use client";

import type { Note } from "@/type";
import { NoteCard } from "./note-card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface NotesListProps {
  notes: Note[];
  activeNoteId: string;
  onNoteSelect: (noteId: string) => void;
  onCreateNote: () => void;
}

export function NotesList({
  notes,
  activeNoteId,
  onNoteSelect,
  onCreateNote,
}: NotesListProps) {
  return (
    <div className="w-[540px] border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4">
        <Button
          variant="secondary"
          className="w-full  bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={onCreateNote}
        >
          Create New Note{<Plus size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            isActive={activeNoteId === note.id}
            onClick={() => onNoteSelect(note.id)}
          />
        ))}
      </div>
    </div>
  );
}
