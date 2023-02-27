import { Button, Container, Grid, Slider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { ThemeProvider, StyledEngineProvider } from '@mui/styles';
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
      <Grid container justifyContent='center'>
        <Grid container item justifyContent='center' alignItems='center' xs={5}>
          <img alt='' className={classes.image}
            src={resultImage || imageFileSource} />
        </Grid>
        <Grid container item justifyContent='center' alignItems='center' xs={2} direction='column'>
          <Grid item>
            <ArrowRightAltIcon />
          </Grid>
        </Grid>
        <Grid container item justifyContent='center' alignItems='center' xs={5}>
          <img alt='' className={classes.image}
            width='150px' src={imageFileSource || process.env.PUBLIC_URL + '/loading.gif'} />
        </Grid>
        <Grid item xs={12}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={MuiTheme}>
              <Slider min={0} max={255}
                value={threshold} valueLabelDisplay="auto"
                onChange={(event, newValue) => setThreshold(newValue)} />
            </ThemeProvider>
          </StyledEngineProvider>
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