"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Search } from "@/components/search";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";


export default function SearchPage() {
  const notes = useQuery(api.notes.get)
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes ?? []);

  // const handleSearch = (searchQuery: string) => {
  //   setQuery(searchQuery);
  //   setFilteredNotes(notes || []);
  // };
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    const filtered = (notes || []).filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.tag?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleNoteSelect = (noteId: Id<"notes">) => {
    router.push(`/notes/${noteId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => router.push("/")}
          className="mr-4 text-gray-500 dark:text-gray-400"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <Search onSearch={handleSearch} autoFocus />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {query ? (
          (filteredNotes?.length ?? 0) > 0 ? (
            filteredNotes?.map((note) => (
              <div
                key={note._id}
                className="border-b border-gray-200 dark:border-gray-700 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleNoteSelect(note._id)}
              >
                <h2 className="font-medium dark:text-white">{note.title}</h2>
                <div className="flex mt-2 space-x-2 flex-wrap">
                    <span
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded dark:text-gray-200"
                    >
                      {note.tag}
                    </span>
                
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {note._creationTime}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found for
            </div>
          )
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Type to search notes
          </div>
        )}
      </div>
    </div>
  );
}
