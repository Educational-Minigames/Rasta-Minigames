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
  frequencyChartImage,
  frequencyLimit,

  fftImage,
  filteredFftImage,
  filteredTimeImage,
  sound,
}) {
  const classes = useStyles();
  const audioRef = useRef();
  const [frequencyValues, setFrequencyValues] = useState([7000, 15000]);

  useEffect(() => {
    getTimeChartOfSoundAction({ sound_file });
  }, [])

  const applyFilter = () => {
    applyFilterWithSpecificFrequencyOnVoiceSegment({
      lowcut: frequencyValues[0],
      highcut: frequencyValues[1],
      sound_file,
      start: 0,
      end: duration,
    })
  }

  useEffect(() => {
    audioRef.current?.load();
  }, [sound])

  return (
    <Container className={classes.container} >
      <Grid container justify='center' direction='column' spacing={1}>
        <Grid container item justify='center' alignItems='center' xs={12}>
          <img alt='' src={timeChartImage || process.env.PUBLIC_URL + '/loading.gif'} style={{ width: '100%' }} />
        </Grid>
        <Grid container item justify='center' alignItems='center' xs={12}>
          <img alt='' src={frequencyChartImage || process.env.PUBLIC_URL + '/loading.gif'} style={{ width: '100%' }} />
        </Grid>
        <Grid item container xs={12} justify='center' alignItems='center'
          style={{ paddingLeft: 55, paddingRight: 55 }}>
          <ThemeProvider theme={MuiTheme}>
            <Slider
              min={0} max={frequencyLimit || 22000} step={100} marks
              value={frequencyValues} valueLabelDisplay="auto"
              onChange={(_, newValues) => setFrequencyValues(newValues)} />
          </ThemeProvider>
        </Grid>

        <Grid item xs={12}>
          <audio controls style={{ width: '100%' }}>
            <source src={process.env.PUBLIC_URL + '/music/' + sound_file} type="audio/mp3" />
          </audio>
        </Grid>

        <Grid item xs={12}>
          <Button variant='contained' fullWidth color='primary' onClick={applyFilter}>
            {'ارسال'}
          </Button>
        </Grid>

        {fftImage &&
          <>
            <Grid container item justify='center' alignItems='center'>
              <img width='40px' alt='' src={process.env.PUBLIC_URL + '/down.gif'} />
              <img width='40px' alt='' src={process.env.PUBLIC_URL + '/down.gif'} />
              <img width='40px' alt='' src={process.env.PUBLIC_URL + '/down.gif'} />
            </Grid>
            <Grid container item justify='center' alignItems='center'>
              <img alt='' src={filteredFftImage} style={{ width: '100%' }} />
            </Grid>
            <Grid container item justify='center' alignItems='center'>
              <img alt='' src={filteredTimeImage} style={{ width: '100%' }} />
            </Grid>
            <Grid container item justify='center' alignItems='center'>
              <audio ref={audioRef} controls style={{ width: '100%' }}>
                <source src={sound} type="audio/mp3" />
              </audio>
            </Grid>
          </>
        }

      </Grid>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  timeChartImage: state.games.timeChartImage,
  frequencyChartImage: state.games.frequencyChartImage,
  frequencyLimit: state.games.frequencyLimit,

  fftImage: state.games.fftImage,
  filteredFftImage: state.games.filteredFftImage,
  filteredTimeImage: state.games.filteredTimeImage,
  sound: state.games.sound,
})

export default connect(
  mapStateToProps,
  {
    addNotification: addNotificationAction,
    getTimeChartOfSoundAction,
    applyFilterWithSpecificFrequencyOnVoiceSegment: applyFilterWithSpecificFrequencyOnVoiceSegmentAction,
  }
)(Index);