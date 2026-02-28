import { Movie } from "@/app/app/page";

type MovieCardProps = {
  movie: Movie;
  onClick: (movie: Movie) => void;
};

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div
      onClick={() => onClick(movie)}
      className="cursor-pointer group flex gap-5 bg-white p-5 rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      <div className="shrink-0 w-28 h-40 rounded-2xl overflow-hidden bg-gray-100">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.original_title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 text-center px-2">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {movie.original_title || "Untitled"}
        </h3>

        <span className="text-xs text-gray-400 mt-1 tracking-wide">
          {releaseYear} • {movie.original_language?.toUpperCase()}
        </span>

        <p className="text-sm text-gray-500 mt-3 line-clamp-4 leading-relaxed">
          {movie.overview || "No overview available."}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
