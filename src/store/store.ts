import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
