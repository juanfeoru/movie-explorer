import type { Movie } from "../types/movies";
import MovieGrid from "../components/home/MovieGrid";
import { useEffect, useState } from "react";
import { searchMovies } from "../api/tmdb";
import { GENRES } from "../constants/genres";

interface DiscoverProps {
  movies: Movie[];
  handleFavorites: (movie: Movie) => void;
  favorites: Movie[];
}

export default function Discover({
  movies,
  handleFavorites,
  favorites,
}: DiscoverProps) {
  type GenreType = "all" | string;

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<GenreType>("all");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    async function searchMoviesFromApi() {
      if (!search.trim()) {
        setSearchResults([]);
        return;
      }

      setSearchLoading(true);

      try {
        const results = await searchMovies(search);

        setSearchResults(results);
      } catch {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }

    const timeout = setTimeout(() => {
      searchMoviesFromApi();
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const moviesToDisplay = search.trim() ? searchResults : movies;

  const filteredMovies = moviesToDisplay.filter((movie) => {
    const matchesGenre =
      genre === "all" ||
      movie.genre.toLowerCase().includes(genre.toLowerCase());

    return matchesGenre;
  });

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Explore
          </span>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-primary-text sm:text-4xl">
            Discover Movies
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-secondary-text sm:text-base">
            Explore our collection and find your next movie to watch.
          </p>
        </div>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a movie..."
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 pl-11 text-sm text-primary-text outline-none transition placeholder:text-muted-text focus:border-accent"
            />
          </div>

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="cursor-pointer rounded-xl border border-border bg-surface px-4 py-3 text-sm text-secondary-text outline-none transition focus:border-accent"
          >
            <option value="all">All genres</option>

            {Object.entries(GENRES).map(([id, name]) => (
              <option key={id} value={name.toLowerCase()}>
                {name}
              </option>
            ))}
          </select>
        </div>
        {searchLoading ? (
          <div className="flex min-h-80 items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-surface-hover text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M8 11h6" />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-primary-text">
              No movies found
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-secondary-text">
              We couldn't find any movies matching your search or selected
              genre. Try changing your filters.
            </p>
          </div>
        ) : (
          <MovieGrid
            movies={filteredMovies}
            handleFavorites={handleFavorites}
            favorites={favorites}
          />
        )}
      </div>
    </section>
  );
}
