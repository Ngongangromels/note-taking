"use client";

import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar/sidebar";
import { NotesList } from "@/components/notes/notes-list";
import { NoteEditor } from "@/components/notes/note-editor";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMobile } from "@/hooks/use-mobile";
import { MobileNoteEditor } from "@/components/mobile/mobile-note-editor";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

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

export default function CreateNotePage() {
  const params = useParams();
  const noteId: Id<"notes"> = params.id as Id<"notes">;

  const noteCreated = useQuery(api.notes.getById, { noteId });
  const notes = useQuery(api.notes.get);
  const tag = useQuery(api.notes.getTags)?.map((tag) => ({
    _id: tag.noteId,
    _creationTime: Date.now(),
    tag: tag.tag,
    title: "Default Title",
    userId: "Default User",
    isArchived: false,
    content: "Default Content",
    isPublished: false,
  }));

  const router = useRouter();
  const isMobile = useMobile();

  const handleNoteSelect = (noteId: Id<"notes">) => {
    router.push(`/notes/${noteId}`);
  };

 const handleTagSelect = (tagId: Id<"notes">) => {
   router.push(`/notes/${tagId}/edit`);
 };

  const handleSaveNote = (noteData: any) => {
    console.log("Create note:", noteData);
    // Dans une implémentation réelle, on créerait la note et on redirigerait vers la nouvelle note
    router.push("/");
  };

  const handleCancelEdit = () => {
    router.push("/");
  };

  // Affichage mobile
  if (isMobile) {
    return (
      <MobileNoteEditor
        onBack={() => router.push("/")}
        onSave={handleSaveNote}
        onCancel={handleCancelEdit}
      />
    );
  }

  // Affichage desktop
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar tags={tag || []} onTagSelect={handleTagSelect} />

      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold dark:text-white">Create Note</h1>
          <ThemeToggle />
        </div>

        <div className="flex-1 flex">
          <NotesList
            notes={notes || []}
            activeNoteId=""
            onNoteSelect={handleNoteSelect}
            onCreateNote={() => {}}
          />

          <div className="flex-1 flex flex-col">
            <NoteEditor
            note={noteCreated}
              onSave={handleSaveNote}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
