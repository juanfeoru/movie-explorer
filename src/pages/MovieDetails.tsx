import { Link, useParams } from "react-router";
import type { Movie } from "../data/movies";

interface MovieDetailsProps {
  movies: Movie[];
  handleFavorites: (movie: Movie) => void;
  favorites: Movie[];
}

export default function MovieDetails({
  movies,
  handleFavorites,
  favorites,
}: MovieDetailsProps) {
  const { id } = useParams();

  const movie = movies.find((movie) => movie.id === Number(id));

  if (!movie) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-text">
            Movie not found
          </h1>

          <p className="mt-2 text-secondary-text">
            The movie you're looking for doesn't exist.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
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
        </div>
      </section>
    );
  }

  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
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
          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              {movie.genre}
            </span>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary-text sm:text-5xl">
              {movie.title}
            </h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-secondary-text">
              <span>{movie.year}</span>

              <span className="text-muted-text">•</span>

              <div className="flex items-center gap-1">
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
                  className="size-4 fill-current text-accent"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
                <span className="font-medium text-primary-text">
                  {movie.rating}
                </span>
              </div>
            </div>

            <div className="my-6 h-px bg-border" />

            <p className="max-w-2xl leading-7 text-secondary-text">
              Explore this movie and discover more information about{" "}
              {movie.title}.
            </p>

            <button
              onClick={() => handleFavorites(movie)}
              className={`mt-6 inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition cursor-pointer ${
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
          </div>
        </div>
      </div>
    </section>
  );
}
