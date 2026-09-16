export interface Movie {
  id: number;
  title: string;
  poster: string;
  year: number;
  genre: string;
  rating: number;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.4,
  },
  {
    id: 2,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    year: 2008,
    genre: "Action",
    rating: 8.5,
  },
  {
    id: 4,
    title: "Parasite",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    year: 2019,
    genre: "Drama",
    rating: 8.5,
  },
  {
    id: 5,
    title: "Spider-Man: Into the Spider-Verse",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    year: 2018,
    genre: "Animation",
    rating: 8.4,
  },
  {
    id: 6,
    title: "Whiplash",
    poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    year: 2014,
    genre: "Drama",
    rating: 8.4,
  },
];
