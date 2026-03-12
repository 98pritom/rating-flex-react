import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import useFetch from "../hooks/useFetch";
import {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getPopularTV,
} from "../api/tmdb";

export default function Home() {
  const { data: trending, loading: trendingLoading } = useFetch(getTrending, []);
  const { data: popular, loading: popularLoading } = useFetch(getPopularMovies, []);
  const { data: topRated, loading: topRatedLoading } = useFetch(getTopRatedMovies, []);
  const { data: upcoming, loading: upcomingLoading } = useFetch(getUpcomingMovies, []);
  const { data: tv, loading: tvLoading } = useFetch(getPopularTV, []);

  // Pick a random trending movie for the hero banner
  const heroMovie = trending?.results?.[Math.floor(Math.random() * Math.min(5, trending?.results?.length || 1))];

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner movie={heroMovie} />

      {/* Movie Rows */}
      <div className="-mt-16 relative z-10 space-y-2">
        <MovieRow
          title="🔥 Trending This Week"
          movies={trending?.results}
          loading={trendingLoading}
        />
        <MovieRow
          title="🎬 Popular Movies"
          movies={popular?.results}
          loading={popularLoading}
        />
        <MovieRow
          title="⭐ Top Rated"
          movies={topRated?.results}
          loading={topRatedLoading}
        />
        <MovieRow
          title="🎥 Upcoming Movies"
          movies={upcoming?.results}
          loading={upcomingLoading}
        />
        <MovieRow
          title="📺 Popular TV Shows"
          movies={tv?.results}
          loading={tvLoading}
        />
      </div>
    </div>
  );
}
