/* eslint-disable jsx-a11y/media-has-caption */
import {
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Slider,
  TextField,
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { ThemeProvider } from '@material-ui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux'

import {
  applyFilterWithSpecificFrequencyOnVoiceSegmentAction,
  getTimeChartOfSoundAction,
} from '../../redux/slices/games';
import {
  addNotificationAction,
} from '../../redux/slices/notifications';
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
  addNotification,
  applyFilterWithSpecificFrequencyOnVoiceSegment,
  getTimeChartOfSoundAction,
  sound_file = 'Noise.wav',
  duration = 1.22,
  timeChartImage,
  resultImage,
}) {
  const classes = useStyles();
  const audioRef = useRef();
  const [timeValues, setTimeValues] = useState([0.1, 0.6]);
  const [frequencyValues, setFrequencyValues] = useState([-1, 1]);

  useEffect(() => {
    getTimeChartOfSoundAction({ sound_file });
  }, [])

  const applyFilter = () => {
    applyFilterWithSpecificFrequencyOnVoiceSegment({
      start: timeValues[0],
      end: timeValues[1],
      lowcut: frequencyValues[0],
      highcut: frequencyValues[1],
      sound_file,
    })
  }

  const manageAudioPlay = (e) => {
    if (e.target.currentTime >= timeValues[1]) {
      e.target.pause();
    }
  }

  const playAudio = () => {
    audioRef.current.play();
  }

  return (
    <Container className={classes.container} >
      <Grid container justify='center' direction='column' spacing={1}>
        <Grid item container >
          <Grid container item justify='center' alignItems='center' xs={11}>
            <img alt='' src={timeChartImage || process.env.PUBLIC_URL + '/loading.gif'} style={{ width: '100%' }} />
          </Grid>
          <Grid item container xs={1} justify='center' alignItems='center'>
            <Slider
              orientation='vertical'
              min={0} max={2} step={0.1} marks
              value={frequencyValues} valueLabelDisplay="auto"
              onChange={(_, newValues) => setFrequencyValues(newValues)} />
          </Grid>
        </Grid>

        <Grid container item justify='center' alignItems='center'>
          <Grid item xs={11} container justify='center' alignItems='center'>
            <audio ref={audioRef} onTimeUpdate={manageAudioPlay}>
              <source src={process.env.PUBLIC_URL + '/music/' + sound_file} type="audio/mp3" />
            </audio>
            <ThemeProvider theme={MuiTheme}>
              <Slider
                min={0} max={duration} step={0.1} marks
                value={timeValues} valueLabelDisplay="auto"
                onChange={(_, newValues) => {
                  audioRef.current.currentTime = newValues[0];
                  setTimeValues(newValues);
                }} />
            </ThemeProvider>
          </Grid>
          <Grid item xs={1} container justify='center' alignItems='center'>
            <IconButton onClick={playAudio}>
              <PlayCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button variant='outlined' fullWidth color='primary' onClick={applyFilter}>
            {'اعمال'}
          </Button>
        </Grid>

        {resultImage &&
          <>
            <Grid container item justify='center' alignItems='center'>
              <ArrowDownwardIcon />
            </Grid>
            <Grid container item justify='center' alignItems='center'>
              <img alt='' src={resultImage} style={{ width: '100%' }} />
            </Grid>
          </>
        }

      </Grid>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  timeChartImage: state.games.timeChartImage,
  resultImage: state.games.resultImage,
})

export default connect(
  mapStateToProps,
  {
    addNotification: addNotificationAction,
    getTimeChartOfSoundAction,
    applyFilterWithSpecificFrequencyOnVoiceSegment: applyFilterWithSpecificFrequencyOnVoiceSegmentAction,
  }
)(Index);