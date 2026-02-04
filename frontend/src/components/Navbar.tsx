"use client";

import { useState } from "react";
import { Zalando_Sans_Expanded } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
        <div className="flex h-16 items-center">

          <div className="flex flex-1 items-center">
            <div className="hidden md:flex space-x-8">
              <Link className="text-gray-600 hover:text-gray-900" href="/">
                Home
              </Link>
              <Link className="text-gray-600 hover:text-gray-900" href="/about-dev">
                About DEV
              </Link>
              <Link className="text-gray-600 hover:text-gray-900" href="/report">
                Report
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center rounded-md p-2 text-gray-600 hover:bg-gray-100"
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

          <div className="flex flex-1 justify-center">
            <span className="text-2xl font-bold text-gray-800">
              SilverTrack
            </span>
          </div>

          <div className="hidden md:flex flex-1 justify-end">
            <Field orientation="horizontal">
              <Input
                type="search"
                placeholder="Search..."
                className="w-40 lg:w-56"
              />
              <Button className="cursor-pointer">Search</Button>
            </Field>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="space-y-3 px-4 py-4">
            <a className="block text-gray-600 hover:text-gray-900" href="#">
              Home
            </a>
            <a className="block text-gray-600 hover:text-gray-900" href="#">
              About
            </a>
            <a className="block text-gray-600 hover:text-gray-900" href="#">
              Services
            </a>
            <a className="block text-gray-600 hover:text-gray-900" href="#">
              Contact
            </a>

            <Field orientation="horizontal">
              <Input type="search" placeholder="Search..." />
              <Button>Search</Button>
            </Field>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
