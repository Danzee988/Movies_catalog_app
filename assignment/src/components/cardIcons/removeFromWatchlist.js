import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from '../../contexts/authContext';


const RemoveFromWatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { userId } = useContext(AuthContext);

  const handleRemoveFromWatchlist = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    context.removeFromWatchlist(movie,token, userId);
  };
  
  return (
    <IconButton
      aria-label="remove from watchlist"
      onClick={handleRemoveFromWatchlist}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchlistIcon;