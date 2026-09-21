import type { Movie } from "../types/movies";
import MovieGrid from "../components/home/MovieGrid";
import { useEffect, useState } from "react";
import { searchMovies } from "../api/tmdb";
import { GENRES } from "../constants/genres";
import { useSearchParams } from "react-router";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";

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
  type SortType = "default" | "rating-desc" | "date-desc" | "title-asc";

  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get("search");
  const urlPage = Number(searchParams.get("page")) || 1;

  const [search, setSearch] = useState(urlSearch ?? "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [genre, setGenre] = useState<GenreType>("all");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(urlPage);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState<SortType>("default");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchRetry, setSearchRetry] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);

      if (search.trim()) {
        setSearchParams({
          search: search,
          page: "1",
        });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, setSearchParams]);

  useEffect(() => {
    async function searchMoviesFromApi() {
      if (!debouncedSearch.trim()) {
        setSearchResults([]);
        setSearchError(null);
        return;
      }

      setSearchLoading(true);
      setSearchError(null);

      try {
        const results = await searchMovies(debouncedSearch, page);

        setSearchResults(results.movies);
        setTotalPages(results.totalPages);
      } catch {
        setSearchResults([]);
        setSearchError("Failed to search movies");
      } finally {
        setSearchLoading(false);
      }
    }

    searchMoviesFromApi();
  }, [debouncedSearch, page, searchRetry]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const moviesToDisplay = search.trim() ? searchResults : movies;

  const filteredMovies = moviesToDisplay.filter((movie) => {
    const matchesGenre =
      genre === "all" ||
      movie.genres.some((movieGenre) =>
        movieGenre.toLowerCase().includes(genre.toLowerCase()),
      );

    return matchesGenre;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sort === "rating-desc") {
      return b.rating - a.rating;
    }

    if (sort === "date-desc") {
      return b.year - a.year;
    }

    if (sort === "title-asc") {
      return a.title.localeCompare(b.title);
    }

    return 0;
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
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search for a movie..."
              aria-label="Search for a movie"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 pl-11 pr-11 text-sm text-primary-text outline-none transition placeholder:text-muted-text"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-muted-text transition hover:bg-surface-hover hover:text-primary-text"
                aria-label="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            aria-label="Filter by genre"
            className="cursor-pointer rounded-xl border border-border bg-surface px-4 py-3 text-sm text-secondary-text outline-none transition focus:border-accent"
          >
            <option value="all">All genres</option>

            {Object.entries(GENRES).map(([id, name]) => (
              <option key={id} value={name.toLowerCase()}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            aria-label="Sort movies"
            className="cursor-pointer rounded-xl border border-border bg-surface px-4 py-3 text-sm text-secondary-text outline-none transition focus:border-accent"
          >
            <option value="default">Sort</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="date-desc">Newest</option>
            <option value="title-asc">Title: A to Z</option>
          </select>
        </div>
        {searchLoading ? (
          <LoadingState message="Searching movies..." />
        ) : searchError ? (
          <ErrorState
            message={searchError}
            onRetry={() => setSearchRetry((value) => value + 1)}
          />
        ) : filteredMovies.length === 0 ? (
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            }
            title="No movies found"
            message="Try searching for another movie or changing your filters."
          />
        ) : (
          <>
            <MovieGrid
              movies={sortedMovies}
              handleFavorites={handleFavorites}
              favorites={favorites}
            />
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setPage(page - 1)}
                disabled={page === 1 || searchLoading}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-primary-text transition hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-surface cursor-pointer"
              >
                Previous
              </button>

              <span className="text-sm text-secondary-text">
                Page{" "}
                <span className="font-medium text-primary-text">{page}</span> of{" "}
                <span className="font-medium text-primary-text">
                  {totalPages}
                </span>
              </span>

              <button
                type="button"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages || searchLoading}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-primary-text transition hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-surface cursor-pointer"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
