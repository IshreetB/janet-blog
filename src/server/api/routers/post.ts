import { and, desc, eq, sql, like } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts, users } from "~/server/db/schema";

// Input schema for creating and updating blog posts
const postInput = z.object({
  title: z.string().min(1).max(256),
  content: z.string().optional().default(""),
  summary: z.string().optional(),
  slug: z.string().min(1).max(256).optional(),
  published: z.boolean().default(false),
  featuredImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Generate a URL-friendly slug from a title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Get or create a default guest user ID for development purposes
const getDefaultUserId = async (db: any) => {
  // Check if a default guest user exists
  const guestUser = await db.query.users.findFirst({
    where: eq(users.email, "guest@example.com"),
  });

  // If guest user exists, return its ID
  if (guestUser) {
    return guestUser.id;
  }

  // Otherwise, create a new guest user
  const [newUser] = await db
    .insert(users)
    .values({
      name: "Guest User",
      email: "guest@example.com",
    })
    .returning({ id: users.id });

  return newUser.id;
};

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure.input(postInput).mutation(async ({ ctx, input }) => {
    // Generate a base slug if one isn't provided
    let baseSlug = input.slug || generateSlug(input.title);
    if (!baseSlug) baseSlug = "post"; // Fallback if slug is empty

    // Check if slug exists and make it unique if needed
    let slug = baseSlug;
    let counter = 0;

    // Keep checking until we find a unique slug
    let existingPost;
    do {
      existingPost = await ctx.db.query.posts.findFirst({
        where: eq(posts.slug, slug),
      });

      if (existingPost) {
        counter++;
        slug = `${baseSlug}-${counter}`;
      }
    } while (existingPost);

    // Use the logged-in user's ID if available, otherwise use the default guest user
    const userId = ctx.session?.user?.id || (await getDefaultUserId(ctx.db));

    await ctx.db.insert(posts).values({
      title: input.title,
      content: input.content || "",
      summary: input.summary,
      slug: slug,
      published: input.published,
      featuredImage: input.featuredImage,
      tags: input.tags,
      createdById: userId,
    });

    return { success: true, slug };
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: postInput,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.query.posts.findFirst({
        where: and(
          eq(posts.id, input.id),
          eq(posts.createdById, ctx.session.user.id),
        ),
      });

      if (!post) {
        throw new Error(
          "Post not found or you don't have permission to update it",
        );
      }

      await ctx.db
        .update(posts)
        .set({
          title: input.data.title,
          content: input.data.content,
          summary: input.data.summary,
          slug: input.data.slug,
          published: input.data.published,
          featuredImage: input.data.featuredImage,
          tags: input.data.tags,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, input.id));

      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.query.posts.findFirst({
        where: and(
          eq(posts.id, input.id),
          eq(posts.createdById, ctx.session.user.id),
        ),
      });

      if (!post) {
        throw new Error(
          "Post not found or you don't have permission to delete it",
        );
      }

      await ctx.db.delete(posts).where(eq(posts.id, input.id));

      return { success: true };
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    // Get latest post without filtering by user ID
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      with: {
        author: true,
      },
    });

    return post ?? null;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.posts.findFirst({
        where: eq(posts.id, input.id),
        with: {
          author: true,
        },
      });

      return post;
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.posts.findFirst({
        where: eq(posts.slug, input.slug),
        with: {
          author: true,
        },
      });

      return post;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().optional(),
        publishedOnly: z.boolean().default(true),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, publishedOnly } = input;

      const query = publishedOnly ? and(eq(posts.published, true)) : sql`1=1`;

      const items = await ctx.db.query.posts.findMany({
        limit: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        where: query,
        with: {
          author: {
            columns: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  getUserPosts: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;

      const items = await ctx.db.query.posts.findMany({
        limit: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        where: eq(posts.createdById, ctx.session.user.id),
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
