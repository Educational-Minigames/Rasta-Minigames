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
      <iframe className={classes.iframe} title='Complexity Explorables | Facebooked Flu Shots.html' src={`${process.env.PUBLIC_URL}/MiniGames/Network_Vaccination/Complexity Explorables | Facebooked Flu Shots.html`} />
    </div>
  );
}

export default index;


