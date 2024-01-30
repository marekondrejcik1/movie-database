import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEY } from "../models/contants";
import { MovieDetailResponse } from "../models/MovieDetailResponse";

export const MovieDetailPage = () => {
  let { id } = useParams();
  const [movieData, setMovieData] = useState<MovieDetailResponse | null>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [favourites, setFavourites] = useState<MovieDetailResponse[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (movieData) {
      const storage = localStorage.getItem(STORAGE_KEY);

      if (storage) {
        const parsedStorage: MovieDetailResponse[] = JSON.parse(storage);

        setFavourites(parsedStorage);

        if (parsedStorage.some((movie) => movie.imdbID === id)) {
          setIsFavourite(true);
        }
      }
    }
  }, [movieData]);

  useEffect(() => {
    if (id) {
      fetch(`http://www.omdbapi.com/?apikey=6249d37&i=${id}`)
        .then((res) => res.json())
        .then((data: MovieDetailResponse) => {
          setMovieData(data);
        })
        .catch(() => setMovieData(null));
    }
  }, [id]);

  const handleFavouriteClick = () => {
    let newFavourites: MovieDetailResponse[] = [];

    if (isFavourite) {
      newFavourites = favourites.filter((movie) => movie.imdbID !== id);
      setIsFavourite(false);
    } else {
      newFavourites = [...favourites, movieData as MovieDetailResponse];
      setIsFavourite(true);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavourites));
    setFavourites(newFavourites);
  };

  if (movieData && movieData.Response === "True") {
    return (
      <Box p={4}>
        <Button
          variant="outlined"
          sx={{ marginBottom: 2 }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Box display="flex" alignItems="center">
          <Typography variant="h4">{movieData.Title}</Typography>
          {isFavourite ? (
            <StarIcon onClick={handleFavouriteClick} sx={{ marginLeft: 3 }} />
          ) : (
            <StarBorderIcon
              onClick={handleFavouriteClick}
              sx={{ marginLeft: 3 }}
            />
          )}
        </Box>

        <Typography variant="subtitle1" color="text.secondary" component="div">
          {movieData.Year} | {movieData.Type} | IMDB: {movieData.imdbRating} (
          {movieData.imdbVotes}) | Metascore: {movieData.Metascore}
        </Typography>

        <Box
          display="flex"
          alignItems="flex-start"
          flexWrap="wrap"
          marginTop={2}
        >
          <Box marginRight={3} width={500}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Rated</TableCell>
                  <TableCell>{movieData.Rated}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Released</TableCell>
                  <TableCell>{movieData.Released}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Runtime</TableCell>
                  <TableCell>{movieData.Runtime}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Genre</TableCell>
                  <TableCell>{movieData.Genre}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Director</TableCell>
                  <TableCell>{movieData.Director}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Writer</TableCell>
                  <TableCell>{movieData.Writer}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Actors</TableCell>
                  <TableCell>{movieData.Actors}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Language</TableCell>
                  <TableCell>{movieData.Language}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Country</TableCell>
                  <TableCell>{movieData.Country}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Awards</TableCell>
                  <TableCell>{movieData.Awards}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          {movieData.Poster && (
            <img
              src={movieData.Poster}
              style={{ width: 400, objectFit: "contain" }}
            />
          )}
        </Box>

        <Box marginTop={4}>{movieData.Plot}</Box>
      </Box>
    );
  }

  if (movieData === undefined) {
    return <Box p={4}>Loading...</Box>;
  }

  return <Box p={4}>Error while loading data</Box>;
};
