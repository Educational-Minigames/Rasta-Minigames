import { Grid, Zoom } from '@mui/material';
import React from 'react';

import Expert from './Expert';

const ExpertGrid = ({ experts = [], zoomIn, forecast }) => {
  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      {experts
        .filter((expert) => !forecast || expert.forecast === forecast)
        .map((expert, index) => (
          <Zoom in={zoomIn && (forecast || !expert.forecast)} key={index}>
            <Grid item xs={4} sm={3}>
              <Expert expert={expert} />
            </Grid>
          </Zoom>
        ))}
    </Grid>
  );
};

export default ExpertGrid;
