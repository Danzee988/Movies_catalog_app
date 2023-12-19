import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const RatingStars = ({ selectedStars, onStarClick }) => {
  const maxStars = 10;

  const handleStarClick = (star) => {
    onStarClick(star);
  };

  return (
    <div>
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          style={{ cursor: 'pointer', color: index < selectedStars ? 'yellow' : 'gray' }}
        >
          {index < selectedStars ? <StarIcon /> : <StarBorderIcon />}
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
