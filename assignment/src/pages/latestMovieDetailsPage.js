import React from "react";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import LatestMoviesDetails from "../components/latestMovieDetails";
import PageTemplate from "../components/templateLatestMoviesPage";
import { getLatestMovies } from "../api/movies-api";

const LatestMoviesDetailsPage = () => {
  const { data: movie, isLoading, isError } = useQuery('latest', getLatestMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching movie data</div>;
  }

  return (
      <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <LatestMoviesDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default LatestMoviesDetailsPage;
