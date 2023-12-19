import React, { useContext } from "react";
import PageTemplate from "../components/templateWatchlistPage";
import { useQuery } from "react-query";
import { getFavoriteMovies } from "../api/movies-api"; 
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { AuthContext } from "../contexts/authContext";

const FavoriteMoviesPage = () => {
  const { userEmail } = useContext(AuthContext);
  const existingToken = localStorage.getItem("token");
  const authToken = existingToken;

  // Use a single query to fetch details for all favorite movies
  const { data: movies, error, isLoading, isError } = useQuery(
    "favorites",
    async () => {
      try {
        // Fetch details for all favorite movies
        const favoriteMovies = await getFavoriteMovies(authToken, userEmail);
        return favoriteMovies.favoriteMovies || []; // Assuming your response has a key named 'favoriteMovies'
      } catch (error) {
        throw error;
      }
    }
  );

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
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;
