import { GENRES } from "../constants/genres";
import type { Movie } from "../types/movies";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  vote_average: number;
  genre_ids: number[];
}

interface TMDBMovieDetails {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  vote_average: number;
  genres: {
    id: number;
    name: string;
  }[];
  overview: string;
  runtime: number | null;
}

interface SearchMoviesResponse {
  movies: Movie[];
  page: number;
  totalPages: number;
}

export async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch(`${TMDB_BASE_URL}/movie/popular`, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data = await response.json();

  const movies = data.results.map(mapTMDBMovie);

  return movies;
}

export async function searchMovies(
  query: string,
  page: number,
): Promise<SearchMoviesResponse> {
  const encodedQuery = encodeURIComponent(query);

  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${encodedQuery}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch search movies");
  }

  const data = await response.json();

  const movies = data.results.map(mapTMDBMovie);

  return {
    movies,
    page: data.page,
    totalPages: data.total_pages,
  };
}

export async function getMovieDetails(id: number): Promise<Movie> {
  const response = await fetch(`${TMDB_BASE_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data: TMDBMovieDetails = await response.json();

  const movie = {
    id: data.id,
    title: data.title,
    poster: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : "/placeholder-movie.jpg",
    year: data.release_date ? Number(data.release_date.split("-")[0]) : 0,
    genres: data.genres.map((genre) => genre.name),
    rating: data.vote_average,
    overview: data.overview,
    runtime: data.runtime ?? undefined,
  };

  return movie;
}

function mapTMDBMovie(movie: TMDBMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/placeholder-movie.jpg",
    year: movie.release_date ? Number(movie.release_date.split("-")[0]) : 0,
    genres: movie.genre_ids.map((genreId) => GENRES[genreId] ?? "Unknown"),
    rating: movie.vote_average,
  };
}
