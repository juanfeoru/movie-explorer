import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import type { Movie } from "./types/movies";
import Favorites from "./pages/Favorites";
import { Route, Routes } from "react-router";
import Discover from "./pages/Discover";
import MovieDetails from "./pages/MovieDetails";
import { getPopularMovies } from "./api/tmdb";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    }

    return [];
  });

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);

        const data = await getPopularMovies();

        setMovies(data);
      } catch {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [retry]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function handleFavorites(movie: Movie) {
    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.some(
        (favorite) => favorite.id === movie.id,
      );

      if (isFavorite) {
        return currentFavorites.filter((favorite) => favorite.id !== movie.id);
      }

      return [...currentFavorites, movie];
    });
  }

  return (
    <>
      <Header />
      <main>
        {loading ? (
          <div className="flex min-h-screen items-center justify-center bg-bg">
            <div className="text-center">
              <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
              <p className="text-sm text-secondary-text">Loading movies...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex min-h-screen items-center justify-center bg-bg px-5">
            <div className="text-center">
              <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m0 3.75h.008M10.29 3.86 2.82 17.11A2 2 0 0 0 4.56 20h14.88a2 2 0 0 0 1.74-2.89L13.71 3.86a2 2 0 0 0-3.42 0Z"
                  />
                </svg>
              </div>

              <h2 className="mb-2 text-lg font-semibold text-primary-text">
                Something went wrong
              </h2>

              <p className="mx-auto max-w-md text-sm text-secondary-text mt-2">
                {error}
              </p>

              <button
                type="button"
                onClick={() => setRetry((value) => value + 1)}
                className="mt-6 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 cursor-pointer"
              >
                Try again
              </button>
            </div>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  movies={movies}
                  handleFavorites={handleFavorites}
                  favorites={favorites}
                />
              }
            />

            <Route
              path="/discover"
              element={
                <Discover
                  movies={movies}
                  handleFavorites={handleFavorites}
                  favorites={favorites}
                />
              }
            />

            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  handleFavorites={handleFavorites}
                />
              }
            />

            <Route
              path="/movie/:id"
              element={
                <MovieDetails
                  handleFavorites={handleFavorites}
                  favorites={favorites}
                />
              }
            />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
