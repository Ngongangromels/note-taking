"use client";

import { NoteCard } from "./note-card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { useConvexAuth } from "convex/react";
import { SignIn } from "@clerk/clerk-react";

interface NotesListProps {
  notes: Doc<"notes">[];
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
  
 const { isAuthenticated } = useConvexAuth()
  return (
    <div className="w-[540px] border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4">
        <Button
          variant="secondary"
          className="w-full  bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={!isAuthenticated ? () => <SignIn /> : onCreateNote}
        >
          Create New Note{<Plus size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            isActive={activeNoteId === note._id}
            onClick={() => onNoteSelect(note._id)}
          />
        ))}
      </div>
    </div>
  );
}
