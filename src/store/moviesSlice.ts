import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MovieSearchResponse } from "../models/MovieSearchResponse";
import { RootState } from "./store";

interface MoviesState {
  searchResponse?: MovieSearchResponse;
  currentPage: number;
}

const initialState: MoviesState = {
  searchResponse: undefined,
  currentPage: 1,
};

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
});

export const { setSearchResponse, setPage } = moviesSlice.actions;

export default moviesSlice.reducer;
