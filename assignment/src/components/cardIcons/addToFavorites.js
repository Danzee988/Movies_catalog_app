import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { AuthContext } from '../../contexts/authContext';

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const { userId } = useContext(AuthContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    context.addToFavorites(movie, token, userId);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <Tooltip title="Add to favorites" arrow>
        <FavoriteIcon color="primary" fontSize="large" />
      </Tooltip>
    </IconButton>
  );
};

export default AddToFavoritesIcon;
