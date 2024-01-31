import { Box, Pagination, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { MovieCard } from "../shared/MovieCard";
import { MovieSearchResponse } from "../models/MovieSearchResponse";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setPage, setSearchResponse } from "../store/moviesSlice";

export const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedQuery] = useDebounce(searchText, 1000);

  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const searchResponse = useAppSelector((state) => state.movies.searchResponse);

  useEffect(() => {
    if (debouncedQuery !== "") {
      fetch(
        `http://www.omdbapi.com/?apikey=6249d37&s=${debouncedQuery}&page=${currentPage}`
      )
        .then((res) => res.json())
        .then((data: MovieSearchResponse) => {
          dispatch(setSearchResponse(data));
        });
    }
  }, [debouncedQuery, currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(value));
  };

  return (
    <Box p={4}>
      <TextField
        label="Search for a movie"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {searchResponse?.Response === "False" && searchResponse.Error && (
        <Box p={3}>{searchResponse.Error}</Box>
      )}

      {searchResponse?.Search && searchResponse?.Search?.length > 0 && (
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          marginTop={4}
          marginBottom={4}
        >
          {searchResponse?.Search?.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </Box>
      )}

      {searchResponse?.totalResults && (
        <Pagination
          count={Math.ceil(Number(searchResponse?.totalResults) / 10)}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
    </Box>
  );
};
