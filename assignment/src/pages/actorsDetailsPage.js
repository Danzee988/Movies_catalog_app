import React from "react";
import { useParams } from 'react-router-dom';
import PageTemplate from "../components/templateActorsMovies";
import { getActorsMovies, getActorsDetails } from "../api/movies-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'
import ActorsDetails from "../components/actorsDetails"


const ActorsMoviesPage = () => {
  const { actorsid } = useParams();
   const { data: movies, error, isLoading, isError } = useQuery(
     ["movie", { id: actorsid }],
     () => getActorsMovies(actorsid)
  );

  const { data: actor } = useQuery(
    ["actor", { id: actorsid }],
    () => getActorsDetails(actorsid)
 );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const allMovies = movies.cast;

  //console.log('Movies:', JSON.stringify(popularMovies, null, 2));

 const popularList = allMovies.filter(m => m.popularList)
 localStorage.setItem('upcomingList', JSON.stringify(popularList))
 const addToPopularList = (movieId) => true 

  //console.log('Movies:', JSON.stringify(movie, null, 2));
  return (
    <>
      {actor ? (
        <>
          <PageTemplate allMovies={allMovies}
            actorsDetails={actor}
            title="Actors Details"
            action={(movies) => {
              return <AddToWatchListIcon movie={movies} />
            }}>
            <ActorsDetails actorsDetails={actor} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default ActorsMoviesPage;