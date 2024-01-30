import { useEffect, useState } from "react";
import { MovieDetailResponse } from "../models/MovieDetailResponse";
import { STORAGE_KEY } from "../models/contants";
import { MovieCard } from "../shared/MovieCard";
import { Box } from "@mui/material";

export const FavouritesPage = () => {
  const [movies, setMovies] = useState<MovieDetailResponse[]>();

  useEffect(() => {
    const storage = localStorage.getItem(STORAGE_KEY);

    if (storage) {
      const parsedStorage: MovieDetailResponse[] = JSON.parse(storage);

      setMovies(parsedStorage);
    }
  }, []);

  if (movies && movies.length > 0) {
    return (
      <Box p={4} gap={2} display="flex" flexDirection="column">
        {movies.map((movie) => (
          <MovieCard
            movie={{
              Poster: movie.Poster,
              Title: movie.Title,
              Type: movie.Type,
              Year: movie.Year,
              imdbID: movie.imdbID,
            }}
          />
        ))}
      </Box>
    );
  }

  return <Box p={4}>No favourites</Box>;
};
