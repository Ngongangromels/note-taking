"use client";

import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { DesktopLayout } from "@/components/layouts/desktop-layout";
import { useNotes } from "@/hooks/use-notes";
import { useNotesNavigation, View } from "@/hooks/use-note-navigation";
import { useMobile } from "@/hooks/use-mobile";


export default function NotesApp() {
  // Hooks personnalisés pour la gestion des notes et de la navigation
  const {
    notes,
    filteredNotes,
    searchNotes,
    archiveNote,
  } = useNotes();

  const {
    currentView,
    activeNoteId,
    activeTab,
    handleNoteSelect,
    handleCreateNote,
    handleEditNote,
    handleCancelEdit,
    handleBackToList,
    handleTabChange,
  } = useNotesNavigation();

  // État pour le tag actif
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);

  // Détection du mode mobile
  const isMobile = useMobile();

  // Trouve la note active dans la liste des notes
  const activeNote = activeNoteId
    ? notes.find((note) => note._id === activeNoteId) || null
    : null;

  // Gestionnaire pour la sélection d'un tag
  // const handleTagSelect = (tagId: string) => {
    // const newActiveTag = tagId === activeTag ? undefined : tagId;
    // setActiveTag(newActiveTag);

    // if (newActiveTag) {
    //   const tagName = TAGS.find((tag) => tag.id === newActiveTag)?.name;
    //   if (tagName) filterNotesByTag(tagName);
    // } else {
    //   filterNotesByTag();
    // }

  // Gestionnaire pour la sauvegarde d'une note
  const handleSaveNote = () => {
    // if (currentView === View.CREATE) {
    //   const newNote = createNote(noteData);
    //   handleNoteSelect(newNote.id);
    // } else if (activeNoteId) {
    //   updateNote(activeNoteId, noteData);
    //   handleNoteSelect(activeNoteId);
    // }
  };

  // Gestionnaire pour la suppression d'une note
  const handleDeleteNote = () => {
    // const firstNoteId = deleteNote(noteId);
    // if (firstNoteId) {
    //   handleNoteSelect(firstNoteId);
    // } else {
    //   handleBackToList();
    // }
  };

  // Rendu conditionnel basé sur le mode d'affichage (mobile ou desktop)
  return isMobile ? (
    <MobileLayout
      currentView={currentView}
      activeNote={
        activeNote
          ? {
              id: activeNote._id,
              tags: activeNote.tag ? [activeNote.tag] : [],
              title: activeNote.title,
              userId: activeNote.userId,
              isArchived: activeNote.isArchived,
              content: activeNote.content,
              isPublished: activeNote.isPublished,
              creationTime: activeNote._creationTime,
            }
          : null
      }
      filteredNotes={filteredNotes.map(note => ({
        _id: note._id,
        _creationTime: note._creationTime || Date.now(),
        tag: note.tag,
        isArchived: note.isArchived,
        isPublished: note.isPublished,
        title: note.title,
        content: note.content,
        userId: note.userId || "unknown",
      }))}
      activeTab={activeTab}
      onNoteSelect={handleNoteSelect}
      onTabChange={handleTabChange}
      onBackToList={handleBackToList}
      onSaveNote={handleSaveNote}
      onCancelEdit={handleCancelEdit}
      onEditNote={handleEditNote}
    />
  ) : (
    <DesktopLayout
      currentView={currentView}
      activeNoteId={activeNote}
    
      activeNoteId={activeNoteId}
      activeTag={activeTag}
      filteredNotes={filteredNotes}
      onNoteSelect={handleNoteSelect}
      onCreateNote={handleCreateNote}
      onEditNote={handleEditNote}
      onSaveNote={handleSaveNote}
      onCancelEdit={handleCancelEdit}
      onArchiveNote={archiveNote}
      onDeleteNote={handleDeleteNote}
      onSearch={searchNotes}
    />
  );
}
