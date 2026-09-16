import Hero from "../components/home/Hero";
import MovieGrid from "../components/home/MovieGrid";
import type { Movie } from "../data/movies";

interface HomeProps {
  handleFavorites: (movie: Movie) => void;
  favorites: Movie[];
}

export default function Home({ handleFavorites, favorites }: HomeProps) {
  return (
    <>
      <Hero />
      <MovieGrid handleFavorites={handleFavorites} favorites={favorites} />
    </>
  );
}
