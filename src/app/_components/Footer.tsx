"use client";

import Link from "next/link";

/**
 * Footer component for Janet Li's blog
 * Includes site navigation, contact links, and copyright information
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About column */}
          <div className="animate-fade-in md:col-span-2">
            <h3 className="font-heading gradient-text text-lg font-semibold text-gray-900">
              Janet Li
            </h3>
            <p className="font-body mt-2 text-gray-600">
              PhD Candidate in Clinical Psychology researching digital mental
              health interventions and trauma-informed care approaches.
            </p>
            <p className="font-body mt-4 text-gray-600">
              University of California, Los Angeles
              <br />
              Department of Psychology
            </p>
          </div>

          {/* Quick links */}
          <div className="animate-slide-in">
            <h3 className="font-heading text-lg font-semibold text-gray-900">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-2">
              <li className="transform transition-transform hover:translate-x-1">
                <Link
                  href="/"
                  className="hover:text-primary-600 text-gray-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="transform transition-transform hover:translate-x-1">
                <Link
                  href="/blog"
                  className="hover:text-primary-600 text-gray-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li className="transform transition-transform hover:translate-x-1">
                <Link
                  href="/about"
                  className="hover:text-primary-600 text-gray-600 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="animate-slide-right">
            <h3 className="font-heading text-lg font-semibold text-gray-900">
              Connect
            </h3>
            <ul className="mt-2 space-y-2">
              <li className="transform transition-transform hover:translate-x-1">
                <a
                  href="mailto:janet.li@university.edu"
                  className="hover:text-primary-600 flex items-center text-gray-600 transition-colors"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  Email Me
                </a>
              </li>
              <li className="transform transition-transform hover:translate-x-1">
                <a
                  href="https://twitter.com/janetli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 flex items-center text-gray-600 transition-colors"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                  Twitter
                </a>
              </li>
              <li className="transform transition-transform hover:translate-x-1">
                <a
                  href="https://www.linkedin.com/in/janetli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 flex items-center text-gray-600 transition-colors"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li className="transform transition-transform hover:translate-x-1">
                <a
                  href="https://scholar.google.com/citations?user=janetli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 flex items-center text-gray-600 transition-colors"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                  </svg>
                  Google Scholar
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="max-w-md">
            <h3 className="font-heading text-lg font-semibold text-gray-900">
              Stay Updated
            </h3>
            <p className="font-body mt-2 text-gray-600">
              Subscribe to my newsletter for updates on my research and new blog
              posts.
            </p>
            <form className="animate-slide-in mt-4 sm:flex">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border-gray-300 px-4 py-2 transition-all hover:shadow-sm sm:max-w-xs"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 mt-3 flex w-full transform items-center justify-center rounded-lg px-4 py-2 font-medium text-white transition-all hover:-translate-y-0.5 sm:mt-0 sm:ml-3 sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} Janet Li. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            <a
              href="#"
              className="hover:text-primary-600 text-sm text-gray-500 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary-600 text-sm text-gray-500 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Footer link component
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="transition-transform hover:translate-x-1">
      <Link
        href={href}
        className="hover:text-primary-600 text-primary-200 transition-colors"
      >
        {children}
      </Link>
    </div>
  );
}
