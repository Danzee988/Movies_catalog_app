import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Tooltip from "@mui/material/Tooltip";
import { AuthContext } from '../../contexts/authContext';


const AddToWatchListIcon = ({ movie }) => {
 const context = useContext(MoviesContext);
 const { userId } = useContext(AuthContext);

 const handleAddToWatchList = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("movie card ", token)
    context.addToWatchList(movie, token, userId);
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

