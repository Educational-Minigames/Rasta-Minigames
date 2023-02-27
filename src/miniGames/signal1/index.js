/* eslint-disable jsx-a11y/media-has-caption */
import { Button, Container, Grid, IconButton, Slider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux'

import {
  applyFilterOnVoiceSegmentAction,
  getTimeChartOfSoundAction,
} from '../../redux/slices/games';

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
  resultImage,
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
      <Grid container justifyContent='center' direction='column' spacing={2}>
        <Grid container item justifyContent='center' alignItems='center'>
          <img alt='' src={timeChartImage || process.env.PUBLIC_URL + '/loading.gif'} style={{ width: '100%' }} />
        </Grid>
        {/* <Grid container item justify='center' alignItems='center'>
          <ArrowDownwardIcon />
        </Grid> */}

        <Grid container item justifyContent='center' alignItems='center'>
          <Grid item xs={10} container justifyContent='center' alignItems='center'>
            <audio ref={audioRef} onTimeUpdate={manageAudioPlay}>
              <source src={process.env.PUBLIC_URL + '/music/' + sound_file} type="audio/mp3" />
            </audio>
            <Slider
              min={0} max={duration} step={0.001}
              value={values} valueLabelDisplay="auto"
              onChange={setSliderValues} />
          </Grid>
          <Grid item xs={1} container justifyContent='center' alignItems='center'>
            <IconButton onClick={playAudio} size="large">
              <PlayCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth color='primary' onClick={applyFilter}>
              {'اعمال'}
            </Button>
          </Grid>
        </Grid>

        {resultImage &&
          <>
            <Grid container item justifyContent='center' alignItems='center'>
              <ArrowDownwardIcon />
            </Grid>
            <Grid container item justifyContent='center' alignItems='center'>
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
    getTimeChartOfSoundAction,
    applyFilterOnVoiceSegmentAction,
  }
)(Index);