import { useState } from "react";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import type { Movie } from "./data/movies";
import Favorites from "./pages/Favorites";
import { Route, Routes } from "react-router";

function App() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

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
              <Home handleFavorites={handleFavorites} favorites={favorites} />
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
        </Routes>
      </main>
    </>
  );
}

export default App;
