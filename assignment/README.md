# Assignment 2 - Web API.

Name: Daniel Wolski

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + User sign - the user has to provide an email and password and then those are saved in a collection in mongo atlas.
 + User login - the user types in their email and password which is then used for authentication and user data is retrived.
 + Add a movie to favorits - the user is able to add a movie to a favorits list that is stored on the mongo atlas database.
 + Remove a movie from favorits - the user is able to remove a movie from their favorits list that is stored on the mongo atlas database.
 + Add a movie to watchlist - the user is able to add a movie to a watchlist that is stored on the mongo atlas database.
 + Remove a movie from watchlist - the user is able to remove a movie from their watchlist that is stored on the mongo atlas database.
 + Favorite movies been fetched from the database.
 + Movies for the watchlist are been fetched from the database.
 + Routes for watchlist and favorites are protected, when a not logged in user clicks on them they get redirected to teh login page.
 + All routes are going the my api and then to the tmdb database.

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________

NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=MongoURL
REACT_APP_TMDB_KEY= TMDB key
SECRET=JWTSecret
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /tmdb/movies | GET | Retrieves a list of movies from TMDB. 
- /tmdb/genres | GET | Retrieves a list of movie genres from TMDB.
- /tmdb/actors/:person_id/movies | GET | Retrieves a list of movies associated with a specific actor identified by person_id.
- /tmdb/actors/:person_id/details | GET | Retrieves details about a specific actor identified by person_id.
- /tmdb/actors/:person_id/details | GET | Retrieves details about a specific movie identified by movieId.
- /tmdb/latest | GET | Retrieves a list of the latest movies from TMDB.
- /tmdb/actors/:id/images | GET | Retrieves images associated with a specific actor identified by id.
- /tmdb/:id/credits | GET | Retrieves credits for a specific movie identified by id.
- /tmdb/movie/:id | GET | Retrieves details about a specific movie identified by id.
- /tmdb/:id/recommendations | GET | Retrieves movie recommendations based on a specific movie identified by id.
- /tmdb/movies/popular | GET | Retrieves a list of popular movies from TMDB.
- /tmdb/trending/actors | GET | Retrieves a list of trending actors from TMDB.
- /tmdb/trending/movies | GET | Retrieves a list of trending movies from TMDB.
- /tmdb/movies/upcoming | GET | Retrieves a list of upcoming movies from TMDB.
- /tmdb/movies/:sort_by | GET | Retrieves a list of movies sorted based on the specified criteria.
- /tmdb/:id/reviews | GET |  Retrieves reviews for a specific movie identified by id.
- /tmdb/:id/externalID | GET | Retrieves external IDs for a specific movie identified by id.
- /tmdb/:id/images | GET |  Retrieves images associated with a specific movie identified by id. 
- / | GET | Retrieves a list of all users.
- /user/:username | GET | Retrieves details of a user by their username.
- / | POST | Creates a new user if the action is 'register' or authenticates a user if the action is 'login'.
- /:id | PUT | Updates user information by user ID.
- /addFavorites | POST | Adds a movie to the user's favorites list.
- /:userEmail/favorite-movies | GET | Retrieves the list of favorite movies for a specific user.
- /addWatchList | POST | Adds a movie to the user's watchlist.
- /removeWatchlist | POST | Removes a movie from the user's watchlist.
- /:userEmail/watchList | GET |  Retrieves the user's watchlist.
- /addReview | POST | Adds a review for a movie.

## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.
- The code uses the jsonwebtoken library to generate a JWT token upon successful authentication.
- The generated token is included in the response for successful authentication.
- This token can be used for subsequent requests to authenticate and authorize the user.

- User registration and authentication are handled in the / route (POST method).
- The authenticateUser function is responsible for checking the user's credentials and generating a JWT token upon successful authentication.

- The  updating a user /put/:id, adding/removing favorites /addFavorites, /removeFavorites and adding/removing from the watchlist /addWatchList, /removeWatchlist are protected as they require authentication before they can be performed.
- The "/movies/favorites" and "/movies/watchList" are protected, before a user can access them they have to login 

## Integrating with React App

- The react components of the Web App make HTTP requests to the api endpoints using the tool 'fetch'
- The react app uses reacts state management to handle the data that it recives from my api.
- The information displayed in each view is retrived from my api which fetches the information from the tmdb database.
- The signIn and login make api requests to their corresponding routes in my api.
- My api make requests to the tmdb database for fetching data about the movies.
