import type { Movie } from "../../types/movies";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  handleFavorites: (movie: Movie) => void;
  favorites: Movie[];
}

export default function MovieGrid({
  movies,
  handleFavorites,
  favorites,
}: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => {
        const isFavorite = favorites.some(
          (favorite) => favorite.id === movie.id,
        );

        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            handleFavorites={handleFavorites}
            isFavorite={isFavorite}
          />
        );
      })}
    </div>
  );
}
