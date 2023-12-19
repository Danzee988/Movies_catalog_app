import React, { useState } from "react";
import Header from "../headerMovieList";
import ActorList from "../actorsList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


function movieActorsListTemplate({ movieCast, title, actorImages }) {

  let displayedCast = movieCast
  //let displayCrew = movieCrew
   console.log("Here " + movieCast)
  // console.log("Here " + actorImages)

  return (
    <Grid container sx={{ padding: '10px' }}>
      <Grid item xs={12}>
        <Header title={title} />
        <Typography variant="h4" component="div">
          Cast Members
        </Typography>
      </Grid>
      <Grid item container spacing={3} >
        <ActorList actors={displayedCast} images={actorImages}></ActorList>
        {/* <CrewList crew={displayCrew} images={actorImages} ></CrewList> */}
      </Grid>
    </Grid>
  );
}

export default movieActorsListTemplate;
