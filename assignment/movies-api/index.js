import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './database';
import defaultErrHandler from './errHandler';
import moviesRouter from './api/movies';   //import movies router
import authenticate from './authenticate';


dotenv.config();

const app = express();

const port = process.env.PORT; 

app.use(cors());

app.use(express.json());

app.use('/api/users', usersRouter);

app.use('/api/movies', moviesRouter);

app.use('/api/movies',authenticate,  moviesRouter);

app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});