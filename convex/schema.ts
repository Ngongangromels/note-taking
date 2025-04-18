import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    id: v.id("notes"),
    title: v.string(),
    tag: v.optional(v.string()),
    userId: v.string(),
    isArchived: v.boolean(),
    content: v.string(),
    isPublished: v.boolean(),
  }).index("by_user", ["userId"]),
});
