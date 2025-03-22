import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HydrateClient } from "~/trpc/server";
// import RelatedPosts from "~/app/_components/RelatedPosts";
import { api } from "~/trpc/server";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// Format date for display
function formatDate(date: Date | string) {
  if (!date) return "";
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Dynamic metadata for blog post pages
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await api.post.getBySlug({ slug: params.slug });

  if (!post) {
    return {
      title: "Post Not Found | Janet Li",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Janet Li`,
    description: post.summary || `Read ${post.title} by Janet Li`,
  };
}

/**
 * Blog post detail page component
 * Displays a single blog post with content, metadata, and related posts
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Fetch the blog post by slug
  const post = await api.post.getBySlug({ slug: params.slug });

  // Return 404 if post is not found or not published
  if (!post || !post.published) {
    notFound();
  }

  return (
    <HydrateClient>
      <article className="container mx-auto px-4 py-12">
        {/* Post header */}
        <header className="animate-fade-in mx-auto mb-12 max-w-4xl">
          {/* Tags and date */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags &&
              post.tags.length > 0 &&
              post.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog?tag=${tag}`}
                  className="bg-primary-100 text-primary-700 hover:bg-primary-200 inline-block transform rounded-full px-3 py-1 text-sm font-medium transition-colors hover:-translate-y-0.5 hover:shadow-sm"
                >
                  {tag}
                </Link>
              ))}
            <span className="font-body py-1 text-sm text-gray-500">
              {formatDate(post.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-primary-900 font-heading gradient-text mb-6 text-4xl font-bold md:text-5xl">
            {post.title}
          </h1>

          {/* Summary */}
          {post.summary && (
            <p className="font-body mb-8 text-xl leading-relaxed text-gray-600">
              {post.summary}
            </p>
          )}

          {/* Author info */}
          <div className="animate-slide-in flex items-center">
            <div className="relative mr-4 h-12 w-12 transform overflow-hidden rounded-full shadow-md transition-transform hover:scale-105">
              <Image
                src={post.author?.image || "/images/default-avatar.jpg"}
                alt={post.author?.name || "Author"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-heading font-medium">
                {post.author?.name || "Guest Author"}
              </p>
              <p className="font-body text-sm text-gray-500">
                PhD Student in Clinical Psychology
              </p>
            </div>
          </div>
        </header>

        {/* Featured image */}
        {post.featuredImage ? (
          <div className="animate-slide-in-up mx-auto mb-12 max-w-4xl">
            <div className="relative h-72 transform overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.01] md:h-96">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        ) : (
          <div className="animate-slide-in-up mx-auto mb-12 max-w-4xl">
            <div className="relative h-72 transform overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.01] md:h-96">
              <Image
                src="/images/placeholder.jpg"
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Post content */}
        <div className="blog-content animate-slide-in mx-auto max-w-4xl">
          {post.content.startsWith("<") ? (
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="prose prose-lg prose-headings:font-heading prose-headings:text-primary-900 prose-p:font-body prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md max-w-none"
            />
          ) : (
            <div className="prose prose-lg max-w-none">
              {post.content.split("\n").map((paragraph, idx) =>
                paragraph.trim() ? (
                  <p key={idx} className="font-body mb-4 text-gray-700">
                    {paragraph}
                  </p>
                ) : (
                  <br key={idx} />
                ),
              )}
            </div>
          )}
        </div>

        {/* Share buttons */}
        <div className="animate-fade-in mx-auto mt-12 max-w-4xl border-t border-gray-200 pt-8">
          <h3 className="font-heading mb-4 text-lg font-medium">
            Share this post
          </h3>
          <div className="flex space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://janetli.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-100 text-primary-700 hover:bg-primary-200 transform rounded-full p-2 transition-all hover:scale-110 hover:shadow-sm"
              aria-label="Share on Twitter"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://janetli.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-100 text-primary-700 hover:bg-primary-200 transform rounded-full p-2 transition-all hover:scale-110 hover:shadow-sm"
              aria-label="Share on Facebook"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://janetli.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-100 text-primary-700 hover:bg-primary-200 transform rounded-full p-2 transition-all hover:scale-110 hover:shadow-sm"
              aria-label="Share on LinkedIn"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://janetli.com/blog/${post.slug}`,
                );
                alert("Link copied to clipboard!");
              }}
              className="bg-primary-100 text-primary-700 hover:bg-primary-200 transform rounded-full p-2 transition-all hover:scale-110 hover:shadow-sm"
              aria-label="Copy link"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Related posts */}
        <div className="mx-auto mt-16 max-w-5xl border-t border-gray-200 pt-12">
          <h2 className="text-primary-900 font-heading animate-fade-in mb-8 text-2xl font-bold">
            Related Posts
          </h2>
          {/* <RelatedPosts currentPostId={post.id} tags={post.tags || []} /> */}

          {/* Placeholder for related posts while component is being built */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-slide-in rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg">
                  <Image
                    src={`/images/blog-post-${i}.jpg`}
                    alt="Related post"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading mb-2 font-bold text-gray-900">
                  <Link
                    href="#"
                    className="hover:text-primary-600 transition-colors"
                  >
                    Related Post Title Example {i}
                  </Link>
                </h3>
                <p className="font-body mb-3 text-sm text-gray-500">
                  May 1{i}, 2023
                </p>
                <p className="font-body text-sm text-gray-600">
                  A brief preview of another interesting article related to this
                  topic.
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </HydrateClient>
  );
}
