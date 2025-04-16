"use client";
import { MobileNav } from "@/components/mobile/mobile-nav";
import { MobileNoteDetail } from "@/components/mobile/mobile-note-detail";
import { MobileNoteEditor } from "@/components/mobile/mobile-note-edite";

import { View } from "@/hooks/use-note-navigation";
import type { Note } from "@/type";

interface MobileLayoutProps {
  currentView: View;
  activeNote: Note | null;
  filteredNotes: Note[];
  activeTab: string;
  onNoteSelect: (noteId: string) => void;
  onTabChange: (tab: string) => void;
  onBackToList: () => void;
  onSaveNote: (noteData: Partial<Note>) => void;
  onCancelEdit: () => void;
  onEditNote: () => void;
}

export function MobileLayout({
  currentView,
  activeNote,
  filteredNotes,
  activeTab,
  onNoteSelect,
  onTabChange,
  onBackToList,
  onSaveNote,
  onCancelEdit,
  onEditNote,
}: MobileLayoutProps) {
  // Affichage de l'éditeur (création ou édition)
  if (currentView === View.EDIT || currentView === View.CREATE) {
    return (
      <>
        <MobileNoteEditor
          note={
            currentView === View.EDIT && activeNote ? activeNote : undefined
          }
          onBack={onBackToList}
          onSave={onSaveNote}
          onCancel={onCancelEdit}
        />
        <MobileNav activeTab={activeTab} onTabChange={onTabChange} />
      </>
    );
  }

  // Affichage du détail d'une note
  if (currentView === View.DETAIL && activeNote) {
    return (
      <>
        <MobileNoteDetail
          note={activeNote}
          onBack={onBackToList}
          onSave={onEditNote}
          onCancel={onBackToList}
        />
        <MobileNav activeTab={activeTab} onTabChange={onTabChange} />
      </>
    );
  }

  // Affichage de la liste des notes (par défaut)
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
          <h1 className="text-xl font-semibold dark:text-white">Notes</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {filteredNotes.map((note) => (
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

      <MobileNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
