import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { posterUrl } from "../utils/imageUrl";

const FALLBACK_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' fill='%231a1a1a'%3E%3Crect width='500' height='750'/%3E%3Ctext x='50%25' y='50%25' fill='%23555' font-size='20' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

export default function MovieCard({ item }) {
  const isTV = item.media_type === "tv" || item.first_air_date;
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const linkTo = isTV ? `/movie/${item.id}` : `/movie/${item.id}`;

  return (
    <Link
      to={linkTo}
      className="group relative w-[140px] flex-shrink-0 snap-start cursor-pointer sm:w-[160px] md:w-[180px] lg:w-[200px]"
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-md">
        <img
          src={posterUrl(item.poster_path, "w300") || FALLBACK_POSTER}
          alt={title}
          loading="lazy"
          className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
          <div className="p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
              <Star className="w-3 h-3 fill-current" />
              {item.vote_average?.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Title below poster */}
      <div className="mt-2 px-0.5">
        <h3 className="truncate text-sm font-medium text-gray-200 transition-colors group-hover:text-white">
          {title}
        </h3>
        {date && (
          <p className="text-xs text-gray-500 mt-0.5">{date.split("-")[0]}</p>
        )}
      </div>
    </Link>
  );
}
