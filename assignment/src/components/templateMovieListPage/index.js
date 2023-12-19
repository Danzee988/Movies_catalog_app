import React, { useState, useEffect  } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import { getMoviesSorted } from "../../api/movies-api";
import {getMovies} from "../../api/movies-api";
import { useQuery } from 'react-query';
import Spinner from '../../components/spinner';
import Pagination from '@mui/material/Pagination';
import { auth } from "../../components/firebase"

function MovieListPageTemplate({movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [voteFilter, setVoteFilter] = useState("0");
  const [sortOrderFilter, setSortOrderFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5;

  const genreId = Number(genreFilter);
  const voteAverage = Number(voteFilter);

  // Calculate the index range of movies to display on the current page
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  let { data, error, isLoading, isError, refetch  } = useQuery('discover', () => {
    if (sortOrderFilter) {
      return getMoviesSorted(sortOrderFilter);
    } else {
      return getMovies(); // Uses the passed-in movies when sortOrderFilter is empty
    }
  });

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    refetch();
  };
  
  React.useEffect(() => {
    // Manually refetchs the data when sortOrderFilter changes
    refetch();
  }, [sortOrderFilter]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // console.log("homepage ", movies)

  let displayedMovies = data.results
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((movies) => {
      return voteAverage > 0 ? movies.vote_average >= voteAverage && movies.vote_average < (voteAverage + 1) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "vote") setVoteFilter(value);
    else if (type === "sortOrder") setSortOrderFilter(value);

  };

  const currentMovies = displayedMovies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(displayedMovies.length / moviesPerPage);

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            voteFilter={voteFilter}
            sortOrderFilter={sortOrderFilter}
          />
        </Grid>
        
        <MovieList action={action} movies={currentMovies}></MovieList>
        <Grid item xs={12}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={ handleChangePage}
        />
      </Grid>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;