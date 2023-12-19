import React from "react";
import ActorCard from "../actorCard";
import Grid from "@mui/material/Grid";

const CrewList = ({ crew, images }) => {
  //console.log("here" + crew)
  return (
    <>
      {crew && images && crew.map((crew, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={1} xl={2}>
          <ActorCard crew={crew}/>
        </Grid>
      ))}
    </>
  );
};

export default CrewList;
