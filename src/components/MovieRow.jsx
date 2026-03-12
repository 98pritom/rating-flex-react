import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies, loading }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const amount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mb-4 sm:mb-6">
      <h2 className="mb-3 px-4 text-lg font-bold sm:px-6 sm:text-xl lg:px-8">
        {title}
      </h2>

      <div className="group/row relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:left-2 sm:opacity-0 sm:group-hover/row:opacity-100"
          aria-label="Scroll left"
          type="button"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Scrollable row */}
        <div
          ref={rowRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[140px] flex-shrink-0 sm:w-[160px] md:w-[180px] lg:w-[200px]"
                >
                  <div className="skeleton rounded-md w-full aspect-[2/3]" />
                  <div className="skeleton rounded mt-2 h-4 w-3/4" />
                </div>
              ))
            : movies?.map((movie) => (
                <MovieCard key={movie.id} item={movie} />
              ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:right-2 sm:opacity-0 sm:group-hover/row:opacity-100"
          aria-label="Scroll right"
          type="button"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
