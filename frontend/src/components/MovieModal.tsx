import { Movie } from "@/app/app/page";
import { useState } from "react";

type Props = {
  movie: Movie;
  onClose: () => void;
};

const MovieModal = ({ movie, onClose }: Props) => {
  const [status, setStatus] = useState("plan");
  const [rating, setRating] = useState<number | null>(null);
  const [watchedAt, setWatchedAt] = useState("");
  const [note, setNote] = useState("");
  const [expanded, setExpanded] = useState(false);

  const overview = movie.overview || "No overview available.";
  const isLong = overview.length > 120;
  const displayedText =
    !expanded && isLong ? overview.slice(0, 120).trimEnd() + "…" : overview;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div className="flex flex-col">
      {backdropUrl && (
        <div className="h-36 w-full rounded-xl overflow-hidden mb-5">
          <img
            src={backdropUrl}
            alt="Backdrop"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex gap-5">
        <div className="w-32 shrink-0 flex flex-col">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.original_title}
              className="rounded-xl shadow-lg w-full object-cover"
            />
          ) : (
            <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}

          <div className="mt-3 text-xs text-gray-500 space-y-1">
            <p>
              <strong>Year:</strong> {releaseYear}
            </p>
            <p>
              <strong>Lang:</strong> {movie.original_language.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <div className="text-xs text-gray-600 leading-relaxed">
            <span>{displayedText}</span>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="ml-1 text-black font-semibold hover:underline whitespace-nowrap"
              >
                {expanded ? "SHOW LESS-" : "READ MORE+"}
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            >
              <option value="completed">Completed</option>
              <option value="plan">Plan to Watch</option>
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
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Rate 1-10"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Watched On</label>
            <input
              type="date"
              value={watchedAt}
              onChange={(e) => setWatchedAt(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Notes</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full border rounded-lg p-2 resize-none text-sm"
              placeholder="Your thoughts..."
            />
          </div>

          <button
            className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:opacity-90 transition"
            onClick={onClose}
          >
            Save to SILVERARCHIVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
