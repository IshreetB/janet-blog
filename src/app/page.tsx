import Link from "next/link";
import Image from "next/image";
import { HydrateClient } from "~/trpc/server";
// Remove the import for LatestPost
// import { LatestPost } from "./_components/post";
// Using inline placeholder to avoid import error
// import LatestPosts from "./_components/LatestPosts";

/**
 * Home page component for Janet Li's blog
 * Features a hero section, latest blog posts, and research highlights
 */
export default function Home() {
  return (
    <HydrateClient>
      <div className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="from-primary-100 to-secondary-100 w-full bg-gradient-to-r py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="animate-slide-left">
                <h1 className="font-heading text-primary-900 mb-4 text-4xl font-bold md:text-5xl">
                  Janet Li
                </h1>
                <h2 className="font-heading text-primary-700 gradient-text mb-6 text-2xl md:text-3xl">
                  Clinical Psychology Research
                </h2>
                <p className="font-body mb-8 text-lg leading-relaxed text-gray-700">
                  Exploring the intersections of mental health, cognitive
                  science, and therapeutic interventions. Follow my journey as a
                  PhD student and researcher in clinical psychology.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/blog"
                    className="bg-primary-600 hover:bg-primary-700 transform rounded-lg px-6 py-3 text-center text-white transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    Read the Blog
                  </Link>
                  <Link
                    href="/about"
                    className="border-primary-300 text-primary-700 hover:bg-primary-50 rounded-lg border px-6 py-3 text-center transition-all hover:shadow-sm"
                  >
                    About Me
                  </Link>
                </div>
              </div>
              <div className="relative hidden h-80 md:block">
                <div className="animate-slide-right absolute inset-0 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/research.jpg"
                    alt="Clinical psychology research"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Remove the Create Post Section */}

        {/* Featured Research */}
        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-primary-800 animate-fade-in mb-12 text-center text-3xl font-bold">
              Research Focus
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <ResearchCard
                title="Cognitive Behavioral Therapy"
                description="Investigating the efficacy of CBT interventions for anxiety disorders in young adults."
                icon={
                  <svg
                    className="text-primary-600 h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                }
              />
              <ResearchCard
                title="Trauma-Informed Care"
                description="Exploring best practices for implementing trauma-informed approaches in clinical settings."
                icon={
                  <svg
                    className="text-primary-600 h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                }
              />
              <ResearchCard
                title="Digital Mental Health"
                description="Researching the effectiveness of digital interventions and teletherapy for improving access to mental health care."
                icon={
                  <svg
                    className="text-primary-600 h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        {/* Latest Blog Posts */}
        <section className="lavender-gradient w-full py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-primary-800 animate-fade-in mb-4 text-center text-3xl font-bold">
              Latest from the Blog
            </h2>
            <p className="font-body mx-auto mb-12 max-w-2xl text-center text-gray-600">
              Explore my latest thoughts, research findings, and insights on
              clinical psychology, mental health interventions, and academic
              life.
            </p>
            {/* Placeholder blog posts */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <BlogPostPlaceholder
                title="Understanding Cognitive Biases in Therapy"
                image="/images/blog-post-1.jpg"
                date="March 15, 2023"
                tags={["Cognitive Psychology", "CBT"]}
                summary="Exploring how cognitive biases affect therapeutic outcomes and techniques for addressing them in clinical practice."
              />
              <BlogPostPlaceholder
                title="Digital Interventions for Anxiety"
                image="/images/blog-post-2.jpg"
                date="February 10, 2023"
                tags={["Digital Health", "Anxiety"]}
                summary="A review of recent studies on the effectiveness of mobile applications and digital tools for managing anxiety disorders."
              />
              <BlogPostPlaceholder
                title="Trauma-Informed Research Methods"
                image="/images/blog-post-3.jpg"
                date="January 22, 2023"
                tags={["Research Methods", "Trauma"]}
                summary="Ethical considerations and methodological approaches for conducting research with trauma-exposed populations."
              />
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="bg-primary-600 hover:bg-primary-700 inline-flex transform items-center justify-center rounded-lg px-6 py-3 text-center text-white transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="mr-2">View All Posts</span>
                <svg
                  className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
        </section>

        {/* Newsletter */}
        <section className="w-full bg-white py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="bg-primary-50 border-fancy animate-slide-in rounded-2xl p-8 shadow-md md:p-12">
              <div className="mb-8 text-center">
                <h2 className="font-heading text-primary-800 gradient-text mb-4 text-3xl font-bold">
                  Stay Updated
                </h2>
                <p className="font-body mx-auto max-w-2xl text-gray-600">
                  Subscribe to receive updates on my latest research, blog
                  posts, and upcoming events.
                </p>
              </div>
              <form className="mx-auto max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="focus:ring-primary-500 flex-grow rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 transform rounded-lg px-6 py-3 whitespace-nowrap text-white transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="mt-3 text-center text-xs text-gray-500">
                  I respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </HydrateClient>
  );
}

// Research card component for the featured research section
function ResearchCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="card-hover border-fancy border-primary-100 bg-primary-50 animate-fade-in rounded-xl border p-6">
      <div className="animate-float mb-4">{icon}</div>
      <h3 className="font-heading text-primary-800 mb-2 text-xl font-semibold">
        {title}
      </h3>
      <p className="font-body text-gray-600">{description}</p>
    </div>
  );
}

// Blog post placeholder component
function BlogPostPlaceholder({
  title,
  image,
  date,
  tags,
  summary,
}: {
  title: string;
  image: string;
  date: string;
  tags: string[];
  summary: string;
}) {
  return (
    <div className="card-hover animate-fade-in overflow-hidden rounded-xl bg-white shadow-md">
      <div className="image-blur-wrapper relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 text-xs text-gray-500">
          {tags.length > 0 && (
            <span className="mr-3">
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 mr-2 inline-block rounded-full px-2 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
          <time dateTime={date}>{date}</time>
        </div>
        <h3 className="font-heading hover:text-primary-600 mb-2 text-xl font-semibold text-gray-800 transition-colors">
          {title}
        </h3>
        <p className="font-body mb-4 line-clamp-3 text-gray-600">{summary}</p>
        <div className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium transition-colors">
          Read more
          <svg
            className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
        </div>
      </div>
    </div>
  );
}
