import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./layout/Header";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";

const SearchPage = lazy(() => import("./search/SearchPage"));
const MovieDetailPage = lazy(() => import("./movie-detail/MovieDetailPage"));
const FavouritesPage = lazy(() => import("./favourites/FavouritesPage"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SearchPage />
                </Suspense>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MovieDetailPage />
                </Suspense>
              }
            />
            <Route
              path="/favourites"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <FavouritesPage />
                </Suspense>
              }
            />
          </Routes>
        </>
      </Router>
    </Provider>
  );
}

export default App;
