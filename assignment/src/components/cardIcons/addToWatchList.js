import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Tooltip from "@mui/material/Tooltip";

const AddToWatchListIcon = ({ movie }) => {
 const context = useContext(MoviesContext);

 const handleAddToWatchList = (e) => {
    e.preventDefault();
    context.addToWatchList(movie);
    console.log("Added to Watch List:", movie.title);
 };

 return (
    <IconButton aria-label="add to watchlist" onClick={handleAddToWatchList}>
      <Tooltip title="Add to watchlist" arrow>
         <PlaylistAddIcon color="primary" fontSize="large" />
      </Tooltip>
    </IconButton>
 );
};

export default AddToWatchListIcon;

