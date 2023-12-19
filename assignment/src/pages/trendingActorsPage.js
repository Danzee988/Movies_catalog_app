import React from "react";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PageTemplate from "../components/templateTrendingActors"
import { getTrendingActors } from "../api/movies-api";

const TrendingActorsPage = () => {
  const { data: trendingActors, error, isLoading, isError } = useQuery(
   'trending', getTrendingActors
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = trendingActors.results;
  const actorImages = actors[0].profile_path
   console.log("IMAGES " + actorImages)

  return (
    <PageTemplate
      actors={actors}
      actorImages={actorImages}
      title= "Trending Actors"
    />
  );
};

export default TrendingActorsPage;
