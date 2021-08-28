import {
  Button,
  Container,
  Grid,
  makeStyles,
  Slider,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { ThemeProvider } from '@material-ui/styles';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  applyThresholdAction
} from '../../redux/slices/games';
import MuiTheme from '../../theme/MuiThemes/MuiTheme';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  image: {
    width: '100%',
    borderRadius: '5px',
  }
}))

function Index({
  applyThreshold,
  imageFileName,
  imageFileSource,
  resultImage,
}) {
  const classes = useStyles();
  const [threshold, setThreshold] = useState(100);

  const onClick = () => {
    applyThreshold({ threshold, image_file: imageFileName });
  }

  return (
    <Container className={classes.container} >
      <Grid container justify='center'>
        <Grid container item justify='center' alignItems='center' xs={5}>
          <img alt='' className={classes.image}
            src={resultImage || imageFileSource} />
        </Grid>
        <Grid container item justify='center' alignItems='center' xs={2} direction='column'>
          <Grid item>
            <ArrowRightAltIcon />
          </Grid>
        </Grid>
        <Grid container item justify='center' alignItems='center' xs={5}>
          <img alt='' className={classes.image}
            width='150px' src={imageFileSource || process.env.PUBLIC_URL + '/loading.gif'} />
        </Grid>
        <Grid item xs={12}>
          <ThemeProvider theme={MuiTheme}>
            <Slider min={0} max={255}
              value={threshold} valueLabelDisplay="auto"
              onChange={(event, newValue) => setThreshold(newValue)} />
          </ThemeProvider>
        </Grid>
        <Grid item xs={6}>
          <Button variant='outlined' fullWidth color='primary' onClick={onClick}>
            {'اعمال'}
          </Button>
        </Grid>
      </Grid>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  image: state.games.image,
  resultImage: state.games.resultImage,
})

export default connect(
  mapStateToProps,
  {
    applyThreshold: applyThresholdAction,
  }
)(Index);