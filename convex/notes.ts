import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return []
      // throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const note = await ctx.db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return note;
  },
});

export const getById = query({
  args: {
    noteId: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);

    if (!note) {
      throw new ConvexError("Not found");
    }

    if (note.isPublished && !note.isArchived) {
      return note;
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const userId = identity.subject;

    if (note.userId !== userId) {
      throw new ConvexError("Unauthorized");
    }

    return note;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    tag: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const note = await ctx.db.insert("notes", {
      title: args.title,
      content: args.content,
      tag: args.tag,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return note;
  },
});

export const update = mutation({
  args: {
    id: v.id("notes"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    tag: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Nao authenticed");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingNotes = await ctx.db.get(args.id);

    if (!existingNotes) {
      throw new Error("Not found");
    }

    if (existingNotes.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const note = await ctx.db.patch(args.id, {
      ...rest,
    });

    return note;
  },
});

export const archive = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const userId = identity.subject;

    const existingNotes = await ctx.db.get(args.id);

    if (!existingNotes) {
      throw new ConvexError("Not found");
    }

    if (existingNotes.userId !== userId) {
      throw new ConvexError("Unauthorized");
    }

    const notes = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    return notes;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }
    const userId = identity.subject;

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return notes;
  },
});

export const remove = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const userId = identity.subject;

    const existingNote = await ctx.db.get(args.id);

    if (!existingNote) {
      throw new Error("Not found");
    }

    if (existingNote.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const note = await ctx.db.delete(args.id);

    return note;
  },
});

export const getTags = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return []
      throw new ConvexError("Not authenticated");
    }

    const userId = identity.subject;

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .collect();

    const tagsWithIds = notes.flatMap((note) => {
      const tags = Array.isArray(note.tag) ? note.tag : [note.tag];
      return tags.map((tag) => ({
        noteId: note._id,
        tag: tag,
      }));
    });

    return tagsWithIds;
  },
});