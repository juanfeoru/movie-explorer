import MovieCard from "../components/home/MovieCard";
import type { Movie } from "../types/movies";
import EmptyState from "../components/ui/EmptyState";

interface FavoritesProps {
  favorites: Movie[];
  handleFavorites: (movie: Movie) => void;
}

export default function Favorites({
  favorites,
  handleFavorites,
}: FavoritesProps) {
  if (favorites.length === 0) {
    return (
      <EmptyState
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
        }
        title="No favorite movies"
        message="You haven't added any movies to your favorites yet."
      />
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Your collection
          </span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-primary-text sm:text-4xl">
            Your Favorites
          </h1>
          <p className="mt-2 text-sm text-secondary-text">
            Movies you've saved for later.
          </p>
          <p className="mt-1 text-xs text-muted-text">
            {favorites.length} {favorites.length === 1 ? "movie" : "movies"}{" "}
            saved
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((favorite) => (
            <MovieCard
              key={favorite.id}
              movie={favorite}
              handleFavorites={handleFavorites}
              isFavorite={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
