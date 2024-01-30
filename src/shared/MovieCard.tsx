import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Movie } from "../models/MovieSearchResponse";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardActionArea
        component={Link}
        to={`/movie/${movie.imdbID}`}
        sx={{ display: "flex", width: 700 }}
      >
        {movie.Poster && (
          <img
            src={movie.Poster}
            height={140}
            width={100}
            style={{ objectFit: "cover" }}
          />
        )}
        <Box p={1.5} flexGrow={1}>
          <Typography component="div" variant="h5">
            {movie.Title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {movie.Year} | {movie.Type}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};
