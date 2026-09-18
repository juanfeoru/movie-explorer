import Hero from "../components/home/Hero";
import MovieGrid from "../components/home/MovieGrid";
import type { Movie } from "../types/movies";

interface HomeProps {
  movies: Movie[];
  handleFavorites: (movie: Movie) => void;
  favorites: Movie[];
}

export default function Home({
  handleFavorites,
  favorites,
  movies,
}: HomeProps) {
  return (
    <>
      <Hero />

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Explore
            </span>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-primary-text sm:text-3xl">
              Popular Movies
            </h2>
          </div>

          <MovieGrid
            movies={movies}
            handleFavorites={handleFavorites}
            favorites={favorites}
          />
        </div>
      </section>
    </>
  );
}
