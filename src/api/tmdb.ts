import type { Movie } from "../types/movies";
import { mapTMDBMovie } from "../utils/movie";

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
  const response = await fetch("/api/movies");

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
    `/api/movies?type=search&query=${encodedQuery}&page=${page}`,
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
  const response = await fetch(`/api/movies?type=details&id=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data: TMDBMovieDetails = await response.json();

  return {
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
}
