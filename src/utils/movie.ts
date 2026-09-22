import { GENRES } from "../constants/genres";
import type { Movie } from "../types/movies";

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  vote_average: number;
  genre_ids: number[];
}

export function mapTMDBMovie(movie: TMDBMovie): Movie {
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
