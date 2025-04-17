"use client";

import { useState, useCallback, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import {  useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

/**
 * Hook personnalisé pour gérer l'état et les opérations sur les notes
 */
export function useNotes() {
  const auth = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<Doc<"notes">[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Doc<"notes">[]>([]);

  /**
   * Filtre les notes en fonction d'un tag
   */

  const note = useQuery(api.notes.get);

  useEffect(() => {
    if (auth.isSignedIn && note) {
      setNotes(note);
      setFilteredNotes(note);
    } else {
      router.push("/");
    }
  }, [auth, note, router]);

  const filterNotesByTag = useCallback(
    (tagName?: string) => {
      if (!tagName) {
        setFilteredNotes(notes || []);
        return;
      }

      setFilteredNotes(
        notes.filter(
          (note) =>
            Array.isArray(note.tag) &&
            note.tag.some(
              (tag: string) => tag.toLowerCase() === tagName.toLowerCase()
            )
        )
      );
    },
    [notes]
  );

  /**
   * Filtre les notes en fonction d'une requête de recherche
   */
  const searchNotes = useCallback(
    (query: string) => {
      if (!query) {
        setFilteredNotes(notes);
        return;
      }

      const lowerQuery = query.toLowerCase();
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(lowerQuery) ||
            note.content.toLowerCase().includes(lowerQuery) ||
            (Array.isArray(note.tag) &&
              note.tag.some((tag: string) =>
                tag.toLowerCase().includes(lowerQuery)
              ))
        )
      );
    },
    [notes]
  );

  /**
   * Crée une nouvelle note
   */
  // const createNote = useCallback(
  //   (noteData: Partial<Note>) => {
  //     const newNote: Note = {
  //       id: `note-${Date.now()}`,
  //       title: noteData.title || "Untitled Note",
  //       content: noteData.content || "",
  //       tags: noteData.tags || [],
  //       lastEdited: new Date().toLocaleDateString("en-US", {
  //         day: "2-digit",
  //         month: "short",
  //         year: "numeric",
  //       }),
  //     };

  //     const updatedNotes = [newNote, ...notes];
  //     setNotes(updatedNotes);
  //     setFilteredNotes(updatedNotes);

  //     return newNote;
  //   },
  //   [notes]
  // );

  /**
   * Met à jour une note existante
   */
  // const updateNote = useCallback(
  //   (noteId: string, noteData: Partial<Note>) => {
  //     const updatedNotes = notes.map((note) => {
  //       if (note.id === noteId) {
  //         return {
  //           ...note,
  //           title: noteData.title || note.title,
  //           content: noteData.content || note.content,
  //           tags: noteData.tags || note.tags,
  //           lastEdited: new Date().toLocaleDateString("en-US", {
  //             day: "2-digit",
  //             month: "short",
  //             year: "numeric",
  //           }),
  //         };
  //       }
  //       return note;
  //     });

  //     setNotes(updatedNotes);
  //     setFilteredNotes(updatedNotes);
  //   },
  //   [notes]
  // );

  /**
   * Supprime une note
   */
  // const deleteNote = useCallback(
  //   (noteId: string) => {
  //     const updatedNotes = notes.filter((note) => note.id !== noteId);
  //     setNotes(updatedNotes);
  //     setFilteredNotes(updatedNotes);

  //     return updatedNotes.length > 0 ? updatedNotes[0].id : null;
  //   },
  //   [notes]
  // );

  /**
   * Archive une note (simulation)
   */
  const archiveNote = useCallback((noteId: string) => {
    console.log("Archive note", noteId);
    // Implémentation future
  }, []);

  return {
    notes,
    filteredNotes,
    filterNotesByTag,
    searchNotes,
    archiveNote,
  };
}
