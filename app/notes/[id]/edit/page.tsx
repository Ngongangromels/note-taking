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

export default function EditNotePage() {
  const router = useRouter();
  const isMobile = useMobile();
  const params = useParams();
  const noteId: Id<"notes"> =
    (params.id as Id<"notes">) || ("default-note-id" as Id<"notes">);

  const update = useMutation(api.notes.update);
  const create = useMutation(api.notes.create);
  const notes = useQuery(api.notes.get);
  const noteCreated = useQuery(api.notes.getById, {
    noteId: noteId as Id<"notes">,
  });
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
      tag: "put a tag",
    }).then((noteId) => router.push(`/notes/create/${noteId}`));

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note created!",
      error: "Failed to create note",
    });
  };

  const handleSaveNote = (
    noteId: Id<"notes">,
    title: string,
    content: string,
    tag: string
  ) => {
    update({
      id: noteId,
      title,
      content,
      tag,
    });
    router.push(`/notes/${params.id}`);
  };

  const handleCancelEdit = () => {
    router.push(`/notes/${params.id}`);
  };

  // Affichage mobile
  if (isMobile) {
    return (
      <>
        {noteCreated ? (
          <div>
            <MobileNoteEditor
            noteId={noteId}
              note={noteCreated}
              onBack={() => router.push("/")}
              onSave={handleSaveNote}
              onCancel={handleCancelEdit}
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">
                <Spinner />
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  // Affichage desktop
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar tags={tag || []} onTagSelect={handleTagSelect} />

      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold dark:text-white">Edit Note</h1>
          <Search />
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
                noteId={noteId}
                note={noteCreated}
                onSave={handleSaveNote}
                onCancel={handleCancelEdit}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400">
                  <Spinner />
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
