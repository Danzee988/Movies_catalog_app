import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from '@mui/material/Pagination';
import { getUpcomingMovies } from "../../api/movies-api";
import { useQuery } from 'react-query';



function UpcomingMoviesListTemplate({ upcomingMovies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5;

  const { data, error, isLoading, isError, refetch } = useQuery(
    ['upcomingMovies', currentPage], // Use currentPage as a dependency
    () => getUpcomingMovies(currentPage), // Fetch upcoming movies based on the current page
    { enabled: false } // Disable automatic fetching on component mount
  );

  let displayedMovies = upcomingMovies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    refetch();
  };

   // Calculate the index range of movies to display on the current page
   const startIndex = (currentPage - 1) * moviesPerPage;
   const endIndex = startIndex + moviesPerPage;
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
          />
        </Grid>
        <MovieList action={action} movies={currentMovies}></MovieList>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={ handleChangePage}
        />
      </Grid>
    </Grid>
  );
}

export default UpcomingMoviesListTemplate;
