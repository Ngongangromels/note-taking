"use client";

import { Sidebar } from "@/components/sidebar/sidebar";
import { NotesList } from "@/components/notes/notes-list";
import { NoteDetail } from "@/components/notes/note-detail";
import { NoteEditor } from "@/components/notes/note-editor";
import { Search } from "@/components/search";
import { View } from "@/hooks/use-note-navigation";
import type { Note, Tag } from "@/type";

interface DesktopLayoutProps {
  currentView: View;
  activeNote: Note | null;
  activeNoteId: string | null;
  activeTag?: string;
  tags: Tag[];
  filteredNotes: Note[];
  onTagSelect: (tagId: string) => void;
  onNoteSelect: (noteId: string) => void;
  onCreateNote: () => void;
  onEditNote: () => void;
  onSaveNote: (noteData: Partial<Note>) => void;
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
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar tags={tags} activeTag={activeTag} onTagSelect={onTagSelect} />

      <div className="flex-1 flex flex-col">
        <nav className="bg-background px-3 py-2 w-full flex items-center justify-between gap-x-4 border-b border-gray-200 ">
          <div>
            <h1 className="text-xl font-semibold dark:text-white">All Notes</h1>
          </div>
          <Search onSearch={onSearch} />
        </nav>

        <div className="flex-1 flex">
          <NotesList
            notes={filteredNotes}
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
                  currentView === View.EDIT && activeNote
                    ? activeNote
                    : undefined
                }
                onSave={onSaveNote}
                onCancel={onCancelEdit}
              />
            )}

            {currentView === View.DETAIL && (
              <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
                <Search onSearch={onSearch} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
