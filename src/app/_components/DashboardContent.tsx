"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/trpc/react";
import { formatDate } from "~/utils/date";
import PostEditor from "./PostEditor";

/**
 * DashboardContent component
 * Displays a list of the user's blog posts and provides an interface for managing them
 */
export default function DashboardContent() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  // Fetch user's posts
  const { data, isLoading, error } = api.post.getUserPosts.useQuery({
    limit: 100,
  });
  const utils = api.useUtils();

  // Delete post mutation
  const deletePostMutation = api.post.delete.useMutation({
    onSuccess: () => {
      // Refetch the posts after deletion
      utils.post.getUserPosts.invalidate();
    },
  });

  // Handle post creation
  const handleCreatePost = () => {
    setEditingPost(null);
    setIsCreatingPost(true);
  };

  // Handle post editing
  const handleEditPost = (post: any) => {
    setIsCreatingPost(false);
    setEditingPost(post);
  };

  // Handle post deletion
  const handleDeletePost = async (postId: number) => {
    if (
      confirm(
        "Are you sure you want to delete this post? This action cannot be undone.",
      )
    ) {
      await deletePostMutation.mutate({ id: postId });
    }
  };

  // Handle editor close
  const handleEditorClose = () => {
    setIsCreatingPost(false);
    setEditingPost(null);
  };

  // Handle after post is saved
  const handlePostSaved = () => {
    setIsCreatingPost(false);
    setEditingPost(null);
    utils.post.getUserPosts.invalidate();
  };

  // Show loading state
  if (isLoading) {
    return <LoadingDashboard />;
  }

  // Show error message
  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">
          Failed to load your posts. Please try again later.
        </p>
      </div>
    );
  }

  // Editor view for creating or editing posts
  if (isCreatingPost || editingPost) {
    return (
      <PostEditor
        post={editingPost}
        onClose={handleEditorClose}
        onSaved={handlePostSaved}
      />
    );
  }

  return (
    <div>
      {/* Action buttons */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Your Blog Posts</h2>
        <button
          onClick={handleCreatePost}
          className="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-white transition-colors"
        >
          Create New Post
        </button>
      </div>

      {/* No posts message */}
      {data?.items.length === 0 && (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="mb-4 text-gray-500">
            You haven't created any blog posts yet.
          </p>
          <button
            onClick={handleCreatePost}
            className="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-white transition-colors"
          >
            Create Your First Post
          </button>
        </div>
      )}

      {/* Post list */}
      {data?.items.length > 0 && (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-500">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {/* Table body */}
          <div className="divide-y divide-gray-200">
            {data.items.map((post) => (
              <div
                key={post.id}
                className="grid grid-cols-12 items-center gap-4 p-4 transition-colors hover:bg-gray-50"
              >
                <div className="col-span-5 font-medium">
                  <div className="flex items-center">
                    {post.featuredImage && (
                      <div className="relative mr-3 h-10 w-10 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="truncate">{post.title}</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-gray-500">
                  {formatDate(post.updatedAt || post.createdAt)}
                </div>
                <div className="col-span-3 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
                    target="_blank"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="ml-2 text-sm font-medium text-red-600 transition-colors hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * LoadingDashboard component
 * Skeleton loading state for the dashboard
 */
function LoadingDashboard() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex items-center justify-between">
        <div className="h-6 w-40 rounded bg-gray-200"></div>
        <div className="h-10 w-32 rounded bg-gray-200"></div>
      </div>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 p-4">
          <div className="col-span-5 h-4 rounded bg-gray-200"></div>
          <div className="col-span-2 h-4 rounded bg-gray-200"></div>
          <div className="col-span-2 h-4 rounded bg-gray-200"></div>
          <div className="col-span-3 h-4 rounded bg-gray-200"></div>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-12 items-center gap-4 p-4">
              <div className="col-span-5 h-5 rounded bg-gray-200"></div>
              <div className="col-span-2 h-5 rounded bg-gray-200"></div>
              <div className="col-span-2 h-5 rounded bg-gray-200"></div>
              <div className="col-span-3 h-5 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
