import { Movie } from "@/app/app/page";
import { useState } from "react";
import axios from "axios";

type Props = {
  movie: Movie;
  onClose: () => void;
};

const MovieModal = ({ movie, onClose }: Props) => {
  const [status, setStatus] = useState("completed");
  const [rating, setRating] = useState<number | null>(null);
  const [watchedAt, setWatchedAt] = useState("");
  const [note, setNote] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const overview = movie.overview || "No overview available.";
  const isLong = overview.length > 180;
  const displayedText =
    !expanded && isLong ? overview.slice(0, 180).trimEnd() + "…" : overview;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/movies`,
        {
          tmdbMovieId: movie.id,
          status,
          rating,
          note,
          watchedAt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      onClose();
      alert("Movie added to SILVERARCHIVE. Find it in the menu → SILVERARCHIVE.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save movie. Please add a rating before saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl"
    >
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
              {displayedText}
              {isLong && (
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="ml-2 font-semibold text-black hover:underline"
                >
                  {expanded ? "Show Less" : "Read More"}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded-xl p-2 text-sm focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="completed">Completed</option>
                  <option value="planned">Plan to Watch</option>
                  <option value="watching">Watching</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Rating</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rating ?? ""}
                  onChange={(e) =>
                    setRating(e.target.value ? Number(e.target.value) : null)
                  }
                  className="w-full border rounded-xl p-2 text-sm focus:ring-2 focus:ring-black outline-none"
                  placeholder="Rating / Expectation (1–10)"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Watched On
                </label>
                <input
                  type="date"
                  value={watchedAt}
                  onChange={(e) => setWatchedAt(e.target.value)}
                  className="w-full border rounded-xl p-2 text-sm focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-1">Notes</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  className="w-full border rounded-xl p-2 resize-none text-sm focus:ring-2 focus:ring-black outline-none"
                  placeholder="Your thoughts..."
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-2xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save to SILVERARCHIVE"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MovieModal;
