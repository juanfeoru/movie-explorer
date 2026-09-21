export interface Movie {
  id: number;
  title: string;
  poster: string;
  year: number;
  genres: string[];
  rating: number;
  overview?: string;
  runtime?: number;
}
