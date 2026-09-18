export interface Movie {
  id: number;
  title: string;
  poster: string;
  year: number;
  genre: string;
  rating: number;
  overview?: string;
  runtime?: number;
}
