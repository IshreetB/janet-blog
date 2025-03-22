"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";

/**
 * PostEditor component
 * Form for creating and editing blog posts
 */
export default function PostEditor({
  post,
  onClose,
  onSaved,
}: {
  post: any | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  // Determine if we're editing or creating a new post
  const isEditing = !!post;

  // Form state
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [summary, setSummary] = useState(post?.summary || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [published, setPublished] = useState(post?.published || false);
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || "");
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mutations for creating and updating posts
  const createPostMutation = api.post.create.useMutation({
    onSuccess: () => {
      onSaved();
    },
  });

  const updatePostMutation = api.post.update.useMutation({
    onSuccess: () => {
      onSaved();
    },
  });

  // Generate slug from title
  useEffect(() => {
    if (!isEditing && title && !slug) {
      setSlug(generateSlug(title));
    }
  }, [title, isEditing, slug]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors: Record<string, string> = {};
    if (!title) validationErrors.title = "Title is required";
    if (!content) validationErrors.content = "Content is required";
    if (!slug) validationErrors.slug = "Slug is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEditing) {
        await updatePostMutation.mutate({
          id: post.id,
          data: {
            title,
            content,
            summary,
            slug,
            published,
            featuredImage,
            tags,
          },
        });
      } else {
        await createPostMutation.mutate({
          title,
          content,
          summary,
          slug,
          published,
          featuredImage,
          tags,
        });
      }
    } catch (error) {
      console.error("Error saving post:", error);
      setErrors({ submit: "Failed to save post. Please try again." });
    }
  };

  // Handle adding a new tag
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle tag input keydown (add tag on Enter)
  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="animate-fade-in rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? "Edit Post" : "Create New Post"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 transition-colors hover:text-gray-700"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {errors.submit && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full rounded-lg border px-4 py-2 ${
              errors.title ? "border-red-500" : "border-gray-300"
            } focus:ring-primary-500 focus:ring-2 focus:outline-none`}
            placeholder="Post title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="slug"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Slug *
          </label>
          <div className="flex">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
              /blog/
            </span>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={`block min-w-0 flex-1 rounded-none rounded-r-lg border px-4 py-2 ${
                errors.slug ? "border-red-500" : "border-gray-300"
              } focus:ring-primary-500 focus:ring-2 focus:outline-none`}
              placeholder="post-slug"
            />
          </div>
          {errors.slug && (
            <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            This will be the URL path for your post. Use lowercase letters,
            numbers, and hyphens only.
          </p>
        </div>

        {/* Summary */}
        <div>
          <label
            htmlFor="summary"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Summary
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            placeholder="Brief summary of the post (optional)"
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Content *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className={`w-full rounded-lg border px-4 py-2 ${
              errors.content ? "border-red-500" : "border-gray-300"
            } focus:ring-primary-500 focus:ring-2 focus:outline-none`}
            placeholder="Write your post content here..."
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            You can use HTML to format your content. Basic styling is already
            included.
          </p>
        </div>

        {/* Featured Image */}
        <div>
          <label
            htmlFor="featuredImage"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Featured Image URL
          </label>
          <input
            id="featuredImage"
            type="url"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            placeholder="https://example.com/image.jpg"
          />
          <p className="mt-1 text-sm text-gray-500">
            Direct link to an image for the post thumbnail (optional).
          </p>
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          <div className="flex">
            <input
              id="tagInput"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              className="focus:ring-primary-500 block min-w-0 flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-primary-600 hover:text-primary-900 ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full focus:outline-none"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Published Status */}
        <div className="flex items-center">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300"
          />
          <label
            htmlFor="published"
            className="ml-2 block text-sm text-gray-700"
          >
            Publish this post (make it visible to visitors)
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 border-t pt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              createPostMutation.isPending || updatePostMutation.isPending
            }
            className="bg-primary-600 hover:bg-primary-700 rounded-lg px-6 py-2 text-white transition-colors disabled:opacity-70"
          >
            {createPostMutation.isPending || updatePostMutation.isPending
              ? "Saving..."
              : isEditing
                ? "Update Post"
                : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * Generate a URL-friendly slug from a string
 */
function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}
