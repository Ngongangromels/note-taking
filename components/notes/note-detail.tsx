"use client";


import { TagIcon, Clock, Archive, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Doc, Id } from "@/convex/_generated/dataModel";

interface NoteDetailProps {
  note: Doc<"notes">;
  onArchive: (noteId: Id<"notes">) => void;
  onDelete: (noteId: string) => void;
  onEdit: () => void;
}

export function NoteDetail({
  note,
  onArchive,
  onEdit,
}: NoteDetailProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">
            {note?.title}
          </h1>

          <div className="flex items-center mb-2">
            <TagIcon size={16} className="mr-2 dark:text-gray-300" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Tags
            </span>
            <div className="ml-4 flex space-x-2">
              <span className="text-sm dark:text-gray-300">{note?.tag}</span>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <Clock size={16} className="mr-2 dark:text-gray-300" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last edited
            </span>
            <span className="ml-4 text-sm dark:text-gray-300">
              {note?._creationTime}
            </span>
          </div>

          <div className="prose max-w-none dark:prose-invert">
            {note?.content}
          </div>
        </div>
      </div>

      <div className="flex  justify-end p-4 border-t border-gray-200 dark:border-gray-700 space-x-2">
        <Button variant="outline" onClick={onEdit}>
          Edit Note {<Edit size={16} />}
        </Button>
        <Button variant="outline" onClick={() => onArchive(note._id)}>
          Archive Note {<Archive size={16} />}
        </Button>
      </div>
    </div>
  );
}
