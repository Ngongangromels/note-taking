"use client";

import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar/sidebar";
import { NotesList } from "@/components/notes/notes-list";
import { NoteEditor } from "@/components/notes/note-editor";
import { useMobile } from "@/hooks/use-mobile";
import { MobileNoteEditor } from "@/components/mobile/mobile-note-editor";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Search } from "@/components/search";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@/components/spinner";

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

export default function EditNotePage() {
  const router = useRouter();
  const isMobile = useMobile();
  const params = useParams()
    const noteId: Id<"notes"> = params.id as Id<"notes"> || "default-note-id" as Id<"notes">;

  
    const create = useMutation(api.notes.create)
    const notes = useQuery(api.notes.get)
    const noteCreated = useQuery(api.notes.getById, {
      noteId: noteId as Id<"notes">,
    });

  // Pour la démo, on utilise la première note comme exemple
  const note = exampleNotes[0];

  const handleNoteSelect = (noteId: Id<"notes">) => {
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
          <Search/>
        </div>

        <div className="flex-1 flex">
          <NotesList
            notes={notes || []}
            activeNoteId={noteId}
            onNoteSelect={handleNoteSelect}
            onCreateNote={handleCreateNote}
          />

          <div className="flex-1 flex flex-col">
            {noteCreated ? (
               <NoteEditor
              note={noteCreated}
              onSave={handleSaveNote}
              onCancel={handleCancelEdit}
            />
            ): (
              <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">
                       <Spinner/>
                  </p>
                </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
