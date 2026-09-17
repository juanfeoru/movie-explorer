import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import { movies, type Movie } from "./data/movies";
import Favorites from "./pages/Favorites";
import { Route, Routes } from "react-router";
import Discover from "./pages/Discover";
import MovieDetails from "./pages/MovieDetails";

function App() {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    }

    return [];
  });

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
                movies={movies}
                handleFavorites={handleFavorites}
                favorites={favorites}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
