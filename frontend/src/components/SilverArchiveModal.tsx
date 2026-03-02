"use client";

import { useState } from "react";
import axios from "axios";

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

type Props = {
  movie: ArchiveMovie;
  onClose: () => void;
  onDeleted: () => void;
  onEdit?: () => void;
};

const SilverArchiveModal = ({ movie, onClose, onDeleted, onEdit }: Props) => {
  const [loading, setLoading] = useState(false);

  const overview = movie.overview || "No overview available.";
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const watchedDate = movie.watchedAt
    ? new Date(movie.watchedAt).toLocaleDateString()
    : "N/A";

  const handleDelete = async () => {
    const confirmDelete = confirm("Delete this movie from SILVERARCHIVE?");
    if (!confirmDelete) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not authenticated.");
        return;
      }

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/movies/${movie._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        onDeleted();
        onClose();
      } else {
        alert(response.data.message || "Delete failed.");
      }
    } catch (err: any) {
      console.error("Delete error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete movie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
      {backdropUrl && (
        <div className="relative h-48 sm:h-64 md:h-80 w-full">
          <img
            src={backdropUrl}
            alt="Backdrop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-white via-white/70 to-transparent" />
        </div>
      )}

      <div className="px-4 sm:px-8 py-6 -mt-16 relative">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-40 sm:w-48 md:w-56 shrink-0 mx-auto md:mx-0">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.original_title}
                className="rounded-2xl shadow-xl w-full object-cover"
              />
            ) : (
              <div className="h-72 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                {movie.original_title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {releaseYear} • {movie.original_language.toUpperCase()}
              </p>
            </div>

            <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {overview}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Status:</span> {movie.status}
              </div>

              <div>
                <span className="font-semibold">Rating: </span>
                {movie.rating || "N/A"} / 10
              </div>

              <div>
                <span className="font-semibold">Watched On:</span> {watchedDate}
              </div>
            </div>

            {movie.note && (
              <div className="text-sm bg-gray-50 p-4 rounded-xl">
                <span className="font-semibold">Notes:</span>
                <p className="mt-2">{movie.note}</p>
              </div>
            )}

            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-3 rounded-2xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SilverArchiveModal;
