import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from 'react-router-dom';
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { getMovieCredits, getActorImages } from "../../api/movies-api";
import Grid from "@mui/material/Grid";
import ActorList from "../../components/actorsList";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getMoviesExternalIds } from '../../api/movies-api'


const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: credits } = useQuery(["movieCredits", { id }], () => getMovieCredits(id));
  const movieId = movie.id
  console.log("ok " + movieId)


  const { data: topActors, error: topActorsError } = useQuery(
    ["topActors", id],
    () => credits?.cast.slice(0, 9),
    {
      enabled: !!credits, 
    }
  );

  const { data: actorsImages, error: actorsImagesError } = useQuery(
    ["actorsImages", topActors?.map((actor) => actor.id)],
    () =>
      Promise.all(
        topActors?.map((actor) => getActorImages(actor.id)) || []
      ).then((images) =>
        images.map((image) => ({
          id: image.file_path,
          url: `https://image.tmdb.org/t/p/w200/${image.file_path}`,
        }))
      )
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  if (topActorsError || actorsImagesError) {
    console.error("Error fetching top actors or actor images:", topActorsError, actorsImagesError);
  }

  const launchCreditsPage = () => {
    // Update the path to navigate to the desired route
    console.log("ok " + movieId)
    navigate(`/movies/${movieId}/actors`);
  };

  const { data: externalId } = useQuery(
    ["externalIds", { id: id }],
    () => getMoviesExternalIds(id)
  );

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Typography variant="h5" component="p">
        External Information
      </Typography>

      <Typography variant="h6" component="p">
        {externalId && externalId.imdb_id && (
          <a
            href={`https://www.imdb.com/title/${externalId.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            IMDb Page
          </a>
        )}
      </Typography>

      <Typography variant="h6" component="p">
        {externalId && externalId.twitter_id && (
          <a
            href={`https://twitter.com/${externalId.twitter_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter Page
          </a>
        )}
      </Typography>

      <Typography variant="h6" component="p">
        {externalId && externalId.facebook_id && (
          <a
            href={`https://www.facebook.com/${externalId.facebook_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook Page
          </a>
        )}
      </Typography>

      <Typography variant="h6" component="p">
        {externalId && externalId.instagram_id && (
          <a
            href={`https://www.instagram.com/${externalId.instagram_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram Page
          </a>
        )}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Paper component="ul" sx={{...root}}>
        <Chip label = {"Production Countries"} color="primary"/>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip, margin: 0}} />
          </li>
        ))}
      </Paper>

      <Typography variant="h5" component="h3">
        Top Actors
      </Typography>
      <Grid container spacing={2}>
        {topActors && <ActorList actors={topActors} images={actorsImages} />}
        <IconButton color="black" onClick={launchCreditsPage}> 
            View More
            <ArrowForwardIcon/>
          </IconButton>
      </Grid>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
