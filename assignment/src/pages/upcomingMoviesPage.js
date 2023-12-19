import React from "react";
import { getUpcomingMovies } from "../api/movies-api";
import PageTemplate from '../components/templateUpcomingMoviesList';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'

const UpcomingMoviesPage = () => {

 const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies)
 if (isLoading) {
    return <Spinner />
 }

 if (isError) {
    return <h1>{error.message}</h1>
 }  
 const upcomingMovies = data.results;

 // Redundant, but necessary to avoid app crashing.
 const upcomingList = upcomingMovies.filter(m => m.upcomingList)
 localStorage.setItem('upcomingList', JSON.stringify(upcomingList))
 const addToWatchList = (movieId) => true 

 return (
    <PageTemplate
      upcomingMovies={upcomingMovies}
      title="Upcoming Movies"
      action={(movie) => {
         return <AddToWatchListIcon movie={movie} />
      }}
    />
);
};
export default UpcomingMoviesPage;