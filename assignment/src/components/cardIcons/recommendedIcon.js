import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import RecommendIcon from '@mui/icons-material/Recommend';

const ReadMore = ({ movie }) => {
 const context = useContext(MoviesContext);

 const handleAddToWatchList = (e) => {
    e.preventDefault();
 };

 return (
    <IconButton aria-label="more information">
      <RecommendIcon color="primary" />
    </IconButton>
 );
};

export default ReadMore;