import { Link, useParams } from "react-router";
import type { Movie } from "../types/movies";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/tmdb";

interface MovieDetailsProps {
  handleFavorites: (movie: Movie) => void;
  favorites: Movie[];
}

export default function MovieDetails({
  handleFavorites,
  favorites,
}: MovieDetailsProps) {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovie() {
      if (!id) {
        setError("Movie not found");
        setLoading(false);
        return;
      }

      try {
        const data = await getMovieDetails(Number(id));
        setMovie(data);
      } catch {
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-bg px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />

          <p className="text-sm text-secondary-text">
            Loading movie details...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-bg px-6">
        <div className="text-center">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" x2="12" y1="9" y2="13" />
              <line x1="12" x2="12.01" y1="17" y2="17" />
            </svg>
          </div>

          <h2 className="text-lg font-semibold text-primary-text">
            Something went wrong
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-secondary-text">
            {error}
          </p>
        </div>
      </section>
    );
  }

  if (!movie) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-bg px-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary-text">
            Movie not found
          </h2>

          <p className="mt-2 text-sm text-secondary-text">
            We couldn't find the movie you're looking for.
          </p>
        </div>
      </section>
    );
  }
  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-bg px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-secondary-text transition hover:text-primary-text"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M6 8L2 12L6 16" />
            <path d="M2 12H22" />
          </svg>
          Back to Home
        </Link>

        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <img
            src={movie.poster}
            alt={movie.title}
            className="mx-auto w-full max-w-70 rounded-2xl object-cover shadow-2xl"
          />

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary-text sm:text-4xl">
              {movie.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-secondary-text">
              <span>{movie.year}</span>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-secondary-text"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <span>•</span>
              <span>{movie.runtime} min</span>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <span className="text-accent">★</span>

              <span className="font-semibold text-primary-text">
                {movie.rating.toFixed(1)}
              </span>

              <span className="text-sm text-muted-text">/ 10</span>
            </div>

            <button
              onClick={() => handleFavorites(movie)}
              className={`mt-6 inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                isFavorite
                  ? "bg-accent text-white"
                  : "border border-border bg-surface text-primary-text hover:border-accent hover:text-accent"
              }`}
              aria-label={
                isFavorite
                  ? `Remove ${movie.title} from favorites`
                  : `Add ${movie.title} to favorites`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>

              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-primary-text">
                Overview
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-secondary-text">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
