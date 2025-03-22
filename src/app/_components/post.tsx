"use client";

import { useState } from "react";
import Link from "next/link";

import { api } from "~/trpc/react";

export function LatestPost() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [newPostSlug, setNewPostSlug] = useState<string | null>(null);
  const utils = api.useUtils();

  // Use query instead of suspenseQuery to handle the case when no posts exist
  const {
    data: latestPost,
    isLoading,
    error,
    refetch,
  } = api.post.getLatest.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  const createPost = api.post.create.useMutation({
    onSuccess: async (data) => {
      await utils.post.invalidate();
      if (data.slug) {
        setNewPostSlug(data.slug);
      }
      await refetch();
      setName("");
      setContent("");
    },
  });

  return (
    <div className="mx-auto w-full max-w-md">
      {!isLoading && !error && latestPost && pathname === "/" && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Your latest post
          </h3>
          <p className="font-medium text-gray-700">{latestPost.title}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {latestPost.createdAt
                ? new Date(latestPost.createdAt).toLocaleDateString()
                : "Recently created"}
            </span>
            <Link
              href={`/blog/${latestPost.slug}`}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View post →
            </Link>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Create a new post
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost.mutate({
              title: name,
              content: content,
              published: true,
            });
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter post title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              rows={4}
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
              disabled={createPost.isPending}
            >
              {createPost.isPending ? "Creating..." : "Create Post"}
            </button>
          </div>

          {createPost.isError && (
            <p className="mt-2 text-sm text-red-600">
              Error creating post. Please try again.
            </p>
          )}

          {createPost.isSuccess && (
            <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3">
              <p className="text-sm font-medium text-green-600">
                Post created successfully!
              </p>
              {newPostSlug && (
                <Link
                  href={`/blog/${newPostSlug}`}
                  className="text-primary-600 hover:text-primary-700 mt-2 inline-flex items-center text-sm font-medium"
                >
                  View your new post
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
