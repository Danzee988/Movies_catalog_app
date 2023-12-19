import React from "react";
import Header from "../headerMovieList";
import ActorList from "../actorsList";
import Grid from "@mui/material/Grid";


function movieActorsListTemplate({ actors, title, actorImages }) {

  let displayedCast = actors

  return (
    <Grid container sx={{ padding: '10px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={3} >
        <ActorList actors={displayedCast} images={actorImages}></ActorList>
      </Grid>
    </Grid>
  );
}

export default movieActorsListTemplate;
