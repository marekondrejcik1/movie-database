import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MovieDetailPage } from "./movie-detail/MovieDetailPage";
import { SearchPage } from "./search/SearchPage";
import { FavouritesPage } from "./favourites/FavouritesPage";
import { Header } from "./layout/Header";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Header />

          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
          </Routes>
        </>
      </Router>
    </Provider>
  );
}

export default App;
