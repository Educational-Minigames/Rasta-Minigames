import makeStyles from '@mui/styles/makeStyles';
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
      <iframe className={classes.iframe} title='Complexity Explorables _ Thrilling Milling Schelling Herings' src={`${process.env.PUBLIC_URL}/MiniGames/Collective_Behavior_Of_Fish/Complexity Explorables _ Thrilling Milling Schelling Herings.html`} />
    </div>
  );
}

export default Index;


