"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { Note } from "@/types";
import { useCallback } from "react";

export function useNotes() {
  // Récupérer les notes depuis Convex
  const notes = useQuery(api.notes.getNotes) || [];

  // Mutations Convex
  const createNoteMutation = useMutation(api.notes.createNote);
  const updateNoteMutation = useMutation(api.notes.updateNote);
  const deleteNoteMutation = useMutation(api.notes.deleteNote);

  // Filtrer les notes par tag
  const filterNotesByTag = useCallback((tagName?: string) => {
    return api.notes.filterNotesByTag({ tag: tagName });
  }, []);

  const filteredNotes = (tagName?: string) => {
    return useQuery(filterNotesByTag, { tag: tagName }) || [];
  };

  // Rechercher des notes
  const searchNotes = useCallback((query: string) => {
    return api.notes.searchNotes({ query });
  }, []);

  const searchedNotes = (query: string) => {
    return useQuery(searchNotes, { query }) || [];
  };

  // Créer une note
  const createNote = async (noteData: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    const id = await createNoteMutation(noteData);
    return { id, ...noteData };
  };

  // Mettre à jour une note
  const updateNote = async (
    id: Id<"notes">,
    noteData: { title?: string; content?: string; tags?: string[] }
  ) => {
    await updateNoteMutation({ id, ...noteData });
  };

  // Supprimer une note
  const deleteNote = async (id: Id<"notes">) => {
    await deleteNoteMutation({ id });
  };

  // Archiver une note (à implémenter plus tard)
  const archiveNote = async (id: Id<"notes">) => {
    console.log("Archive note:", id);
    // Implémentation future
  };

  return {
    notes: notes as Note[],
    filterNotesByTag: filteredNotes,
    searchNotes: searchedNotes,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
  };
}
