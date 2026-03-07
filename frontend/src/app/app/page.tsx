"use client";

import { Zalando_Sans_Expanded, Lato } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MovieModal from "@/components/MovieModal";
import { useState, ChangeEvent, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import { Popcorn } from "lucide-react";

const zalando = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});


export type Movie = {
  id: number;
  original_title: string;
  overview: string;
  original_language: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
};

const Page = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movies/search?query=${encodeURIComponent(query)}`,
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      if (Array.isArray(data.data)) {
        setMovies(data.data);
      } else {
        setMovies([]);
        console.error("Unexpected response shape:", data);
      }
    } catch (error) {
      console.error("Could not search. Error: ", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    <div
      className={`w-full min-h-screen bg-linear-to-b from-white to-gray-50 ${zalando.className}`}
    >
      <div className="max-w-5xl mx-auto py-14 px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Discover Movies</h1>
          <p className={`mt-3 text-gray-500 ${lato.className}`}>
            Search across thousands of titles and build your{" "}
            <span className={`font-bold ${zalando.className}`}>SILVERARCHIVE</span>.
          </p>
        </div>

        <div className="flex gap-3 max-w-2xl mx-auto">
          <Input
            type="search"
            placeholder="Search any movie..."
            value={query}
            onChange={handleChange}
            className="h-12 rounded-xl"
          />
          <Button
            onClick={handleSearch}
            className="h-12 px-6 rounded-xl font-semibold"
          >
            Search
          </Button>
        </div>

        {loading && (
          <p className="mt-8 text-center text-gray-500 animate-pulse">
            Searching cinematic universe...
          </p>
        )}

        {!hasSearched && !loading && (
          <div className="mt-20 text-center text-gray-400">
            <div className="text-black mb-4 flex justify-center">
              <Popcorn size={64} />
            </div>
            <p>Start typing and uncover something legendary.</p>
          </div>
        )}

        {hasSearched && !loading && movies.length === 0 && (
          <div className="mt-20 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-gray-800">
              No movies found
            </h3>
            <p className="text-gray-400 mt-2">
              Try searching for something iconic.
            </p>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleCardClick}
              />
            );
          })}
        </div>

        {isOpen && selectedMovie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div
              className="absolute inset-0"
              onClick={() => setIsOpen(false)}
            />

            <div className="relative w-full max-h-[95vh] overflow-y-auto">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition"
              >
                ✕
              </button>

              <MovieModal
                movie={selectedMovie}
                onClose={() => setIsOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
