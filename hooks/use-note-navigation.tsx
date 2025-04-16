"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Enum représentant les différentes vues de l'application
 */
export enum View {
  LIST = "list",
  DETAIL = "detail",
  EDIT = "edit",
  CREATE = "create",
}

/**
 * Hook personnalisé pour gérer la navigation dans l'application de notes
 */
export function useNotesNavigation() {

  const create = useMutation(api.notes.create)
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("home");

  /**
   * Détermine la vue actuelle en fonction des paramètres d'URL
   */
  const getCurrentView = useCallback((): View => {
    const view = searchParams.get("view");

    if (view === "create") return View.CREATE;
    if (view === "edit") return View.EDIT;
    if (view === "detail" && activeNoteId) return View.DETAIL;

    return View.LIST;
  }, [searchParams, activeNoteId]);

  /**
   * Navigue vers une vue spécifique avec les paramètres appropriés
   */
  const navigateTo = useCallback(
    (view: View, params: Record<string, string> = {}) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("view", view);

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });

      router.push(`${pathname}?${newParams.toString()}`);
    },
    [router, pathname, searchParams]
  );

  /**
   * Gestionnaire pour la sélection d'une note
   */
  const handleNoteSelect = useCallback(
    (noteId: string) => {
      setActiveNoteId(noteId);
      navigateTo(View.DETAIL, { noteId });
    },
    [navigateTo]
  );

  /**
   * Gestionnaire pour la création d'une nouvelle note
   */
  const handleCreateNote = useCallback(() => {
      const promise = create({ title: "Untitled", content: "enter your note" })
      toast.promise(promise, {
        loading: "Creating a new note...",
        success: "New note created!",
        error: "Failed to create a new note.",
      });
    navigateTo(View.CREATE);
  }, [navigateTo]);

  /**
   * Gestionnaire pour l'édition d'une note
   */
  const handleEditNote = useCallback(() => {
    if (activeNoteId) {
      navigateTo(View.EDIT, { noteId: activeNoteId });
    }
  }, [navigateTo, activeNoteId]);

  /**
   * Gestionnaire pour l'annulation de l'édition
   */
  const handleCancelEdit = useCallback(() => {
    if (activeNoteId) {
      navigateTo(View.DETAIL, { noteId: activeNoteId });
    } else {
      navigateTo(View.LIST);
    }
  }, [navigateTo, activeNoteId]);

  /**
   * Gestionnaire pour le retour à la liste
   */
  const handleBackToList = useCallback(() => {
    navigateTo(View.LIST);
  }, [navigateTo]);

  /**
   * Gestionnaire pour le changement d'onglet dans la navigation mobile
   */
  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      if (tab === "create") {
        handleCreateNote();
      } else if (tab === "home") {
        navigateTo(View.LIST);
      }
    },
    [navigateTo, handleCreateNote]
  );

  /**
   * Effet pour initialiser l'ID de la note active à partir des paramètres d'URL
   */
  useEffect(() => {
    const noteId = searchParams.get("noteId");
    if (noteId) {
      setActiveNoteId(noteId);
    }
  }, [searchParams]);

  return {
    currentView: getCurrentView(),
    activeNoteId,
    activeTab,
    setActiveNoteId,
    navigateTo,
    handleNoteSelect,
    handleCreateNote,
    handleEditNote,
    handleCancelEdit,
    handleBackToList,
    handleTabChange,
  };
}
