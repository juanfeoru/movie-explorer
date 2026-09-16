import type { Movie } from "../../data/movies";
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
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Explore
            </span>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-primary-text sm:text-3xl">
              Popular Movies
            </h2>
          </div>

          <button className="hidden text-sm font-medium text-secondary-text transition hover:text-primary-text sm:block cursor-pointer">
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
      </div>
    </section>
  );
}
