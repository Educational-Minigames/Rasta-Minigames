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
  applyFilterOnVoiceSegmentAction,
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


const roundBy2 = (number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100
}


function Index({
  addNotification,
  getTimeChartOfSoundAction,
  applyFilterOnVoiceSegmentAction,
  sound_file = 'Noise.wav',
  duration = 1.22,
  timeChartImage,
  resultImage,
}) {
  const classes = useStyles();
  const audioRef = useRef();
  const [segmentLength, setSegmentLength] = useState();
  const [fixedSegmentLength, setFixedSegmentLength] = useState()
  const [values, setValues] = useState([0, 0]);

  useEffect(() => {
    getTimeChartOfSoundAction({ sound_file });
  }, [])

  const applyFilter = () => {
    applyFilterOnVoiceSegmentAction({ start: values[0], end: values[1], sound_file })
  }

  const doSetFixedSegmentLength = () => {
    if (segmentLength >= 1 || segmentLength < 0) {
      addNotification({
        message: 'لطفاً یک عدد مثبت کمتر از ۱ وارد کن!',
        type: 'error',
      });
      return;
    }
    setFixedSegmentLength(roundBy2(parseFloat(segmentLength)))
    setValues([0, roundBy2(parseFloat(segmentLength))])
  }

  const setSliderValues = (event, newValues) => {
    if ((newValues[1] - newValues[0]) <= fixedSegmentLength) {
      setValues[values];
      return;
    }
    if (newValues[0] == values[0]) {
      setValues([roundBy2(newValues[1] - parseFloat(fixedSegmentLength)), newValues[1]])
      audioRef.current.currentTime = roundBy2(newValues[1] - parseFloat(fixedSegmentLength));
    } else {
      setValues([newValues[0], roundBy2(newValues[0] + parseFloat(fixedSegmentLength))])
      audioRef.current.currentTime = roundBy2(newValues[0]);
    }
  }

  const manageAudioPlay = (e) => {
    if (e.target.currentTime >= values[1]) {
      e.target.pause();
    }
  }

  const playAudio = () => {
    audioRef.current.play();
  }

  const reset = () => {
    setSegmentLength()
    setFixedSegmentLength()
    setValues([0, 0])
  }

  return (
    <Container className={classes.container} >
      <div style={{ position: 'fixed', left: '10px', top: '10px' }}>
        <Button variant='contained' fullWidth color='primary' onClick={reset}>
          {'از اول'}
        </Button>
      </div>
      <Grid container justify='center' direction='column' spacing={1}>
        <Grid container item justify='center' alignItems='center'>
          <img alt='' src={timeChartImage || process.env.PUBLIC_URL + '/loading.gif'} style={{ width: '100%' }} />
        </Grid>

        <Grid item container justify='center' alignItems='center' spacing={1}>
          <Grid item xs={6}>
            <Button disabled={fixedSegmentLength} variant='contained' fullWidth color='primary' onClick={doSetFixedSegmentLength}>
              {'ثبت'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth disabled={fixedSegmentLength}
              variant='outlined' size='small' label='طول بازه'
              inputProps={{ className: 'ltr-input' }}
              onChange={(e) => setSegmentLength(e.target.value)} />
          </Grid>
        </Grid>

        <Grid container item justify='center' alignItems='center'>
          <Grid item xs={10} container justify='center' alignItems='center'>
            <audio ref={audioRef} onTimeUpdate={manageAudioPlay}>
              <source src={process.env.PUBLIC_URL + '/music/' + sound_file} type="audio/mp3" />
            </audio>
            <ThemeProvider theme={MuiTheme}>
              <Slider
                disabled={!fixedSegmentLength}
                min={0} max={duration} step={0.01} marks
                value={values} valueLabelDisplay="auto"
                onChange={setSliderValues} />
            </ThemeProvider>
          </Grid>
          <Grid item xs={1} container justify='center' alignItems='center'>
            <IconButton disabled={!fixedSegmentLength} onClick={playAudio}>
              <PlayCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button variant='contained' fullWidth color='primary' onClick={applyFilter}>
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
    applyFilterOnVoiceSegmentAction,
  }
)(Index);