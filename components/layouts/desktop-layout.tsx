"use client";

import { Sidebar } from "@/components/sidebar/sidebar";
import { NotesList } from "@/components/notes/notes-list";
import { NoteDetail } from "@/components/notes/note-detail";
import { NoteEditor } from "@/components/notes/note-editor";
import { Search } from "@/components/search";
import { View } from "@/hooks/use-note-navigation";

import { Doc } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface DesktopLayoutProps {
  currentView: View;
  activeNote: Doc<"notes">;
  activeNoteId: string | null;
  activeTag?: string;
  tags: Doc<"notes">;
  filteredNotes: Doc<"notes">[];
  onTagSelect: (tagId: string) => void;
  onNoteSelect: (noteId: string) => void;
  onCreateNote: () => void;
  onEditNote: () => void;
  onSaveNote: (noteData: Partial<Doc<"notes">>) => void;
  onCancelEdit: () => void;
  onArchiveNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onSearch: (query: string) => void;

}

export function DesktopLayout({
  currentView,
  activeNote,
  activeNoteId,
  activeTag,
  tags,
  filteredNotes,
  onTagSelect,
  onNoteSelect,
  onCreateNote,
  onEditNote,
  onSaveNote,
  onCancelEdit,
  onArchiveNote,
  onDeleteNote,
  onSearch,
}: DesktopLayoutProps) {

  const [notesState, setNotesState] = useState<Doc<"notes">[] | null>(null);
  const notes = useQuery(api.notes.get)

  useEffect(() => {
         if (notes) {
           setNotesState(notes);
         }
  }, [])
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar tags={Array.isArray(tags) ? tags : []} activeTag={activeTag} onTagSelect={onTagSelect} />

      <div className="flex-1 flex flex-col">
        <nav className="bg-background px-3 py-2 w-full flex items-center justify-between gap-x-4 border-b border-gray-200 ">
          <div>
            <h1 className="text-xl font-semibold dark:text-white">All Notes</h1>
          </div>
          <Search onSearch={onSearch} />
        </nav>

        <div className="flex-1 flex">
          <NotesList
            notes={filteredNotes.map(note => ({
              _id: note._id,
              _creationTime: note._creationTime,
              tag: note.tag,
              title: note.title,
              userId: note.userId,
              isArchived: note.isArchived,
              content: note.content,
              isPublished: note.isPublished,
            }))}
            activeNoteId={activeNoteId || ""}
            onNoteSelect={onNoteSelect}
            onCreateNote={onCreateNote}
          />

          <div className="flex-1 flex flex-col">
            {currentView === View.DETAIL && activeNote && (
              <NoteDetail
                note={activeNote}
                onArchive={onArchiveNote}
                onDelete={onDeleteNote}
                onEdit={onEditNote}
              />
            )}

            {(currentView === View.EDIT || currentView === View.CREATE) && (
              <NoteEditor
                note={
                  currentView === View.CREATE && activeNote
                    ? {
                      
                        tag: activeNote.tag,
                        title: activeNote.title,
                        content: activeNote.content,
                      }
                    : undefined
                }
                onSave={onSaveNote}
                onCancel={onCancelEdit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
