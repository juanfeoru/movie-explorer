import Hero from "../components/home/Hero";
import MovieGrid from "../components/home/MovieGrid";
import type { Movie } from "../data/movies";

interface HomeProps {
  movies: Movie[];
  handleFavorites: (movie: Movie) => void;
  favorites: Movie[];
}

export default function Home({
  handleFavorites,
  favorites,
  movies,
}: HomeProps) {
  return (
    <>
      <Hero />
      <MovieGrid
        movies={movies}
        handleFavorites={handleFavorites}
        favorites={favorites}
      />
    </>
  );
}
