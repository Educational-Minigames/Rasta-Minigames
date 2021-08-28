/* eslint-disable jsx-a11y/media-has-caption */
import {
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Slider,
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { ThemeProvider } from '@material-ui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux'

import {
  applyFilterOnVoiceSegmentAction,
  getTimeChartOfSoundAction,
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
  getTimeChartOfSoundAction,
  applyFilterOnVoiceSegmentAction,
  sound_file = 'Noise.wav',
  duration = 1.22,
  timeChartImage,
  filteredImage,
}) {
  const classes = useStyles();
  const audioRef = useRef();
  const [values, setValues] = useState([0.1, 0.6]);

  useEffect(() => {
    getTimeChartOfSoundAction({ sound_file });
  }, [])

  const applyFilter = () => {
    applyFilterOnVoiceSegmentAction({ start: values[0], end: values[1], sound_file })
  }

  const setSliderValues = (event, newValues) => {
    console.log(audioRef.current.duration)
    audioRef.current.currentTime = newValues[0];
    setValues(newValues)
  }

  const manageAudioPlay = (e) => {
    if (e.target.currentTime > values[1]) {
      e.target.pause();
    }
  }

  const playAudio = () => {
    audioRef.current.play();
  }


  return (
    <Container className={classes.container} >
      <Grid container justify='center' direction='column' spacing={2}>
        <Grid container item justify='center' alignItems='center'>
          <img alt='' src={timeChartImage || process.env.PUBLIC_URL + '/loading.gif'} style={{ width: '100%' }} />
        </Grid>
        <Grid container item justify='center' alignItems='center'>
          <ArrowDownwardIcon />
        </Grid>

        <Grid container item justify='center' alignItems='center'>
          <Grid item xs={10} container justify='center' alignItems='center'>
            <audio ref={audioRef} onTimeUpdate={manageAudioPlay}>
              <source src={process.env.PUBLIC_URL + '/music/' + sound_file} type="audio/mp3" />
            </audio>
            <ThemeProvider theme={MuiTheme}>
              <Slider
                min={0} max={duration} step={0.001}
                value={values} valueLabelDisplay="auto"
                onChange={setSliderValues} />
            </ThemeProvider>
          </Grid>
          <Grid item xs={1} container justify='center' alignItems='center'>
            <IconButton onClick={playAudio}>
              <PlayCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Button variant='outlined' fullWidth color='primary' onClick={applyFilter}>
              {'اعمال'}
            </Button>
          </Grid>
        </Grid>

        <Grid container item justify='center' alignItems='center'>
          <ArrowDownwardIcon />
        </Grid>
        <Grid container item justify='center' alignItems='center'>
          <img alt='' src={timeChartImage || process.env.PUBLIC_URL + '/loading.gif'} style={{ width: '100%' }} />
        </Grid>

      </Grid>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  timeChartImage: state.games.timeChartImage,
})

export default connect(
  mapStateToProps,
  {
    getTimeChartOfSoundAction,
    applyFilterOnVoiceSegmentAction,
  }
)(Index);