import { redirect } from "next/navigation";
import { HydrateClient } from "~/trpc/server";
import Image from "next/image";
import Link from "next/link";
// import DashboardContent from "../_components/DashboardContent";
// import { auth } from "~/server/auth";

/**
 * Dashboard page metadata
 */
export const metadata = {
  title: "Dashboard | Janet Li's Research Blog",
  description: "Manage your blog posts and content",
};

/**
 * Dashboard page component
 * Restricted to authenticated users
 */
export default function DashboardPage() {
  // Temporarily skipping authentication
  // const session = await auth();
  // if (!session?.user) {
  //   redirect("/api/auth/signin");
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src="/images/avatar.jpg"
                  alt="User Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">Janet Li</p>
                <p className="text-sm text-gray-500">Researcher</p>
              </div>
            </div>

            <nav className="mt-8 space-y-1">
              <Link
                href="/dashboard"
                className="bg-primary-50 text-primary-700 hover:bg-primary-100 flex transform items-center rounded-lg px-4 py-2 transition-all hover:-translate-y-0.5"
              >
                <svg
                  className="mr-3 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Blog Posts
              </Link>
              <Link
                href="#"
                className="flex transform items-center rounded-lg px-4 py-2 text-gray-600 transition-all hover:-translate-y-0.5 hover:bg-gray-50"
              >
                <svg
                  className="mr-3 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Calendar
              </Link>
              <Link
                href="#"
                className="flex transform items-center rounded-lg px-4 py-2 text-gray-600 transition-all hover:-translate-y-0.5 hover:bg-gray-50"
              >
                <svg
                  className="mr-3 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-heading text-2xl font-bold text-gray-900">
              Dashboard
            </h1>
            <div className="flex space-x-3">
              <Link
                href="/blog"
                className="inline-flex transform items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-50 hover:text-gray-900"
              >
                View Blog
              </Link>
              <button className="bg-primary-600 hover:bg-primary-700 inline-flex transform items-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5">
                <svg
                  className="mr-2 -ml-1 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create New Post
              </button>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="transform overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-primary-100 text-primary-600 flex h-12 w-12 items-center justify-center rounded-md">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Published Posts
                      </dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">
                          12
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="transform overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-yellow-100 text-yellow-600">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Total Views
                      </dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">
                          4,823
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="transform overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-purple-100 text-purple-600">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Draft Posts
                      </dt>
                      <dd>
                        <div className="text-lg font-bold text-gray-900">5</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="mb-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <h2 className="font-heading text-xl font-bold text-gray-900">
                Recent Posts
              </h2>
              <div className="mt-3 flex sm:mt-0">
                <select
                  id="location"
                  name="location"
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:outline-none sm:text-sm"
                  defaultValue="all"
                >
                  <option value="all">All Posts</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 shadow-sm sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                          >
                            Date
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {[
                          {
                            title: "Understanding Cognitive Biases in Therapy",
                            status: "Published",
                            date: "March 15, 2023",
                          },
                          {
                            title: "Digital Interventions for Anxiety",
                            status: "Published",
                            date: "February 10, 2023",
                          },
                          {
                            title: "Trauma-Informed Research Methods",
                            status: "Draft",
                            date: "January 22, 2023",
                          },
                          {
                            title:
                              "The Role of Mindfulness in Depression Treatment",
                            status: "Published",
                            date: "December 5, 2022",
                          },
                          {
                            title: "Ethics in Psychological Research",
                            status: "Draft",
                            date: "November 12, 2022",
                          },
                        ].map((post, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {post.title}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                  post.status === "Published"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {post.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                              {post.date}
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                              <a
                                href="#"
                                className="text-primary-600 hover:text-primary-900 mr-3"
                              >
                                Edit
                              </a>
                              <a
                                href="#"
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Post */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <h3 className="font-heading mb-4 text-lg font-medium text-gray-900">
              Quick Post
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="Write your thoughts..."
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="publish"
                    name="publish"
                    type="checkbox"
                    className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300"
                  />
                  <label
                    htmlFor="publish"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Publish immediately
                  </label>
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 inline-flex transform items-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5">
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
