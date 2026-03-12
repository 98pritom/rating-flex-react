import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import { backdropUrl } from "../utils/imageUrl";

export default function HeroBanner({ movie }) {
  if (!movie) return null;

  const bg = backdropUrl(movie.backdrop_path);

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[85vh]">
      {/* Backdrop image */}
      {bg && (
        <img
          src={bg}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-3 leading-tight drop-shadow-lg">
          {movie.title}
        </h1>

        <div className="flex items-center gap-3 mb-4 text-sm text-gray-300">
          <span className="bg-netflix-red text-white px-2 py-0.5 rounded text-xs font-semibold">
            ★ {movie.vote_average?.toFixed(1)}
          </span>
          <span>{movie.release_date?.split("-")[0]}</span>
        </div>

        <p className="text-gray-300 text-sm sm:text-base line-clamp-3 mb-6 leading-relaxed">
          {movie.overview}
        </p>

        <div className="flex gap-3">
          <Link
            to={`/movie/${movie.id}`}
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-md font-semibold hover:bg-gray-200 transition-colors"
          >
            <Play className="w-5 h-5 fill-current" />
            Details
          </Link>
          <Link
            to={`/movie/${movie.id}`}
            className="inline-flex items-center gap-2 bg-gray-500/50 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-gray-500/70 transition-colors"
          >
            <Info className="w-5 h-5" />
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
}
