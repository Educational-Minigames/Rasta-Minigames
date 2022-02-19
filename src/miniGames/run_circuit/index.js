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

function Index() {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <iframe className={classes.iframe} title='Logic Circuit ' src={`${process.env.PUBLIC_URL}/MiniGames/run_circuit/Logic Gate Simulator _ Academo.org - Free, interactive, education..html`} />
    </div>
  );
}

export default Index;


