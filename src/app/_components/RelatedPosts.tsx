"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/trpc/react";
import { formatDate } from "~/utils/date";

/**
 * RelatedPosts component
 * Displays blog posts related to the current post based on matching tags
 */
export default function RelatedPosts({
  currentPostId,
  tags,
}: {
  currentPostId: number;
  tags: string[];
}) {
  const { data, isLoading, error } = api.post.getAll.useQuery({
    limit: 10,
    publishedOnly: true,
  });

  // Early return for loading state
  if (isLoading) {
    return <LoadingPosts />;
  }

  // Early return for error
  if (error || !data) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray-500">Unable to load related posts.</p>
      </div>
    );
  }

  // Filter out the current post and find posts with matching tags
  const relatedPosts = data.items
    .filter((post) => post.id !== currentPostId)
    .map((post) => {
      // Calculate a "relevance score" based on how many tags match
      const matchingTags = tags.filter(
        (tag) => post.tags && post.tags.includes(tag),
      );
      return {
        ...post,
        relevanceScore: matchingTags.length,
      };
    })
    .filter((post) => post.relevanceScore > 0) // Only include posts with at least one matching tag
    .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance score
    .slice(0, 3); // Take only the top 3 related posts

  // If no related posts found, show general recent posts
  if (relatedPosts.length === 0) {
    const recentPosts = data.items
      .filter((post) => post.id !== currentPostId)
      .slice(0, 3);

    if (recentPosts.length === 0) {
      return (
        <div className="py-4 text-center">
          <p className="text-gray-500">No other posts available yet.</p>
        </div>
      );
    }

    return (
      <div>
        <p className="mb-6 text-gray-500">
          Other recent posts you might enjoy:
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {recentPosts.map((post) => (
            <RelatedPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {relatedPosts.map((post) => (
        <RelatedPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

/**
 * RelatedPostCard component
 * Card component to display a single related blog post
 */
function RelatedPostCard({ post }: { post: any }) {
  const imageUrl = post.featuredImage || "/images/placeholder.jpg";
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="animate-fade-in overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/blog/${post.slug}`}>
        <div className="image-blur-wrapper relative h-40">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className={`object-cover transition-all duration-500 ${imageLoaded ? "image-blur loaded" : "image-blur"}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="mb-2 text-xs text-gray-500">
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="hover:text-primary-600 mb-2 line-clamp-2 text-lg font-semibold text-gray-800 transition-colors">
            {post.title}
          </h3>
        </Link>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-primary-50 text-primary-700 inline-block rounded-full px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * LoadingPosts component
 * Skeleton loading state for related posts
 */
function LoadingPosts() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm"
        >
          <div className="h-40 bg-gray-200"></div>
          <div className="p-4">
            <div className="mb-2 h-4 w-1/4 rounded bg-gray-200"></div>
            <div className="mb-2 h-5 rounded bg-gray-200"></div>
            <div className="mb-4 h-5 w-2/3 rounded bg-gray-200"></div>
            <div className="flex gap-1">
              <div className="h-4 w-16 rounded bg-gray-200"></div>
              <div className="h-4 w-16 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
