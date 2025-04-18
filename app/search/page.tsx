"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { Search } from "@/components/search";

// Exemple de données pour la démo
const exampleNotes = [
  {
    id: "note1",
    title: "Exemple de note",
    content: "Contenu de la note...",
    tags: ["Dev", "Work"],
    lastEdited: "29 Oct 2024",
  },
];

export default function SearchPage() {
  const router = useRouter();
  const isMobile = useMobile();
  const [query, setQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(exampleNotes);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    // Dans une implémentation réelle, on filtrerait les notes en fonction de la recherche
    setFilteredNotes(exampleNotes);
  };

  const handleNoteSelect = (noteId: string) => {
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
          filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="border-b border-gray-200 dark:border-gray-700 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleNoteSelect(note.id)}
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
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found for "{query}"
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
