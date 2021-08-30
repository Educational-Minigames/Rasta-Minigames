import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: 'auto !important',
    marginLeft: 'auto !important',
    minHeight: '100vh',
    width: '100vw',
  },
  iframe: {
    border: '0px',
  },
}));

function index({ title, src }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <iframe className={classes.iframe} title={title}
        src={src} width={window.innerWidth} height={window.innerHeight}
        scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen />
    </div>
  );
}

export default index;


