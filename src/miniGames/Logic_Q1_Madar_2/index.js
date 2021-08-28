import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  div: {
    height: '100vh',
    width: '100vw',
  },
  iframe: {
    height: '100%',
    width: '100%',
    border: '0px',
  },
}));

function index() {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <iframe title="Rasta" width="600px" height="400px" src="https://circuitverse.org/simulator/embed/q1_madar_2" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>
    </div>
  );
}

export default index;


