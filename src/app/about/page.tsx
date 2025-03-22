import Image from "next/image";
import Link from "next/link";
import { HydrateClient } from "~/app/_components/HydrateClient";

// Metadata for the about page
export const metadata = {
  title: "About | Janet Li",
  description:
    "Learn about Janet Li, a dedicated PhD student in Clinical Psychology focused on mental health and trauma-informed care",
};

export default function AboutPage() {
  return (
    <HydrateClient>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="font-heading text-primary-900 gradient-text animate-fade-in mb-6 text-4xl font-bold md:text-5xl">
          About Me
        </h1>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          {/* Left column with image and contact info */}
          <div className="animate-slide-left md:col-span-2">
            <div className="overflow-hidden rounded-xl shadow-md">
              <Image
                src="/images/janet-portrait.jpg"
                alt="Janet Li"
                width={600}
                height={800}
                className="w-full object-cover transition-all duration-500 hover:scale-[1.02]"
                priority
              />
            </div>

            <div className="mt-8 space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-primary-800 font-heading text-xl font-semibold">
                Contact Information
              </h3>
              <div className="space-y-2">
                <p className="font-body hover:text-primary-700 flex items-center text-gray-700 transition-colors">
                  <svg
                    className="text-primary-600 mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  janet.li@university.edu
                </p>
                <p className="font-body flex items-center text-gray-700">
                  <svg
                    className="text-primary-600 mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Department of Psychology
                  <br />
                  University of California
                  <br />
                  Los Angeles, CA 90095
                </p>
              </div>

              <h3 className="text-primary-800 font-heading text-xl font-semibold">
                Connect
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/janetli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 transform text-gray-600 transition-all hover:-translate-y-1"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/janetli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 transform text-gray-600 transition-all hover:-translate-y-1"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://scholar.google.com/citations?user=janetli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 transform text-gray-600 transition-all hover:-translate-y-1"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/janetli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 transform text-gray-600 transition-all hover:-translate-y-1"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right column with bio and information */}
          <div className="animate-slide-right md:col-span-3">
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <h2 className="font-heading text-primary-800 mb-3 text-2xl font-bold">
                  Background
                </h2>
                <p className="font-body leading-relaxed text-gray-700">
                  I am Janet Li, a PhD candidate in Clinical Psychology with a
                  focus on trauma-informed care and digital mental health
                  interventions. My research journey began at Stanford
                  University, where I completed my undergraduate studies in
                  Psychology with a minor in Computer Science. This
                  interdisciplinary background has shaped my unique approach to
                  mental health research.
                </p>
              </div>

              <div className="animate-fade-in rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <h2 className="font-heading text-primary-800 mb-3 text-2xl font-bold">
                  Research Focus
                </h2>
                <p className="font-body mb-4 leading-relaxed text-gray-700">
                  My research sits at the intersection of clinical psychology
                  and technology. I am particularly interested in how digital
                  interventions can be leveraged to improve accessibility and
                  effectiveness of mental health treatments, especially for
                  underserved populations. My dissertation explores how
                  cognitive behavioral therapy principles can be adapted for
                  digital platforms while maintaining therapeutic efficacy.
                </p>
                <p className="font-body leading-relaxed text-gray-700">
                  In addition to my primary research, I collaborate with
                  healthcare systems to implement trauma-informed approaches to
                  care. This work focuses on developing training programs for
                  healthcare providers to better recognize and respond to
                  patients with histories of trauma.
                </p>
              </div>

              <div className="animate-fade-in rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <h2 className="font-heading text-primary-800 mb-3 text-2xl font-bold">
                  Education
                </h2>
                <div className="space-y-4">
                  <div className="transform rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:-translate-y-1 hover:bg-white hover:shadow-md">
                    <div className="flex justify-between">
                      <h3 className="text-primary-700 font-heading font-semibold">
                        PhD in Clinical Psychology
                      </h3>
                      <span className="text-gray-600">2020 - Present</span>
                    </div>
                    <p className="font-body text-gray-700">
                      University of California, Los Angeles
                    </p>
                    <p className="font-body mt-2 text-sm text-gray-600">
                      Dissertation: "Digital Adaptations of Cognitive Behavioral
                      Therapy: Efficacy and Accessibility"
                    </p>
                  </div>

                  <div className="transform rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:-translate-y-1 hover:bg-white hover:shadow-md">
                    <div className="flex justify-between">
                      <h3 className="text-primary-700 font-heading font-semibold">
                        Master of Science in Psychology
                      </h3>
                      <span className="text-gray-600">2018 - 2020</span>
                    </div>
                    <p className="font-body text-gray-700">
                      Columbia University
                    </p>
                    <p className="font-body mt-2 text-sm text-gray-600">
                      Thesis: "Trauma-Informed Care in Primary Healthcare
                      Settings"
                    </p>
                  </div>

                  <div className="transform rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:-translate-y-1 hover:bg-white hover:shadow-md">
                    <div className="flex justify-between">
                      <h3 className="text-primary-700 font-heading font-semibold">
                        Bachelor of Arts in Psychology
                      </h3>
                      <span className="text-gray-600">2014 - 2018</span>
                    </div>
                    <p className="font-body text-gray-700">
                      Stanford University
                    </p>
                    <p className="font-body mt-2 text-sm text-gray-600">
                      Minor in Computer Science
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <h2 className="font-heading text-primary-800 mb-3 text-2xl font-bold">
                  Publications
                </h2>
                <div className="space-y-3">
                  <div className="rounded-lg p-3 transition-colors hover:bg-gray-50">
                    <p className="font-body text-gray-700">
                      <span className="font-medium">Li, J.</span>, Smith, A., &
                      Johnson, T. (2022). Digital interventions for anxiety
                      disorders: A meta-analysis.{" "}
                      <span className="italic">
                        Journal of Clinical Psychology, 78
                      </span>
                      (3), 412-428.
                    </p>
                  </div>
                  <div className="rounded-lg p-3 transition-colors hover:bg-gray-50">
                    <p className="font-body text-gray-700">
                      Williams, R., <span className="font-medium">Li, J.</span>,
                      & Thompson, E. (2021). Trauma-informed approaches in
                      healthcare: A systematic review.{" "}
                      <span className="italic">
                        Health Psychology Review, 15
                      </span>
                      (2), 219-237.
                    </p>
                  </div>
                  <div className="rounded-lg p-3 transition-colors hover:bg-gray-50">
                    <p className="font-body text-gray-700">
                      <span className="font-medium">Li, J.</span>, & Roberts, M.
                      (2020). Accessibility of mental health resources for
                      college students.{" "}
                      <span className="italic">
                        Journal of American College Health, 68
                      </span>
                      (5), 561-570.
                    </p>
                  </div>
                  <div className="rounded-lg p-3 transition-colors hover:bg-gray-50">
                    <p className="font-body text-gray-700">
                      Chen, H., <span className="font-medium">Li, J.</span>, &
                      Garcia, P. (2019). Technology-assisted therapy for
                      anxiety: User experience and clinical outcomes.{" "}
                      <span className="italic">
                        Cyberpsychology, Behavior, and Social Networking, 22
                      </span>
                      (1), 41-49.
                    </p>
                  </div>
                </div>

                <Link
                  href="/blog"
                  className="text-primary-600 hover:text-primary-700 group mt-6 inline-flex items-center font-medium"
                >
                  Read my latest research findings in the blog
                  <svg
                    className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
