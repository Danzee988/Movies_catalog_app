import React from "react";
import { useParams } from 'react-router-dom';
import PageTemplate from "../components/templatePopularMoviesPage";
import { getRecommendations } from '../api/movies-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'


const MovieRecommendationsPage = () => {
  const { id } = useParams();
   const { data: movie, error, isLoading, isError } = useQuery(
     ["movie", { id: id }],
     () => getRecommendations(id)
  );

 // console.log("Lists " + getLists(id))


  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const popularMovies = movie.results;
  return (
        <PageTemplate
          popularMovies={popularMovies}
          title="Recommended Movies"
          action={(movie) => {
            return <AddToWatchListIcon movie={movie} />
          }}
    />
  );
};

export default MovieRecommendationsPage;