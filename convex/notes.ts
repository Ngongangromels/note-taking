import {  v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";


export const get = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        

    const userId = identity?.subject;


        const note = await ctx.db
          .query("notes")
          .withIndex("by_user", (q) => q.eq("userId", userId))
          .filter((q) => q.eq(q.field("isArchived"), false))
          .order("desc")
          .collect();

        return note
    }
})

export const create = mutation({
    args: {
        title: v.string(),
        content: v.string(),
        tag: v.string()
    },
    handler: async ( ctx, args ) => {
        const identity = await ctx.auth.getUserIdentity()

        if(!identity) {
           throw new Error("Not authenticated")
        }

        const userId = identity.subject

        const note = await ctx.db.insert("notes", {
            title: args.title,
            content: args.content,
            tag: args.tag,
            userId,
            isArchived: false,
            isPublished: false,
        })

        return note
    }
})