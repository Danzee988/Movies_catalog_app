import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';




const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// get user details by username
router.get('/user/:username', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found.' });
      }
  
      // Check if user.favorites exists before attempting to access it
      const favorites = user.favorites || [];
  
      // Only return necessary user details, excluding sensitive information
      const userDetails = {
        _id: user._id,
        username: user.username,
        favorites: favorites,

      };
  
      res.status(200).json({ success: true, user: userDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
  });
  
  

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

router.post('/addFavorites', async (req, res) => {
    try {
      const userId = req.body.user;
      // const userId = getUserIdFromToken(req);
      if (!userId) {
        return res.status(401).json({ success: false, msg: 'Invalid token or user not authorized.' });
      }
  
      const movie = req.body.movie;

      // Find the user by ID and update their favorites array
      const user = await User.findByIdAndUpdate(userId, { $addToSet: { favorites: movie } });
  
      if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found.' });
      }
  
      res.status(200).json({ success: true, msg: 'Movie added to favorites.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
  });

  router.post('/removeFavorites', async (req, res) => {
    try {
      const userId = req.body.user;
      // const userId = getUserIdFromToken(req);
      if (!userId) {
        return res.status(401).json({ success: false, msg: 'Invalid token or user not authorized.' });
      }
  
      // const movieId = req.body.movieId;
      const movie = req.body.movie;

      // Find the user by ID and update their favorites array
      const user = await User.findByIdAndUpdate(userId, { $pull: { favorites: movie } });
  
      if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found.' });
      }
  
      res.status(200).json({ success: true, msg: 'Movie added to favorites.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
  });
    
  router.get('/:userEmail/favorite-movies', async (req, res) => {
    try {
      // Assuming you have an authentication middleware to verify the user's token and populate req.user
      const user = await User.findOne({ username: req.params.userEmail });
      
      if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found.' });
      }
  
      // Check if user.favorites exists before attempting to access it
      const favorites = user.favorites || [];
  
      res.status(200).json({ success: true, favoriteMovies: favorites });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
  });
  
  router.post('/addWatchList', async (req, res) => {
    try {
      const userId = req.body.user;
      if (!userId) {
        return res.status(401).json({ success: false, msg: 'Invalid token or user not authorized.' });
      }
  
      const movie = req.body.movie;

      // Find the user by ID and update their favorites array
      const user = await User.findByIdAndUpdate(userId, { $addToSet: { watchlist: movie } });
  
      if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found.' });
      }
  
      res.status(200).json({ success: true, msg: 'Movie added to watchlist.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
  });

  router.post('/removeWatchlist', async (req, res) => {
    try {
      const userId = req.body.user;
      // const userId = getUserIdFromToken(req);
      if (!userId) {
        return res.status(401).json({ success: false, msg: 'Invalid token or user not authorized.' });
      }
  
      // const movieId = req.body.movieId;
      const movie = req.body.movie;

      // Find the user by ID and update their favorites array
      const user = await User.findByIdAndUpdate(userId, { $pull: { watchlist: movie } });
  
      if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found.' });
      }
  
      res.status(200).json({ success: true, msg: 'Movie added to favorites.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
  });

  router.get('/:userEmail/watchList', async (req, res) => {
    try {
      // Assuming you have an authentication middleware to verify the user's token and populate req.user
      const user = await User.findOne({ username: req.params.userEmail });
      
      if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found.' });
      }
  
      // Check if user.favorites exists before attempting to access it
      const watchlist = user.watchlist || [];
  
      res.status(200).json({ success: true, watchlist: watchlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
  });

  router.post('/addReview', async (req, res) => {
    try {
      const userId = req.body.user;
      if (!userId) {
        return res.status(401).json({ success: false, msg: 'Invalid token or user not authorized.' });
      }
  
      const review = req.body.review;

      // Find the user by ID and update their favorites array
      const user = await User.findByIdAndUpdate(userId, { $addToSet: { review: review } });
  
      if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found.' });
      }
  
      res.status(200).json({ success: true, msg: 'Movie added to watchlist.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
  });

export default router;