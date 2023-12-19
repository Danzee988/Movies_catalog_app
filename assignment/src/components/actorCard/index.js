import React from "react";
import { useQuery } from "react-query";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getActorImages } from "../../api/movies-api";
import { Link } from "react-router-dom";
import Image from "../../images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"

const ActorCard = ({ actor }) => {
  const id = actor.id
  const { data: actorImages, error } = useQuery(["actorImages", id], () => getActorImages(id));

  if (error) {
    console.error("Error fetching actor images:", error);
  }

  const firstActorImage = actorImages?.profiles[0]?.file_path;

  return (
    <Card sx={{ marginTop: 1, maxWidth: 300, maxHeight: 300 }}>

        <Link to={`/movies/:id/actors/${id}`}>
        <CardMedia
          component="img"
          height={200}
          image={actor.profile_path
            ?
            `https://image.tmdb.org/t/p/w500${firstActorImage}`
            : Image
        }
          alt={actor.name}
        />
        </Link>
      
      <CardContent>
        <Typography variant="h10" component="div">
          {actor.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActorCard;
