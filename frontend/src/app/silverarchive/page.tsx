"use client";

import { Zalando_Sans_Expanded } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import SilverArchiveModal from "@/components/SilverArchiveModal";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export type ArchiveMovie = {
  _id: string;
  tmdbMovieId: number;

  original_title: string;
  overview: string;
  original_language: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;

  status: "planned" | "watching" | "completed";
  rating: number;
  note?: string;
  watchedAt: string;
};

const zalando = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SilverArchivePage = () => {
  const [movies, setMovies] = useState<ArchiveMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<ArchiveMovie | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/movies`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setMovies(res.data.data);
      } catch (error) {
        console.error("Failed to load SILVERARCHIVE:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArchive();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your cinematic vault...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-linear-to-b from-white to-gray-50 px-6 py-14 ${zalando.className}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">SILVERARCHIVE</h1>
          <p className="text-gray-500 mt-3">Your personal cinematic memory.</p>
        </div>

        {movies.length === 0 && (
          <div className="mt-20 text-center text-gray-400">
            <div className="text-black mb-4 flex justify-center">
              <Clapperboard className="text-center" size={64} />
            </div>
            <p>Your archive is empty.</p>
            <div className="mt-16">
              <Link href={"app/"} className="bg-black font-bold text-white p-4 rounded-3xl">
                Add Movies &rarr;
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {movies.map((movie) => {
            const mappedMovie = {
              id: movie.tmdbMovieId,
              original_title: movie.original_title,
              overview: movie.overview,
              original_language: movie.original_language,
              backdrop_path: movie.backdrop_path,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
            };

            return (
              <div key={movie._id} className="relative">
                <MovieCard
                  movie={mappedMovie}
                  onClick={() => {
                    setSelectedMovie(movie);
                    setIsOpen(true);
                  }}
                />

                <div className="absolute top-4 right-4 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                  {movie.rating} / 10
                </div>

                <div className="absolute bottom-4 left-4 bg-white/90 text-black text-xs px-3 py-1 rounded-full shadow">
                  {movie.status.toUpperCase()}
                </div>
              </div>
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

              <SilverArchiveModal
                movie={selectedMovie}
                onClose={() => setIsOpen(false)}
                onDeleted={() => {
                  setMovies((prev) =>
                    prev.filter((m) => m._id !== selectedMovie._id),
                  );
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SilverArchivePage;
