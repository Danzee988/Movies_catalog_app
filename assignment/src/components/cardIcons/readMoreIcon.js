import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import ReadMoreIcon from '@mui/icons-material/ReadMore';

const ReadMore = ({ movie }) => {
 const context = useContext(MoviesContext);

 const handleAddToWatchList = (e) => {
    e.preventDefault();
    console.log("Added to Watch List:", movie.title);
 };

 return (
    <IconButton aria-label="more information">
      <ReadMoreIcon color="primary" fontSize="large" />
    </IconButton>
 );
};

export default ReadMore;