//User routes----------------------------------------------------------
const TOKEN_KEY = 'site_key';

export const login = async (username, password) => {
  try {
    const response = await fetch('http://localhost:8080/api/users', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If there's an error, throw an error with a specific message
      throw new Error(data.message || 'Login failed. Please try again.');
    }

     // Save the token to localStorage upon successful login
     localStorage.setItem(TOKEN_KEY, data.token);

    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};


export const signup = async (email, password) => {
  // console.log("hello");
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: email, password: password })
    });

    console.log(response); // Log the entire response object
    return response.json();
};

export const logout = () => {
  // Remove the token from local storage
  localStorage.removeItem(TOKEN_KEY);
};

export const getAuthToken = () => {
  // Retrieve the token from local storage
  return localStorage.getItem(TOKEN_KEY);
};

export const getUserDetails = async (username, authToken) => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/user/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`, // Include the user's token for authentication
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data.user;
    } else {
      throw new Error(data.msg || 'Error fetching user details.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching user details.');
  }
};

export const getFavoriteMovies = async (authToken, userEmail) => {
  console.log("authToken ", authToken);

  try {
    // Make a request to your backend API endpoint that retrieves favorite movies
    const response = await fetch(`http://localhost:8080/api/users/${userEmail}/favorite-movies`, {
      method: 'GET',
      headers: {
        'Authorization': `${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch favorite movies');
    }

    const favoriteMovies = await response.json();
    return favoriteMovies;
  } catch (error) {
    throw error;
  }
};

export const getWatchlist = async (authToken, userEmail) => {
  console.log("authToken ", authToken);

  try {
    // Make a request to your backend API endpoint that retrieves favorite movies
    const response = await fetch(`http://localhost:8080/api/users/${userEmail}/watchList`, {
      method: 'GET',
      headers: {
        'Authorization': `${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch watchlist');
    }

    const watchlist = await response.json();
    return watchlist;
  } catch (error) {
    throw error;
  }
};

//Movies routes ------------------------------------------------------------------
export const getMovies = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/movies/tmdb/movies');

    const data = await response.json();

    if (!response.ok) {
      // If there's an error, throw an error with a specific message
      throw new Error(data.message || 'Error fetching movies. Please try again.');
    }

    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getMovie = async (movieId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${movieId}/form`);

    const data = await response.json();

    if (!response.ok) {
      // If there's an error, throw an error with a specific message
      throw new Error(data.message || 'Error fetching movies. Please try again.');
    }

    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getActorsMovies = async (person_id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/actors/${person_id}/movies`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getActorsDetails = async (person_id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/actors/${person_id}/details`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getLatestMovies = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/latest`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getActorImages = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/actors/${id}/images`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getMovieCredits = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}/credits`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getMovie1 = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getRecommendations = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}/recommendations`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/movies/popular`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getTrendingActors = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/trending/actors`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/trending/movies`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/movies/upcoming`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getMoviesSorted = async (sort_by) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/movies/${sort_by}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/genres`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getMovieReviews = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}/reviews`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getMoviesExternalIds = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}/externalID`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getMovieImages = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}/images`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching movies. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling code
  }
};

export const getMovieImages2 = ({ id }) => {
  if (!id) {
    return Promise.resolve(null);
  }

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

