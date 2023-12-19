import React from "react";
import { getTrendingMovies } from "../api/movies-api";
import PageTemplate from '../components/templateTrendingMoviesPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'

const TrendingMoviesPage = () => {

 const { data, error, isLoading, isError } = useQuery('trending', getTrendingMovies)
 if (isLoading) {
    return <Spinner />
 }

 if (isError) {
    return <h1>{error.message}</h1>
 }  
 const trendingMovies = data.results;

 // Redundant, but necessary to avoid app crashing.
 const trendingList = trendingMovies.filter(m => m.trendingList)
 localStorage.setItem('trendingList', JSON.stringify(trendingList))
 const addToWatchList = (movieId) => true 

 return (
    <PageTemplate
      trendingMovies={trendingMovies}
      title="Trending Movies"
      action={(movie) => {
         return <AddToWatchListIcon movie={movie} />
      }}
    />
);
};
export default TrendingMoviesPage;