import React, { useState, useContext } from "react";
import { AuthContext } from '../contexts/authContext';


export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [watchList, setWatchList] = useState([]);
  const { userId } = useContext(AuthContext);


  const addToFavorites = async (movie, token) => {
    try {
      // Make an API call to add the movie to the user's favorites on the server
      const response = await fetch(`http://localhost:8080/api/users/addFavorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ movie, user: userId }), // Pass movieId in the request body
      });
  
      if (response.ok) {
        // If the API call is successful, update the local state
        setFavorites([...favorites, movie.id]);
      } else {
        // If the API call is not successful, extract and handle the error message
        const errorData = await response.json();
        const errorMessage = errorData.msg || 'Failed to add movie to favorites';
        
        // Handle the error, e.g., display an error message
        console.error('Failed to add movie to favorites:', errorMessage);
      }
    } catch (error) {
      console.error('Error adding movie to favorites:', error.message);
    }
  };
  
  const removeFromFavorites = async (movie, token, userId) => {
    try {
      // Make an API call to remove the movie from the user's favorites on the server
      const response = await fetch(`http://localhost:8080/api/users/removeFavorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ movie, user: userId }), // Pass userId in the request body
      });
  
      if (response.ok) {
        // If the API call is successful, update the local state
        setFavorites((prevFavorites) => prevFavorites.filter((mId) => mId !== movie.id));
      } else {
        // If the API call is not successful, extract and handle the error message
        const errorData = await response.json();
        const errorMessage = errorData.msg || 'Failed to remove movie from favorites';
  
        // Handle the error, e.g., display an error message
        console.error('Failed to remove movie from favorites:', errorMessage);
      }
    } catch (error) {
      console.error('Error removing movie from favorites:', error.message);
    }
  };
  
  const addToWatchList = async (movie, token) => {
    try {
      // Make an API call to add the movie to the user's favorites on the server
      const response = await fetch(`http://localhost:8080/api/users/addWatchList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ movie, user: userId }), // Pass movieId in the request body
      });
  
      if (response.ok) {
        // If the API call is successful, update the local state
        setWatchList([...watchList, movie.id]);
      } else {
        // If the API call is not successful, extract and handle the error message
        const errorData = await response.json();
        const errorMessage = errorData.msg || 'Failed to add movie to favorites';
        
        // Handle the error, e.g., display an error message
        console.error('Failed to add movie to favorites:', errorMessage);
      }
    } catch (error) {
      console.error('Error adding movie to favorites:', error.message);
    }
  };

  const removeFromWatchlist = async (movie, token, userId) => {
    try {
      // Make an API call to remove the movie from the user's favorites on the server
      const response = await fetch(`http://localhost:8080/api/users/removeWatchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ movie, user: userId }), // Pass userId in the request body
      });
  
      if (response.ok) {
        // If the API call is successful, update the local state
        setWatchList((prevWatchlist) => prevWatchlist.filter((mId) => mId !== movie.id));
      } else {
        // If the API call is not successful, extract and handle the error message
        const errorData = await response.json();
        const errorMessage = errorData.msg || 'Failed to remove movie from favorites';
  
        // Handle the error, e.g., display an error message
        console.error('Failed to remove movie from favorites:', errorMessage);
      }
    } catch (error) {
      console.error('Error removing movie from favorites:', error.message);
    }
  };

  const addReview = async (review, token) => {
    try {
      // Make an API call to add the movie to the user's favorites on the server
      const response = await fetch(`http://localhost:8080/api/users/addReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ review, user: userId }), // Pass movieId in the request body
      });
  
      if (response.ok) {
        // If the API call is successful, update the local state
        setMyReviews([...myReviews, review.id]);
      } else {
        // If the API call is not successful, extract and handle the error message
        const errorData = await response.json();
        const errorMessage = errorData.msg || 'Failed to add movie to favorites';
        
        // Handle the error, e.g., display an error message
        console.error('Failed to add movie to favorites:', errorMessage);
      }
    } catch (error) {
      console.error('Error adding movie to favorites:', error.message);
    }
  };

  // const addReview = (movie, review) => {
  //   setMyReviews( {...myReviews, [movie.id]: review } )
  // };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        watchList,
        addToWatchList,
        removeFromWatchlist
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;