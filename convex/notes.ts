import {  v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";


export const get = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
          throw new Error("Not authenticated");
        }

        const notes = await ctx.db.query("notes")

        return notes
    }
})

export const create = mutation({
    args: {
        title: v.string(),
        content: v.string()
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
            userId,
            isArchived: false,
            isPublished: false,
        })

        return note
    }
})