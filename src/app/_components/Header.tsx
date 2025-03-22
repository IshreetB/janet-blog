"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

/**
 * Header component for Janet Li's blog
 * Includes navigation links and responsive mobile menu
 */
export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  // Add dashboard link if user is authenticated
  const userNavigation = session
    ? [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Sign out", href: "#", onClick: () => signOut() },
      ]
    : [{ name: "Sign in", href: "/login" }];

  // Check if the current path matches the navigation item
  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") {
      return false;
    }
    return pathname?.startsWith(path);
  };

  // Update header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-10 w-full transition-all duration-400 ${
        isScrolled
          ? "bg-opacity-90 bg-white shadow-md backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="font-heading hover:text-primary-600 text-xl font-bold text-gray-900 transition-all hover:scale-105"
            >
              Janet Li
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navigation.map((item) => (
                <li key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className={`hover:text-primary-600 font-medium transition-all ${
                      isActive(item.href) ? "text-primary-600" : "text-gray-600"
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <span className="bg-primary-500 animate-slide-in absolute -bottom-1 left-0 h-0.5 w-full"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User menu (desktop) */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {userNavigation.map((item) => (
                <div key={item.name}>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:shadow-sm"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                        item.name === "Dashboard"
                          ? "bg-primary-600 hover:bg-primary-700 transform text-white hover:-translate-y-0.5"
                          : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="hover:text-primary-600 text-gray-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6 rotate-90 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="animate-fade-in md:hidden">
            <div className="border-t border-gray-200 py-4">
              <ul className="space-y-4">
                {navigation.map((item) => (
                  <li key={item.name} className="relative">
                    <Link
                      href={item.href}
                      className={`block font-medium transition-colors ${
                        isActive(item.href)
                          ? "text-primary-600"
                          : "hover:text-primary-600 text-gray-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="flex items-center">
                        {item.name}
                        {isActive(item.href) && (
                          <span className="bg-primary-500 ml-2 h-1 w-1 rounded-full"></span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
                {userNavigation.map((item) => (
                  <li key={item.name}>
                    {item.onClick ? (
                      <button
                        onClick={() => {
                          item.onClick?.();
                          setIsMobileMenuOpen(false);
                        }}
                        className="hover:text-primary-600 block w-full text-left font-medium text-gray-600 transition-colors"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block font-medium transition-colors ${
                          item.name === "Dashboard"
                            ? "text-primary-600 hover:text-primary-700"
                            : "hover:text-primary-600 text-gray-600"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
