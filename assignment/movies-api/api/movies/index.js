
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies } from '../tmdb-api';
import { getGenres }from '../tmdb-api';
import { getMovies, getMovie1 }from '../tmdb-api';
import { getActorsMovies,getActorsDetails }from '../tmdb-api';
import { getMovie }from '../tmdb-api';
import { getLatestMovies }from '../tmdb-api';
import { getActorImages }from '../tmdb-api';
import { getMovieCredits }from '../tmdb-api';
import { getRecommendations }from '../tmdb-api';
import { getPopularMovies }from '../tmdb-api';
import { getTrendingActors, getTrendingMovies }from '../tmdb-api';
import { getMoviesSorted }from '../tmdb-api';
import { getMovieReviews }from '../tmdb-api';
import { getMoviesExternalIds } from '../tmdb-api';
import { getMovieImages } from '../tmdb-api';


const router = express.Router();

// Route to get movies from TMDB
router.get('/tmdb/movies', asyncHandler(async (req, res) => {
    console.log('Request to /tmdb/movies received'); // Add this line
    try {
        const movies = await getMovies();

        console.log('TMDB Movies:', movies);

        res.status(200).json(movies);
        } catch (error) {
        console.error('Error fetching movies from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

// Route to get movie genres from TMDB
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    try {
        const genres = await getGenres();
        res.status(200).json(genres);
        } catch (error) {
        console.error('Error fetching movies from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

// Route to get an actors movies from TMDB
router.get('/tmdb/actors/:person_id/movies', asyncHandler(async (req, res) => {
    const { person_id } = req.params;

    try {
        const response = await getActorsMovies(person_id);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching actor movies from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

// Route to get an actors details from TMDB
router.get('/tmdb/actors/:person_id/details', asyncHandler(async (req, res) => {
    const { person_id } = req.params;

    try {
        const response = await getActorsDetails(person_id);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching actor details from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

// Route to get a movie from TMDB
router.get('/tmdb/:movieId/form', asyncHandler(async (req, res) => {
    const { movieId } = req.params;

    try {
        const response = await getMovie(movieId);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

// Route to get a movie from TMDB
router.get('/tmdb/latest', asyncHandler(async (req, res) => {

    try {
        const response = await getLatestMovies();
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movies from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

// Route to get an actors images from TMDB
router.get('/tmdb/actors/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const response = await getActorImages(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.get('/tmdb/:id/credits', asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getMovieCredits(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getMovie1(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.get('/tmdb/:id/recommendations', asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getRecommendations(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.get('/tmdb/movies/popular', asyncHandler(async (req, res) => {
    try {
        const response = await getPopularMovies();
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.get('/tmdb/trending/actors', asyncHandler(async (req, res) => {
    try {
        const response = await getTrendingActors();
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.get('/tmdb/trending/movies', asyncHandler(async (req, res) => {
    try {
        const response = await getTrendingMovies();
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.get('/tmdb/movies/upcoming', asyncHandler(async (req, res) => {
    try {
        const response = await getUpcomingMovies();
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.get('/tmdb/movies/:sort_by', asyncHandler(async (req, res) => {
    const { sort_by } = req.params;

    try {
        const response = await getMoviesSorted(sort_by);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.get('/tmdb/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getMovieReviews(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.get('/tmdb/:id/externalID', asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getMoviesExternalIds(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.get('/tmdb/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getMovieImages(id);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching movie from TMDB:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

export default router;