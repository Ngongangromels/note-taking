"use client";

import { NoteCard } from "./note-card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Spinner } from "../spinner";

interface NotesListProps {
  notes: Doc<"notes">[];
  activeNoteId: string;
  onNoteSelect: (noteId: Id<"notes">) => void;
  onCreateNote: () => void;
}

export function NotesList({
  notes,
  activeNoteId,
  onNoteSelect,
  onCreateNote,
}: NotesListProps) {
  
 const { isAuthenticated, isLoading } = useConvexAuth()
  
  return (
    <div className="w-[540px] border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4">
        <Button
          variant="secondary"
          className="w-full  bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
          onClick={!isAuthenticated ? () => redirect("/sign-in") : onCreateNote}
        >
          Create New Note{<Plus size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <p className="text-lg">You have no notes for the moment</p>
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <>
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                isActive={activeNoteId === note._id}
                onClick={() => onNoteSelect(note._id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
