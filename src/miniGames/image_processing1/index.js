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
  imageProcessingWorkshop1Action
} from '../../redux/slices/games';
import MuiTheme from '../../theme/MuiThemes/MuiTheme';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
}))

function Index({
  imageProcessingWorkshop1Action,
  image,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(100);

  const onClick = () => {
    imageProcessingWorkshop1Action({ treshhold: value });
  }

  return (
    <Container className={classes.container} >
      <Grid container justify='center'>
        <Grid container item justify='center' alignItems='center' xs={5}>
          <img alt='' width='150px' src={process.env.PUBLIC_URL + '/logo.png'} />
        </Grid>
        <Grid container item justify='center' alignItems='center' xs={2} direction='column'>
          <Grid item>
            <ArrowRightAltIcon />
          </Grid>
        </Grid>
        <Grid container item justify='center' alignItems='center' xs={5}>
          <img alt='' width='150px' src={image || process.env.PUBLIC_URL + '/logo.png'} />
        </Grid>
        <Grid item xs={12}>
          <ThemeProvider theme={MuiTheme}>
            <Slider min={0} max={255}
              value={value} valueLabelDisplay="auto"
              onChange={(event, newValue) => setValue(newValue)} />
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
})

export default connect(
  mapStateToProps,
  {
    imageProcessingWorkshop1Action,
  }
)(Index);