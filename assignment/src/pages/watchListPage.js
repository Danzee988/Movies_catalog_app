import React, { useContext } from "react";
import PageTemplate from "../components/templateWatchlistPage";
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";
import WriteReview from "../components/cardIcons/writeReview";
import { AuthContext } from "../contexts/authContext";
import { getWatchlist } from "../api/movies-api"; 

const WatchListPage = () => {
  const { userEmail } = useContext(AuthContext);
  const existingToken = localStorage.getItem("token");
  const authToken = existingToken;

  // Use a single query to fetch details for all favorite movies
  const { data: movies, error, isLoading, isError } = useQuery(
    "watchlist",
    async () => {
      try {
        // Fetch details for all favorite movies
        const watchlist = await getWatchlist(authToken, userEmail);
        return watchlist.watchlist || []; 
      } catch (error) {
        throw error;
      }
    }
  );

  // Check if any of the parallel queries is still loading.
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.error("Error fetching favorite movies:", error);
    return <div>Error fetching favorite movies</div>;
  }

  if (!Array.isArray(movies)) {
    console.error("Invalid data format for favorite movies:", movies);
    return <div>Invalid data format for favorite movies</div>;
  }

  return (
    <PageTemplate
      title="Movies Watchlist"
      movies={movies}
      action={(movie) => {
        return (<>
            <RemoveFromWatchlist movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchListPage;
