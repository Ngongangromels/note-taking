"use client";

import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar/sidebar";
import { NotesList } from "@/components/notes/notes-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMobile } from "@/hooks/use-mobile";
import { MobileNotesList } from "@/components/mobile/mobile-notes-list";
import { Search } from "@/components/search";
import { useMutation, useQuery } from "convex/react";
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

  const notes = useQuery(api.notes.get);
  const create = useMutation(api.notes.create);

  const handleNoteSelect = (noteId: Id<"notes">) => {
    router.push(`/notes/${noteId}`);
    console.log(noteId);
  };

  const handleTagSelect = (tagId: string) => {
    console.log("Tag selected:", tagId);
  };

  const handleCreateNote = () => {
    const promise = create({
      title: "Untiled",
      content: "Enter your note",
      tag: "Put a tag",
    }).then((noteId) => router.push(`/notes/create/${noteId}`));

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note created !",
      error: "Faild to create note.",
    });
    router.push("/notes/create");
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

  // Affichage desktop
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar tags={exampleTags} onTagSelect={handleTagSelect} />

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
