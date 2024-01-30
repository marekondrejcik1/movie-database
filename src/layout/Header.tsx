import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <LiveTvIcon />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: 2 }}
        >
          Fancy Movie Database
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Search Movies
        </Button>
        <Button color="inherit" component={Link} to="/favourites">
          Favourites
        </Button>
      </Toolbar>
    </AppBar>
  );
};
