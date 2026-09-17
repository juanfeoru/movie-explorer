import { Link } from "react-router";
import type { Movie } from "../../data/movies";

interface MovieCardProps {
  movie: Movie;
  handleFavorites: (movie: Movie) => void;
  isFavorite: boolean;
}

export default function MovieCard({
  movie,
  handleFavorites,
  isFavorite,
}: MovieCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-surface transition duration-200 hover:-translate-y-1 hover:border-surface-hover hover:shadow-lg">
      <div className="relative">
        <Link to={`/movie/${movie.id}`} className="block">
          <div className="aspect-2/3 overflow-hidden">
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>

          <div className="p-4">
            <h3 className="truncate font-semibold text-primary-text">
              {movie.title}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-secondary-text">
              <span>{movie.year}</span>
              <span className="text-muted-text">•</span>
              <span>{movie.genre}</span>
            </div>

            <div className="mt-3 flex items-center gap-1 text-sm">
              <span className="text-accent">★</span>
              <span className="font-medium text-primary-text">
                {movie.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </Link>

        <button
          onClick={() => handleFavorites(movie)}
          className={`absolute right-3 top-3 flex size-8 items-center justify-center rounded-full backdrop-blur-sm transition cursor-pointer ${
            isFavorite
              ? "bg-accent text-white"
              : "bg-black/60 text-primary-text hover:bg-accent hover:text-white"
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
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 1-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 1 1.597-1.16z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
