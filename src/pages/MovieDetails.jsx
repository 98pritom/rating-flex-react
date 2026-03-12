import { useParams } from "react-router-dom";
import { useState } from "react";
import { Star, Calendar, Clock, Play } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { getMovieDetails, getMovieCredits, getMovieVideos } from "../api/tmdb";
import { backdropUrl, posterUrl } from "../utils/imageUrl";
import Loader from "../components/Loader";

export default function MovieDetails() {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);

  const { data: movie, loading, error } = useFetch(() => getMovieDetails(id), [id]);
  const { data: credits } = useFetch(() => getMovieCredits(id), [id]);
  const { data: videos } = useFetch(() => getMovieVideos(id), [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 pt-24">{error}</div>;
  if (!movie) return null;

  const trailer = videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const cast = credits?.cast?.slice(0, 12) || [];
  const backdrop = backdropUrl(movie.backdrop_path);
  const poster = posterUrl(movie.poster_path);

  return (
    <div className="min-h-screen">
      {/* Trailer modal */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-lg hover:text-netflix-red"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh]">
        {backdrop && (
          <img
            src={backdrop}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/30" />
      </div>

      {/* Movie Info */}
      <div className="relative z-10 -mt-40 sm:-mt-52 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          {/* Poster */}
          {poster && (
            <img
              src={poster}
              alt={movie.title}
              className="w-48 sm:w-56 lg:w-64 rounded-lg shadow-2xl self-center sm:self-start flex-shrink-0"
            />
          )}

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3">
              {movie.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-300 mb-4">
              <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                <Star className="w-4 h-4 fill-current" />
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {movie.release_date}
              </span>
              {movie.runtime > 0 && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-5">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="bg-dark-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">
              {movie.overview}
            </p>

            {/* Play Trailer button */}
            {trailer && (
              <button
                onClick={() => setShowTrailer(true)}
                className="inline-flex items-center gap-2 bg-netflix-red hover:bg-netflix-red-hover text-white px-6 py-3 rounded-md font-semibold transition-colors"
              >
                <Play className="w-5 h-5 fill-current" />
                Play Trailer
              </button>
            )}
          </div>
        </div>

        {/* Cast Section */}
        {cast.length > 0 && (
          <div className="mt-12 mb-16">
            <h2 className="text-xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {cast.map((person) => (
                <div key={person.credit_id} className="text-center">
                  <img
                    src={
                      person.profile_path
                        ? posterUrl(person.profile_path, "w200")
                        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' fill='%231a1a1a'%3E%3Crect width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%23555' font-size='14' text-anchor='middle' dy='.3em'%3ENo Photo%3C/text%3E%3C/svg%3E"
                    }
                    alt={person.name}
                    loading="lazy"
                    className="w-full aspect-[2/3] object-cover rounded-md mb-2"
                  />
                  <p className="text-sm font-medium truncate">{person.name}</p>
                  <p className="text-xs text-gray-500 truncate">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
