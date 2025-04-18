"use client";

import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar/sidebar";
import { NotesList } from "@/components/notes/notes-list";
import { NoteEditor } from "@/components/notes/note-editor";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMobile } from "@/hooks/use-mobile";
import { MobileNoteEditor } from "@/components/mobile/mobile-note-editor";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

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

export default function EditNotePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isMobile = useMobile();

  
    const create = useMutation(api.notes.create)

  // Pour la démo, on utilise la première note comme exemple
  const note = exampleNotes[0];

  const handleNoteSelect = (noteId: string) => {
    router.push(`/notes/${noteId}`);
  };

  const handleTagSelect = (tagId: string) => {
    console.log("Tag selected:", tagId);
  };

   const handleCreateNote = () => {
      const promise = create({
        title: "Untiled",
        content: "Enter your note",
        tag: "put a tag"
      }).then((noteId) => router.push(`/notes/create/${noteId}`))
  
      toast.promise(promise, {
            loading: "Creating new note...",
            success: "New note created!",
            error: "Failed to create note"
      })
    };

  const handleSaveNote = (noteData: any) => {
    console.log("Save note:", noteData);
    router.push(`/notes/${params.id}`);
  };

  const handleCancelEdit = () => {
    router.push(`/notes/${params.id}`);
  };

  // Affichage mobile
  if (isMobile) {
    return (
      <MobileNoteEditor
        note={note}
        onBack={() => router.push(`/notes/${params.id}`)}
        onSave={handleSaveNote}
        onCancel={handleCancelEdit}
      />
    );
  }

  // Affichage desktop
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar tags={exampleTags} onTagSelect={handleTagSelect} />

      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold dark:text-white">Edit Note</h1>
          <ThemeToggle />
        </div>

        <div className="flex-1 flex">
          <NotesList
            notes={exampleNotes}
            activeNoteId={params.id}
            onNoteSelect={handleNoteSelect}
            onCreateNote={handleCreateNote}
          />

          <div className="flex-1 flex flex-col">
            <NoteEditor
              note={note}
              onSave={handleSaveNote}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
