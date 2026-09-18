import { Link } from "react-router";
import MovieCard from "../components/home/MovieCard";
import type { Movie } from "../types/movies";

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
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Your collection
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary-text sm:text-5xl">
            Your Favorites
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-secondary-text mb-8">
            You haven't added any movies to your favorites yet. Start exploring
            and save the movies you want to watch later.
          </p>

          <Link
            to="/"
            className="rounded-lg bg-accent px-5 py-3 text-sm font-medium text-primary-text transition hover:opacity-90 cursor-pointer"
          >
            Explore Movies
          </Link>
        </div>
      </section>
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
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
