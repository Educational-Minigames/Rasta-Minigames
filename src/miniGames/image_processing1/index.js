import { Button, Container, Grid, Slider, Stack } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  applyThresholdAction
} from '../../redux/slices/games';

function Index({
  applyThreshold,
  imageFileName,
  imageFileSource,
  resultImage,
}) {
  const [threshold, setThreshold] = useState(100);

  const onClick = () => {
    applyThreshold({ threshold, image_file: imageFileName });
  }
  return (
    <Container>
      <Stack
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: '100vh',
        }}
        spacing={2}>
        <Grid container alignItems='center' justifyContent='center' spacing={2}>
          <Grid item xs={12} sm={5}>
            <img
              alt=''
              style={{
                width: '100%', borderRadius: '5px',
              }}
              src={resultImage || imageFileSource} />
          </Grid>
          <Grid item>
            <ArrowRightAltIcon />
          </Grid>
          <Grid item xs={12} sm={5}>
            <img
              alt=''
              style={{
                width: '100%', borderRadius: '5px',
              }}
              width='150px' src={imageFileSource || process.env.PUBLIC_URL + '/loading.gif'} />
          </Grid>
        </Grid>
        <Slider min={0} max={255}
          value={threshold} valueLabelDisplay="auto"
          onChange={(event, newValue) => setThreshold(newValue)} />
        <Button variant='contained' fullWidth color='primary' onClick={onClick}>
          {'اعمال'}
        </Button>
      </Stack>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  image: state.games.image,
  resultImage: state.games.resultImage,
})

export default connect(mapStateToProps, {
  applyThreshold: applyThresholdAction,
})(Index);