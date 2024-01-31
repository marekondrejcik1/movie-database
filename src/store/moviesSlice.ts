import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieSearchResponse } from "../models/MovieSearchResponse";
import { RootState } from "./store";

interface MoviesState {
  searchResponse?: MovieSearchResponse;
  currentPage: number;
  status?: "loading" | "succeeded" | "failed";
}

const initialState: MoviesState = {
  searchResponse: undefined,
  currentPage: 1,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (payload: { searchString: string; page: number }) => {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=6249d37&s=${payload.searchString.trim()}&page=${
        payload.page
      }`
    );
    const data = await res.json();
    return data;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchResponse: (state, action: PayloadAction<MovieSearchResponse>) => {
      state.searchResponse = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResponse = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { setSearchResponse, setPage } = moviesSlice.actions;

export default moviesSlice.reducer;
