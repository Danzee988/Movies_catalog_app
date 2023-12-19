import React from "react";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PageTemplate from "../components/templateMovieCastPage"
import { getActorImages, getMovieCredits } from "../api/movies-api";
import { useParams } from 'react-router-dom'; // Import the useParams hook

const MovieCreditsPage = () => {
  const { id } = useParams(); // Extract the movieId from route params
  const { data: movieId, error, isLoading, isError } = useQuery(
    ['movieCredits', { id: id }],
    () => getMovieCredits(id)
  );

  const { data: castImages } = useQuery(
    ['movieCredits', { id: id }],
    () => getActorImages(id)
  );
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movieCast = movieId.cast; 

  const actorImages = castImages

  return (
    <PageTemplate
      movieCast={movieCast}
      actorImages={actorImages}
      title= "Movies Cast"
    />
  );
};

export default MovieCreditsPage;
