import React, { useContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import MovieRecommendationsPage from "./pages/movieRecommendationsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import WatchListPage from "./pages/watchListPage";
import LatestMoviesPage from "./pages/latestMovieDetailsPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import SiteHeader from './components/siteHeader'
import MovieCastPage from "./pages/movieCastPage";
import TrendingActorsPage from "./pages/trendingActorsPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import ActorsMoviesPage from "./pages/actorsDetailsPage";
import Login from "./components/login"
import Signup from "./components/signup"
import AuthContextProvider from "./contexts/authContext";
import { AuthContext } from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthContextProvider>
        <SiteHeader />
        <MoviesContextProvider>
        <Routes>
          <Route path="/reviews/:id" element={<MovieReviewPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/movies/:id/recommendations" element={<MovieRecommendationsPage />} />
          <Route path="/reviews/form" element={<AddMovieReviewPage />} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/watchList" element={<WatchListPage />} />
          </Route>
          <Route path="/movies/latest" element={<LatestMoviesPage />} />
          <Route path="/movies/popular" element={<PopularMoviesPage />} />
          <Route path="/movies/:id/actors" element={<MovieCastPage />} />
          <Route path="/actors/trending/day" element={<TrendingActorsPage />} />
          <Route path="/movies/trending/day" element={<TrendingMoviesPage />} />
          <Route path="/movies/:id/actors/:actorsid" element={<ActorsMoviesPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

          </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);