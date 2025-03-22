"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/trpc/react";
import { formatDate } from "~/utils/date";

/**
 * BlogList component
 * Displays a list of blog posts with pagination and filtering capabilities
 */
export default function BlogList() {
  // State for pagination and filtering
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Fetch blog posts
  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    api.post.getAll.useInfiniteQuery(
      {
        limit: 6,
        publishedOnly: true,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialCursor: cursor,
      },
    );

  // Flatten all pages of results
  const allPosts = data?.pages.flatMap((page) => page.items) || [];

  // Filter posts based on search term and selected tag
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.summary &&
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTag =
      selectedTag === null || (post.tags && post.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  // Extract unique tags across all posts
  const allTags = Array.from(
    new Set(
      allPosts
        .filter((post) => post.tags && post.tags.length > 0)
        .flatMap((post) => post.tags || []),
    ),
  );

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Show loading state
  if (isLoading) {
    return <LoadingPosts />;
  }

  // Show error message
  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-500">
          Failed to load posts. Please try again later.
        </p>
      </div>
    );
  }

  // Show message if no posts found
  if (filteredPosts.length === 0) {
    return (
      <div>
        {/* Search and filters */}
        <div className="mb-8">
          <SearchAndFilters
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            tags={allTags}
            selectedTag={selectedTag}
            handleTagClick={handleTagClick}
          />
        </div>

        <div className="py-16 text-center">
          <p className="text-gray-500">
            {allPosts.length === 0
              ? "No posts available yet. Check back soon!"
              : "No posts match your search criteria. Try adjusting your filters."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search and filters */}
      <div className="mb-8">
        <SearchAndFilters
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          tags={allTags}
          selectedTag={selectedTag}
          handleTagClick={handleTagClick}
        />
      </div>

      {/* Blog posts grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load more button */}
      {data?.pages[data.pages.length - 1].nextCursor && (
        <div className="mt-12 text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="border-primary-400 text-primary-700 hover:bg-primary-50 inline-block rounded-lg border px-6 py-3 transition-colors"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More Posts"}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * SearchAndFilters component
 * Provides search input and tag filtering
 */
function SearchAndFilters({
  searchTerm,
  handleSearch,
  tags,
  selectedTag,
  handleTagClick,
}: {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tags: string[];
  selectedTag: string | null;
  handleTagClick: (tag: string) => void;
}) {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Search input */}
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={handleSearch}
            className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:ring-2 focus:outline-none"
          />
          <svg
            className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Tags filter */}
      {tags.length > 0 && (
        <div>
          <p className="mb-2 text-sm text-gray-500">Filter by topic:</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`rounded-full px-3 py-1 text-sm ${
                  selectedTag === tag
                    ? "bg-primary-600 text-white"
                    : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                } transition-colors`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * BlogPostCard component
 * Card component to display a single blog post preview
 */
function BlogPostCard({ post }: { post: any }) {
  // Use placeholder image if none is provided
  const imageUrl = post.featuredImage || "/images/placeholder.jpg";
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="animate-fade-in overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <Link href={`/blog/${post.slug}`}>
        <div className="image-blur-wrapper relative h-48">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className={`object-cover transition-all duration-500 ${imageLoaded ? "image-blur loaded" : "image-blur"}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="mb-2 text-xs text-gray-500">
          {post.tags && post.tags.length > 0 && (
            <span className="mr-3">
              {post.tags.slice(0, 2).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 mr-2 inline-block rounded-full px-2 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="hover:text-primary-600 mb-2 text-xl font-semibold text-gray-800 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="mb-4 line-clamp-3 text-gray-600">
          {post.summary || truncateText(post.content, 120)}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium transition-colors"
        >
          Read more
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
      </div>
    </div>
  );
}

/**
 * LoadingPosts component
 * Skeleton loading state for blog posts
 */
function LoadingPosts() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-xl bg-white shadow-md"
        >
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <div className="mb-2 h-4 w-1/4 rounded bg-gray-200"></div>
            <div className="mb-2 h-6 rounded bg-gray-200"></div>
            <div className="mb-1 h-4 rounded bg-gray-200"></div>
            <div className="mb-1 h-4 rounded bg-gray-200"></div>
            <div className="mb-4 h-4 w-2/3 rounded bg-gray-200"></div>
            <div className="h-5 w-1/4 rounded bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Helper function to truncate text to a specific length
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
