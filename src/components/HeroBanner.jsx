import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { backdropUrl } from "../utils/imageUrl";

const AUTO_SLIDE_MS = 7000;

export default function HeroBanner({ movie, movies = [] }) {
  const bannerMovies = useMemo(() => {
    const source = Array.isArray(movies) && movies.length ? movies : movie ? [movie] : [];
    return source.filter((item) => item?.backdrop_path).slice(0, 8);
  }, [movie, movies]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const safeActiveIndex = activeIndex % bannerMovies.length;

  useEffect(() => {
    if (bannerMovies.length <= 1 || isPaused) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bannerMovies.length);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(timer);
  }, [bannerMovies.length, isPaused]);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + bannerMovies.length) % bannerMovies.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % bannerMovies.length);
  };

  if (!bannerMovies.length) return null;

  return (
    <section
      className="group/hero relative w-full overflow-hidden h-[62vh] sm:h-[68vh] lg:h-[78vh]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-label="Featured movies"
    >
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${safeActiveIndex * 100}%)` }}
      >
        {bannerMovies.map((currentMovie) => {
          const bg = backdropUrl(currentMovie.backdrop_path);

          return (
            <article key={currentMovie.id} className="relative h-full min-w-full">
              {bg && (
                <img
                  src={bg}
                  alt={currentMovie.title || currentMovie.name || "Featured movie"}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-900/85 via-dark-900/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8 lg:pb-14">
                <div className="max-w-xl sm:max-w-2xl">
                  <h1 className="text-2xl font-extrabold leading-tight drop-shadow-lg sm:text-4xl lg:text-6xl">
                    {currentMovie.title || currentMovie.name || "Featured"}
                  </h1>

                  <div className="mb-4 mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-300 sm:text-sm">
                    <span className="rounded bg-netflix-red px-2 py-0.5 text-xs font-semibold text-white">
                      ★ {currentMovie.vote_average?.toFixed(1)}
                    </span>
                    <span>{currentMovie.release_date?.split("-")[0] || currentMovie.first_air_date?.split("-")[0]}</span>
                  </div>

                  <p className="mb-5 max-w-xl text-sm leading-relaxed text-gray-200 line-clamp-2 sm:line-clamp-3 sm:text-base">
                    {currentMovie.overview}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/movie/${currentMovie.id}`}
                      className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-200 sm:px-6 sm:py-2.5 sm:text-base"
                    >
                      <Play className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
                      Details
                    </Link>
                    <Link
                      to={`/movie/${currentMovie.id}`}
                      className="inline-flex items-center gap-2 rounded-md bg-gray-500/45 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-gray-500/65 sm:px-6 sm:py-2.5 sm:text-base"
                    >
                      <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {bannerMovies.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white backdrop-blur-md transition-all hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:left-4 sm:opacity-0 sm:group-hover/hero:opacity-100"
            aria-label="Show previous featured movie"
            type="button"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white backdrop-blur-md transition-all hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:right-4 sm:opacity-0 sm:group-hover/hero:opacity-100"
            aria-label="Show next featured movie"
            type="button"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center gap-1.5 sm:bottom-4">
        {bannerMovies.map((item, index) => (
          <span
            key={item.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === safeActiveIndex ? "w-6 bg-white/90" : "w-2 bg-white/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
