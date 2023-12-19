import React from "react";
import { useQuery } from "react-query";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getActorImages } from "../../api/movies-api";

const ActorCard = ({ crew }) => {
  const { data: crewImages } = useQuery(["actorImages", crew.id], () => getActorImages(crew.id));
  console.log("CREW " + crew)
  
  if (error) {
    console.error("Error fetching actor images:", error);
  }

  const firstCrewImage = crewImages?.profiles[0]?.file_path;


  return (
    <Card sx={{ marginTop: 1, maxWidth: 300, maxHeight: 300 }}>
      {firstCrewImage && (
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500${firstCrewImage}`}
          alt={crew.name}
        />
      )}
      <CardContent>
        <Typography variant="h10" component="div">
          {crew.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActorCard;


