import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";


const WriteReviewIcon = ({ movie }) => {
  return (
    <Link
      to={`/reviews/form`}
      state={{
          movieId: movie.id,
      }}
    >
      <Tooltip title="Write a review" arrow>
        <RateReviewIcon color="primary" fontSize="large" />
      </Tooltip>
    </Link>
  );
};

export default WriteReviewIcon;