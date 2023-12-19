import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import RecommendIcon from '@mui/icons-material/Recommend';
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import {getRecommendations} from "../../api/movies-api"
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";



export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const { watchList, addToWatchList } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  if (watchList.find((id) => id === movie.id)) {
    movie.watchList = true;
  } else {
    movie.watchList = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  const handleAddToWAtchList = (e) => {
    e.preventDefault();
    addToWatchList(movie);
  };

  const handleGetRecommendations = (e) => {
    e.preventDefault();
    getRecommendations(movie.id);
  };


  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <React.Fragment>
            {movie.favorite && (
              <Avatar sx={{ backgroundColor: 'red',  marginRight: 1 }}>
                <FavoriteIcon />
              </Avatar>
            )}
            {movie.watchList && (
              <Avatar sx={{ backgroundColor: 'blue' }}>
                <PlaylistAddIcon />
              </Avatar>
            )}
          </React.Fragment>
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

<CardActions disableSpacing>
  {action(movie)}
  <Link to={`/movies/${movie.id}`}>
    <Tooltip title="More Info" arrow>
      <IconButton size="medium" color="primary">
        <Avatar sx={{ backgroundColor: 'blue' }}>
          <ReadMoreIcon />
        </Avatar>
      </IconButton>
    </Tooltip>
  </Link>
  
  <Link to={`/movies/${movie.id}/recommendations`}>
    <Tooltip title="Get Recommendations" arrow>
      <IconButton size="medium" color="secondary">
        <Avatar sx={{ backgroundColor: 'blue' }}>
          <RecommendIcon />
        </Avatar>
      </IconButton>
    </Tooltip>
  </Link>
</CardActions>



    </Card>
  );
}