import axios from "axios";

const BASE_URL = import.meta.env.BASE_URL_API || import.meta.env.BASE_URL || "https://api.themoviedb.org/3";
const BEARER_TOKEN = import.meta.env.TMDB_BEARER_TOKEN;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// -- Movie endpoints --

export const getTrending = (timeWindow = "week") =>
  tmdb.get(`/trending/movie/${timeWindow}`);

export const getPopularMovies = (page = 1) =>
  tmdb.get("/movie/popular", { params: { page } });

export const getTopRatedMovies = (page = 1) =>
  tmdb.get("/movie/top_rated", { params: { page } });

export const getUpcomingMovies = (page = 1) =>
  tmdb.get("/movie/upcoming", { params: { page } });

export const getMovieDetails = (id) =>
  tmdb.get(`/movie/${id}`);

export const getMovieCredits = (id) =>
  tmdb.get(`/movie/${id}/credits`);

export const getMovieVideos = (id) =>
  tmdb.get(`/movie/${id}/videos`);

// -- TV endpoints --

export const getPopularTV = (page = 1) =>
  tmdb.get("/tv/popular", { params: { page } });

// -- Search --

export const searchMulti = (query, page = 1) =>
  tmdb.get("/search/multi", { params: { query, page } });

export default tmdb;
