import React from "react";
import ActorCard from "../actorCard";
import Grid from "@mui/material/Grid";

const ActorList = ({ actors, images }) => {
  //console.log("here" + actors)
  return (
    <>
      {actors && images && actors.map((actor, index) => (
        <Grid key={index} item xs={3} sm={2} md={2} lg={1.2} xl={1.15}>
          <ActorCard actor={actor} />
        </Grid>
      ))}
    </>
  );
};

export default ActorList;
