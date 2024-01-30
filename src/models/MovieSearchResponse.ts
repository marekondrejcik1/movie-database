export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface MovieSearchResponse {
  Response: "True" | "False";
  Search: Movie[];
  totalResults: string;
  Error?: string;
}
