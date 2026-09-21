import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import type { Movie } from "./types/movies";
import Favorites from "./pages/Favorites";
import { Route, Routes } from "react-router";
import Discover from "./pages/Discover";
import MovieDetails from "./pages/MovieDetails";
import { getPopularMovies } from "./api/tmdb";
import NotFound from "./pages/NotFound";
import LoadingState from "./components/ui/LoadingState";
import ErrorState from "./components/ui/ErrorState";

function getSavedFavorites(): Movie[] {
  const savedFavorites = localStorage.getItem("favorites");

  if (!savedFavorites) {
    return [];
  }

  try {
    return JSON.parse(savedFavorites);
  } catch {
    return [];
  }
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const [favorites, setFavorites] = useState<Movie[]>(getSavedFavorites);

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
          <LoadingState message="Loading movies..." />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => setRetry((value) => value + 1)}
          />
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

            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
