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

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner movies={trending?.results} />

      {/* Movie Rows */}
      <div className="relative z-10 mx-auto mt-6 max-w-7xl space-y-4 px-0 pb-4 sm:mt-8 sm:space-y-5">
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
