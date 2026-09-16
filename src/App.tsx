import { useState } from "react";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import type { Movie } from "./data/movies";

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
        <Home handleFavorites={handleFavorites} favorites={favorites} />
      </main>
    </>
  );
}

export default App;
