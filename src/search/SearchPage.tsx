import { Box, Pagination, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { MovieCard } from "../shared/MovieCard";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchMovies, setPage } from "../store/moviesSlice";

export const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedQuery] = useDebounce(searchText, 1000);

  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const searchResponse = useAppSelector((state) => state.movies.searchResponse);
  const status = useAppSelector((state) => state.movies.status);

  useEffect(() => {
    if (debouncedQuery !== "") {
      dispatch(
        fetchMovies({ searchString: debouncedQuery, page: currentPage })
      );
    }
  }, [debouncedQuery, currentPage]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  const handleSearchInputChange = () => {
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearchText(e.target.value);
    };
  };

  return (
    <Box p={4}>
      <TextField
        label="Search for a movie"
        variant="outlined"
        value={searchText}
        onChange={handleSearchInputChange}
      />

      {searchResponse?.Response === "False" && searchResponse.Error && (
        <Box p={3}>{searchResponse.Error}</Box>
      )}

      {status === "loading" ? (
        <Box p={3}>Loading...</Box>
      ) : (
        searchResponse?.Search &&
        searchResponse?.Search?.length > 0 && (
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
        )
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
