import React from "react";
import { getPopularMovies } from "../api/movies-api";
import PageTemplate from '../components/templatePopularMoviesPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'

const PopularMoviesPage = () => {

 const { data, error, isLoading, isError } = useQuery('popular', getPopularMovies)
 if (isLoading) {
    return <Spinner />
 }

 if (isError) {
    return <h1>{error.message}</h1>
 }  
 const popularMovies = data.results;

 // Redundant, but necessary to avoid app crashing.
 const popularList = popularMovies.filter(m => m.popularList)
 localStorage.setItem('popularList', JSON.stringify(popularList))
 const addToPopularList = (movieId) => true 

 return (
    <PageTemplate
      popularMovies={popularMovies}
      title="Popular Movies"
      action={(movie) => {
         return <AddToWatchListIcon movie={movie} />
      }}
    />
);
};
export default PopularMoviesPage;