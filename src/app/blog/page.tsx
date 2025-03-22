import Link from "next/link";
import Image from "next/image";
import { HydrateClient } from "~/trpc/server";
// import BlogList from "../_components/BlogList";

/**
 * Blog page component
 * Displays all blog posts with filtering and pagination
 */
export const metadata = {
  title: "Blog | Janet Li",
  description:
    "Explore Janet Li's research blog on clinical psychology, mental health, and therapeutic approaches.",
};

export default function BlogPage() {
  return (
    <HydrateClient>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-primary-900 animate-fade-in font-heading gradient-text mb-6 text-4xl font-bold md:text-5xl">
            Research Blog
          </h1>
          <p className="animate-slide-in font-body mx-auto max-w-2xl text-gray-600">
            Exploring the intersections of clinical psychology, cognitive
            science, and therapeutic interventions. Join me on my research
            journey.
          </p>
        </div>

        {/* Static Blog List Placeholder */}
        <div className="mb-8">
          <div className="animate-slide-in mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="font-heading text-2xl font-bold text-gray-800">
              All Posts
            </h2>
            <div className="mt-4 flex space-x-3 md:mt-0">
              <input
                type="text"
                placeholder="Search posts..."
                className="focus:border-primary-500 font-body focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 transition-all hover:shadow-sm focus:ring-2 focus:outline-none md:w-64"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="animate-slide-in mb-8 flex flex-wrap gap-2">
            {[
              "All",
              "Cognitive Psychology",
              "Mental Health",
              "Research Methods",
              "Digital Health",
              "CBT",
              "Trauma",
              "Anxiety",
            ].map((tag) => (
              <button
                key={tag}
                className={`transform rounded-full px-3 py-1 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                  tag === "All"
                    ? "bg-primary-600 text-white shadow-md"
                    : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <BlogPostCard
              title="Understanding Cognitive Biases in Therapy"
              slug="#"
              image="/images/blog-post-1.jpg"
              date="March 15, 2023"
              tags={["Cognitive Psychology", "CBT"]}
              summary="Exploring how cognitive biases affect therapeutic outcomes and techniques for addressing them in clinical practice."
            />
            <BlogPostCard
              title="Digital Interventions for Anxiety"
              slug="#"
              image="/images/blog-post-2.jpg"
              date="February 10, 2023"
              tags={["Digital Health", "Anxiety"]}
              summary="A review of recent studies on the effectiveness of mobile applications and digital tools for managing anxiety disorders."
            />
            <BlogPostCard
              title="Trauma-Informed Research Methods"
              slug="#"
              image="/images/blog-post-3.jpg"
              date="January 22, 2023"
              tags={["Research Methods", "Trauma"]}
              summary="Ethical considerations and methodological approaches for conducting research with trauma-exposed populations."
            />
            <BlogPostCard
              title="The Role of Mindfulness in Depression Treatment"
              slug="#"
              image="/images/blog-post-1.jpg"
              date="December 5, 2022"
              tags={["Mental Health", "Depression"]}
              summary="Investigating the efficacy of mindfulness-based interventions for treatment-resistant depression and their integration with traditional approaches."
            />
            <BlogPostCard
              title="Ethics in Psychological Research"
              slug="#"
              image="/images/blog-post-2.jpg"
              date="November 12, 2022"
              tags={["Research Methods", "Ethics"]}
              summary="Discussing current ethical standards in psychological research and evolving considerations in the digital age."
            />
            <BlogPostCard
              title="Cultural Competence in Clinical Practice"
              slug="#"
              image="/images/blog-post-3.jpg"
              date="October 30, 2022"
              tags={["Clinical Practice", "Cultural Competence"]}
              summary="Strategies for developing cultural competence in clinical psychology and addressing systemic barriers to inclusive care."
            />
          </div>

          {/* Pagination */}
          <div className="animate-fade-in mt-12 flex justify-center">
            <div className="flex space-x-2">
              <button className="transform rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-600 transition-colors hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-sm">
                Previous
              </button>
              <button className="bg-primary-600 transform rounded-lg px-4 py-2 text-white shadow-md transition-all hover:-translate-y-0.5">
                1
              </button>
              <button className="hover:text-primary-600 transform rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition-colors hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-sm">
                2
              </button>
              <button className="transform rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-600 transition-colors hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}

// Blog post card component
function BlogPostCard({
  title,
  slug,
  image,
  date,
  tags,
  summary,
}: {
  title: string;
  slug: string;
  image: string;
  date: string;
  tags: string[];
  summary: string;
}) {
  return (
    <div className="animate-fade-in overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link href={slug} className="block overflow-hidden">
        <div className="image-blur-wrapper relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="font-body mb-2 flex flex-wrap items-center text-xs text-gray-500">
          {tags.length > 0 && (
            <span className="mr-3 flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 hover:bg-primary-200 mr-1 inline-block transform rounded-full px-2 py-1 text-xs font-medium transition-colors hover:-translate-y-0.5"
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
          <time dateTime={date} className="inline-flex items-center">
            <svg
              className="mr-1 h-3 w-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
            {date}
          </time>
        </div>
        <Link href={slug}>
          <h3 className="hover:text-primary-600 font-heading mb-2 text-xl font-semibold text-gray-800 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="font-body mb-4 line-clamp-3 text-gray-600">{summary}</p>
        <Link
          href={slug}
          className="text-primary-600 hover:text-primary-700 group inline-flex items-center font-medium transition-all"
        >
          Read more
          <svg
            className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1"
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
