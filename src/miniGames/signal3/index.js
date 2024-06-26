/* eslint-disable jsx-a11y/media-has-caption */
import { Button, Container, Divider, Grid, Slider, Stack, Typography } from '@mui/material';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux'
import {
  applyFilterWithSpecificFrequencyOnVoiceSegmentAction,
  getTimeChartOfSoundAction,
} from '../../redux/slices/games';
import {
  addNotificationAction,
} from '../../redux/slices/notifications';
import LTRTheme from '../../theme/MuiThemes/MuiTheme';



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

  const audioRef = useRef();
  const [frequencyValues, setFrequencyValues] = useState([1000, 3000]);

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

  useEffect(() => {
    if (fftImage) {
      setTimeout(() => {
        document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
      }, 1000)
    }
  }, [fftImage])

  return (
    <Container maxWidth='sm' sx={{ paddingBottom: 2 }}>
      <Stack alignItems={'center'} justifyContent='center' spacing={1}>
        <Stack alignItems={'center'}>
          <img alt='' src={timeChartImage || process.env.PUBLIC_URL + '/loading.gif'} style={{ width: '100%' }} />
          <img alt='' src={frequencyChartImage || process.env.PUBLIC_URL + '/loading.gif'} style={{ width: '100%' }} />
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={LTRTheme}>
              <Slider
                sx={{ direction: 'ltr', width: '70%' }}
                min={0} max={frequencyLimit || 22000} step={100} marks
                value={frequencyValues} valueLabelDisplay="auto"
                onChange={(_, newValues) => setFrequencyValues(newValues)} />
            </ThemeProvider>
          </StyledEngineProvider>
          <audio controls style={{ width: '100%', marginY: 1 }}>
            <source src={process.env.PUBLIC_URL + '/music/' + sound_file} type="audio/mp3" />
          </audio>
          <Button variant='contained' fullWidth color='primary' onClick={applyFilter} sx={{ marginTop: 2 }}>
            {'ارسال'}
          </Button>
        </Stack>

        {fftImage &&
          <>
            <Stack alignItems={'center'} spacing={1}>
              <Stack direction={'row'} alignItems={'center'} sx={{ marginTop: 6 }}>
                <img width='40px' alt='' src={process.env.PUBLIC_URL + '/down.gif'} />
                <Typography id='result' align='center' variant='h1' fontWeight={600}>
                  {'نتایج'}
                </Typography>
                <img width='40px' alt='' src={process.env.PUBLIC_URL + '/down.gif'} />
              </Stack>
              <img alt='' src={filteredFftImage} style={{ width: '100%' }} />
              <img alt='' src={filteredTimeImage} style={{ width: '100%' }} />
              <audio ref={audioRef} controls style={{ width: '100%' }}>
                <source src={sound} type="audio/mp3" />
              </audio>
            </Stack>
          </>
        }
      </Stack>
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

export default connect(mapStateToProps, {
  addNotification: addNotificationAction,
  getTimeChartOfSoundAction,
  applyFilterWithSpecificFrequencyOnVoiceSegment: applyFilterWithSpecificFrequencyOnVoiceSegmentAction,
})(Index);
