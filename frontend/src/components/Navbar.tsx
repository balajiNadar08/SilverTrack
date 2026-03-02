"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zalando_Sans_Expanded } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const zalando = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface User {
  id: string;
  email: string;
  name?: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("authChanged", loadUser);

    return () => {
      window.removeEventListener("authChanged", loadUser);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.dispatchEvent(new Event("authChanged"));

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav
      className={`w-full border-b border-gray-200 bg-[#F8F9FA] ${zalando.className}`}
    >
      <div className="mx-auto px-4 lg:max-w-7xl lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="hidden md:flex items-center space-x-8">
            <Link
              className="text-gray-600 hover:text-gray-900 transition"
              href="/"
            >
              Home
            </Link>

            <Link
              className="text-gray-600 font-bold hover:text-gray-900 transition"
              href="/silverarchive"
            >
              SILVERARCHIVE
            </Link>

            <Link
              className="text-gray-600 hover:text-gray-900 transition"
              href="/about-dev"
            >
              About DEV
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
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

          {/* CENTER LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              href="/app"
              className="text-2xl font-bold text-gray-800 tracking-wide"
            >
              SILVERTRACK
            </Link>
          </div>

          {/* RIGHT SIDE (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              className="text-gray-600 hover:text-gray-900 transition"
              href="/report"
            >
              Report
            </Link>

            {user ? (
              <>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-lg font-semibold border border-gray-300">
                  {user.name?.toUpperCase()[0] ||
                    user.email?.toUpperCase()[0]}
                </span>

                <Button onClick={handleLogout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="space-y-4 px-4 py-4">

            <Link
              className="block text-gray-600 hover:text-gray-900 transition"
              href="/"
            >
              Home
            </Link>

            <Link
              className="block text-gray-600 font-bold hover:text-gray-900 transition"
              href="/silverarchive"
            >
              SILVERARCHIVE
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

            <div className="pt-4 space-y-3">
              {user ? (
                <div className="flex flex-col items-center gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-lg font-semibold border border-gray-300">
                    {user.name?.toUpperCase()[0] ||
                      user.email?.toUpperCase()[0]}
                  </span>

                  <Button
                    onClick={handleLogout}
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link href="/auth/login">
                  <Button className="w-full">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;