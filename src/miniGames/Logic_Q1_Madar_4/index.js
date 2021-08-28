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
      <iframe title="Rasta" width="600px" height="400px" src="https://circuitverse.org/simulator/embed/q1-231722f4-4288-44c7-a8eb-d8caa82666e4" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>
    </div>
  );
}

export default index;


