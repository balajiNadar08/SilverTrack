"use client";

import { useState } from "react";
import { Zalando_Sans_Expanded } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const zalando = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`w-full border-b border-gray-200 bg-[#F8F9FA] ${zalando.className}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative flex h-16 items-center">
          
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              <Link
                className="text-gray-600 hover:text-gray-900 transition"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 transition"
                href="/about-dev"
              >
                About DEV
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 transition"
                href="/report"
              >
                Report
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center rounded-md p-2 text-gray-600 hover:bg-gray-100 transition"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-800 tracking-wide"
            >
              SILVERTRACK
            </Link>
          </div>

          <div className="ml-auto hidden md:flex items-center">
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="space-y-3 px-4 py-4">
            <Link
              className="block text-gray-600 hover:text-gray-900 transition"
              href="/"
            >
              Home
            </Link>
            <Link
              className="block text-gray-600 hover:text-gray-900 transition"
              href="/about-dev"
            >
              About DEV
            </Link>
            <Link
              className="block text-gray-600 hover:text-gray-900 transition"
              href="/report"
            >
              Report
            </Link>

            <div className="pt-4">
              <Button className="w-full">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
