"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { Tag } from "@/types";

export function useTags() {
  // Récupérer les tags depuis Convex
  const tags = useQuery(api.tags.getTags) || [];

  // Mutations Convex
  const createTagMutation = useMutation(api.tags.createTag);
  const deleteTagMutation = useMutation(api.tags.deleteTag);

  // Créer un tag
  const createTag = async (name: string) => {
    const id = await createTagMutation({ name });
    return { id, name };
  };

  // Supprimer un tag
  const deleteTag = async (id: Id<"tags">) => {
    await deleteTagMutation({ id });
  };

  return {
    tags: tags as Tag[],
    createTag,
    deleteTag,
  };
}
