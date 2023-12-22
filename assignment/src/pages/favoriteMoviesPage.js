import React, { useContext } from "react";
import PageTemplate from "../components/templateWatchlistPage";
import { useQuery } from "react-query";
import { getFavoriteMovies, getMovie } from "../api/movies-api"; 
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { AuthContext } from "../contexts/authContext";
import { MoviesContext } from "../contexts/moviesContext";

const FavoriteMoviesPage = () => {
  const { userEmail } = useContext(AuthContext);
  const existingToken = localStorage.getItem("token");
  const authToken = existingToken;
  const {favorites: movieIds } = useContext(MoviesContext);
  // console.log("favorites ", movieIds)


  const { data: movies, error, isLoading, isError } = useQuery(
    ["favorites", { ids: movieIds }],
    async () => {
      try {
        if (!movieIds === 0) {
          console.log("favorites ", movieIds)
          // Fetch details for each favorite movie using getMovie
          const movieData = await Promise.all(
            movieIds.map((id) => getMovie(id))
          );
          return movieData.filter(Boolean); // Remove any undefined entries
        } else {
          // Fetch details for all favorite movies using getFavoriteMovies
          const favoriteMovies = await getFavoriteMovies(authToken, userEmail);
          return favoriteMovies.favoriteMovies || [];
        }
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
