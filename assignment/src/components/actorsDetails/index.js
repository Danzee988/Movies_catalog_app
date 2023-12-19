import React from "react";
import { Typography } from "@mui/material";

const ActorsDetails = ({ actorsDetails }) => {

    return(
    <>
      <Typography variant="h4">
        Biography of {actorsDetails?.name}
      </Typography>
      <Typography>
        {actorsDetails?.biography}
      </Typography>

      <div>
        <Typography variant="h6" style={{ display: 'inline' }}>
          Date of birth:&nbsp;
        </Typography>

        <Typography style={{ display: 'inline' }}>
          {actorsDetails?.birthday}
        </Typography>
      </div>

      <div>
        <Typography variant="h6" style={{ display: 'inline' }}>
          Place of birth:&nbsp;
        </Typography>

        <Typography style={{ display: 'inline' }}>
          {actorsDetails?.place_of_birth}
        </Typography>
      </div>
    </>
);
};

export default ActorsDetails;