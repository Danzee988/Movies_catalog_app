import React, { useContext } from "react";
import PageTemplate from "../components/templateWatchlistPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQuery } from "react-query";
import { getMovie } from "../api/movies-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const WatchListPage = () => {
  const {watchList: movieIds } = useContext(MoviesContext);
  console.log("here ", movieIds)

  const { data: movies, error, isLoading, isError } = useQuery(
    ["watchList", { ids: movieIds }],
    async () => {
      try {
        const movieData = await Promise.all(
          movieIds.map((id) => getMovie(id))
        );
        return movieData.filter(Boolean); // Remove any undefined entries
      } catch (error) {
        throw error;
      }
    }
  ); 

  // Check if any of the parallel queries is still loading.
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <PageTemplate
      title="Movies Watchlist"
      movies={movies}
      action={(movie) => {
        return (<>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchListPage;
