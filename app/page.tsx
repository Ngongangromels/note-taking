"use client";

import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar/sidebar";
import { NotesList } from "@/components/notes/notes-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMobile } from "@/hooks/use-mobile";
import { MobileNotesList } from "@/components/mobile/mobile-notes-list";
import { Search } from "@/components/search";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

// Exemple de données pour la démo
const exampleTags = [
  { id: "dev", name: "Dev" },
  { id: "personal", name: "Personal" },
  { id: "work", name: "Work" },
];

const exampleNotes = [
  {
    id: "note1",
    title: "Exemple de note",
    content: "Contenu de la note...",
    tags: ["Dev", "Work"],
    lastEdited: "29 Oct 2024",
  },
];

export default function NotesPage() {
  const router = useRouter();
  const isMobile = useMobile();
  const { isAuthenticated } = useConvexAuth()

  const notes = useQuery(api.notes.get);
  const create = useMutation(api.notes.create);
  const tag = useQuery(api.notes.getTags)?.map(tag => ({
    _id: tag.noteId,
    _creationTime: Date.now(), 
    tag: tag.tag,
    title: "Default Title", 
    userId: "Default User", 
    isArchived: false, 
    content: "Default Content", 
    isPublished: false, 
  }));

  const handleNoteSelect = (noteId: Id<"notes">) => {
    router.push(`/notes/${noteId}`);
  };

  const handleTagSelect = (tagId: Id<"notes">) => {
     router.push(`/notes/${tagId}/edit`);
  };

  const handleCreateNote = () => {
    const promise = create({
      title: "Untiled",
      content: "Enter your note",
      tag: "Put a tag",
    }).then((noteId) => router.push(`/notes/${noteId}/edit`)); 

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note created !",
      error: "Faild to create note.",
    });
  };

  

  // Affichage mobile
  if (isMobile) {
    return (
      <MobileNotesList
        notes={exampleNotes}
        onNoteSelect={handleNoteSelect}
        onCreateNote={handleCreateNote}
      />
    );
  }

  if(!isAuthenticated) {
    // Affichage desktop
    return (
      <div className="flex h-screen bg-white dark:bg-gray-900">
        <Sidebar tags={tag || []} onTagSelect={handleTagSelect} />

        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold dark:text-white">All Notes</h1>
            <Search />
          </div>

          <div className="flex-1 flex"> 
            <NotesList
              notes={notes || []}
              activeNoteId=""
              onNoteSelect={() => {}}
              onCreateNote={() => {}}
            />

            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <p className="text-lg">Select a note or create a new one</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Affichage desktop
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar tags={tag || []} onTagSelect={handleTagSelect} />

      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold dark:text-white">All Notes</h1>
          <Search />
        </div>

        <div className="flex-1 flex">
          <NotesList
            notes={notes || []}
            activeNoteId=""
            onNoteSelect={handleNoteSelect}
            onCreateNote={handleCreateNote}
          />

          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <p className="text-lg">Select a note or create a new one</p>
          </div>
        </div>
      </div>
    </div>
  );
}
