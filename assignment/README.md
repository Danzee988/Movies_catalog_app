# 🎬 Movies Catalog App

This project is a full-stack movie web app powered by React and a custom Express-based API that fetches and serves movie data from The Movie Database (TMDB). It supports user authentication, personalized watchlists, reviews, and favorites — all backed by MongoDB Atlas.

## 🧠 Features (API-only)
- ✅ User registration: Stores user email and password securely in MongoDB Atlas.
- 🔐 User login & authentication: Authenticates user credentials and returns a JWT token.
- ❤️ Add/remove favorite movies: Stored in the user's document in MongoDB.
- 📋 Add/remove watchlist movies: Managed via a protected list in MongoDB.
- 📡 Favorites & watchlist retrieval: Securely fetches user-specific data.
- 🚫 Protected routes: Unauthorized users are redirected to the login page.
- 🌐 TMDB proxy routing: All movie-related data is first routed through my custom API before going to TMDB.

## 🧭 Pages Overview (React Frontend)
| Page                    | Route                         | Description                                 |
| ----------------------- | ----------------------------- | ------------------------------------------- |
| 🏠 Home                 | `/`                           | Discover popular movies                     |
| ⭐ Popular Movies        | `/popular`                    | Shows a list of popular movies              |
| 🎬 Trending Movies      | `/trending-movies`            | Displays trending movies                    |
| 🎭 Trending Actors      | `/trending-actors`            | Displays trending actors                    |
| 🧑 Actor Movies         | `/actors/:id`                 | Details and movie list for a selected actor |
| 🎥 Movie Detail         | `/movies/:id`                 | Detailed info about a selected movie        |
| 🧾 Movie Credits        | `/movies/:id/cast`            | Cast and crew for the movie                 |
| ✨ Movie Recommendations | `/movies/:id/recommendations` | Recommends similar movies                   |
| 📅 Upcoming Movies      | `/upcoming`                   | Lists upcoming releases                     |
| 🕵️ Latest Movies       | `/latest`                     | Fetches the latest movie release            |
| ❤️ Favorite Movies      | `/favorites`                  | User’s favorite movies                      |
| ⏳ Watchlist             | `/watchlist`                  | User’s watchlist                            |
| ✍️ Write Review         | `/reviews/form`               | Submit a review for a movie                 |
| 📖 Read Review          | `/reviews/:id`                | View a user’s review                        |

## 🛠️ Tech Stack
### 🔧 Backend (API)
- Node.js + Express
- MongoDB Atlas via Mongoose
- JWT (jsonwebtoken) for authentication
- dotenv for environment configs
- TMDB API integration

### 🎨 Frontend
- React 18
- React Router DOM
- React Query
- Context API
- Tailwind CSS (or similar)
- LocalStorage

## ⚙️ Setup Requirements
### ✅ Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- TMDB API key

## 🧾 Installation (Frontend & Backend)
1. Clone the repository
- ```git clone https://github.com/your-username/movies-catalog.git```
- ```cd movies-catalog```
2. Install frontend dependencies
- ```npm install```

3. (in /api or /server folder)
- ```cd api```
- ```npm install```

3. Start the frontend
- ```npm start```

4. Start the backend (in /api)
- ```npm run dev```

## ⚙️ API Configuration
Before running the backend, create a .env file in your /api directory with the following variables:
```
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://<your-mongo-uri>
REACT_APP_TMDB_KEY=<your-tmdb-key>
SECRET=<your-jwt-secret>
```

## 🌐 API Design
| Endpoint                          | Method | Description                      |
| --------------------------------- | ------ | -------------------------------- |
| `/tmdb/movies`                    | GET    | Fetches a list of movies         |
| `/tmdb/genres`                    | GET    | Returns movie genres             |
| `/tmdb/actors/:person_id/movies`  | GET    | Gets movies for a specific actor |
| `/tmdb/actors/:person_id/details` | GET    | Gets actor details               |
| `/tmdb/movie/:id`                 | GET    | Gets movie details               |
| `/tmdb/:id/credits`               | GET    | Gets movie credits               |
| `/tmdb/:id/recommendations`       | GET    | Movie recommendations            |
| `/tmdb/:id/reviews`               | GET    | Movie reviews                    |
| `/tmdb/:id/externalID`            | GET    | External IDs                     |
| `/tmdb/:id/images`                | GET    | Movie images                     |
| `/tmdb/actors/:id/images`         | GET    | Actor images                     |
| `/tmdb/latest`                    | GET    | Latest movie                     |
| `/tmdb/trending/actors`           | GET    | Trending actors                  |
| `/tmdb/trending/movies`           | GET    | Trending movies                  |
| `/tmdb/movies/popular`            | GET    | Popular movies                   |
| `/tmdb/movies/upcoming`           | GET    | Upcoming movies                  |
| `/tmdb/movies/:sort_by`           | GET    | Movies by sorting criteria       |

## 🧑 User Management
| Endpoint          | Method | Description       |
| ----------------- | ------ | ----------------- |
| `/`               | GET    | Get all users     |
| `/user/:username` | GET    | Get specific user |
| `/`               | POST   | Register or Login |
| `/:id`            | PUT    | Update user info  |

## 💾 Favorites & Watchlist
| Endpoint                      | Method | Description           |
| ----------------------------- | ------ | --------------------- |
| `/addFavorites`               | POST   | Add to favorites      |
| `/:userEmail/favorite-movies` | GET    | Get user's favorites  |
| `/addWatchList`               | POST   | Add to watchlist      |
| `/removeWatchlist`            | POST   | Remove from watchlist |
| `/:userEmail/watchList`       | GET    | Get user's watchlist  |

## 🔐 Security & Authentication
- JWT authentication using jsonwebtoken
- On successful login, users receive a token
- Token is required in headers for protected routes

| Route               | Access Requirement |
| ------------------- | ------------------ |
| `/addFavorites`     | Authenticated only |
| `/addWatchList`     | Authenticated only |
| `/removeWatchlist`  | Authenticated only |
| `/movies/watchList` | Authenticated only |
| `/movies/favorites` | Authenticated only |
| `/put/:id`          | Authenticated only |

## 🔁 React API Integration
- React fetches all data through your custom API, not directly from TMDB
- State is managed via React Context and React Query
- All user-related features (favorites, watchlist) interact with the backend API
- SignIn and Login pages call your own backend's POST / for auth
- Token is stored in localStorage for persistent sessions

## 🧪 Future Enhancements
- ✅ Pagination support
- 🔎 Full-text movie search
- 🌙 Dark/light theme toggle
- 📱 Mobile responsiveness
- 📊 User stats dashboard
- 🧪 Add unit tests for API and frontend
