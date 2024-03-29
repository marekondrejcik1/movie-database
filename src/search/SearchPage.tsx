import { Box, Pagination, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDebounce } from "use-debounce";
import { MovieCard } from "../shared/MovieCard";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchMovies, setPage, setSearchText } from "../store/moviesSlice";

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  const searchResponse = useAppSelector((state) => state.movies.searchResponse);
  const status = useAppSelector((state) => state.movies.status);
  const searchText = useAppSelector((state) => state.movies.searchText);
  const [debouncedQuery] = useDebounce(searchText, 1000);

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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // resets pagination to display the first page
    dispatch(setPage(1));
    dispatch(setSearchText(e.target.value));
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

export default SearchPage;
