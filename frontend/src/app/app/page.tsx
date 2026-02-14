"use client";

import { Zalando_Sans_Expanded, Lato } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, ChangeEvent } from "react";

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

type Movie = {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/movies/search?query=${encodeURIComponent(query)}`,
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      if (Array.isArray(data.data)) {
        setMovies(data.data);
      } else {
        console.error("Unexpected response shape:", data);
      }
    } catch (error) {
      console.error("Could not search. Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full  ${zalando.className}`}>
      <div className="max-w-5xl mx-auto py-10 px-6">
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Search any movie..."
            value={query}
            onChange={handleChange}
          />
          <Button className="cursor-pointer" onClick={handleSearch}>
            Search
          </Button>
        </div>

        {loading && <p className="mt-4">Loading...</p>}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {movies.map((movie) => {
            const posterUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : null;

            return (
              <div
                key={movie.id}
                className="flex gap-4 bg-[#F8F9FA] border-2 p-4 rounded-xl cursor-pointer"
              >
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={movie.original_title}
                    className="w-28 h-40 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-28 h-40 bg-zinc-800 rounded-md flex items-center justify-center text-sm">
                    No Image Available
                  </div>
                )}

                <div className="flex flex-col">
                  <h3 className="text-lg font-bold">{movie.original_title}</h3>
                  <p className="text-sm text-gray-900">{movie.release_date}</p>
                  <p className="text-sm mt-2 line-clamp-4">{movie.overview}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
