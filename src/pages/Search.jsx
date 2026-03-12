import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { searchMulti } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const observerRef = useRef(null);

  const fetchResults = useCallback(async (q, p) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await searchMulti(q, p);
      const filtered = res.data.results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );
      setResults((prev) => (p === 1 ? filtered : [...prev, ...filtered]));
      setTotalPages(res.data.total_pages);
      setHasSearched(true);
    } catch {
      // Silently handle error
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial search from URL params
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setPage(1);
      fetchResults(initialQuery, 1);
    }
  }, [initialQuery, fetchResults]);

  // Handle form submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      setPage(1);
      fetchResults(query.trim(), 1);
    }
  };

  // Infinite scroll observer
  const lastCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchResults(query, nextPage);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, page, totalPages, query, fetchResults]
  );

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies or TV shows..."
            className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-netflix-red transition-colors text-lg"
            autoFocus
          />
        </div>
      </form>

      {/* Results */}
      {loading && page === 1 ? (
        <Loader />
      ) : results.length > 0 ? (
        <>
          <p className="text-gray-400 mb-4 text-sm">
            Showing results for &ldquo;{searchParams.get("q")}&rdquo;
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {results.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                ref={i === results.length - 1 ? lastCardRef : null}
              >
                <MovieCard item={item} />
              </div>
            ))}
          </div>
          {loading && page > 1 && (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </>
      ) : hasSearched ? (
        <div className="text-center text-gray-400 pt-16">
          <p className="text-xl">No results found</p>
          <p className="text-sm mt-2">Try searching for something else</p>
        </div>
      ) : (
        <div className="text-center text-gray-500 pt-16">
          <SearchIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-xl">Search for movies and TV shows</p>
        </div>
      )}
    </div>
  );
}
