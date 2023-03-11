import { Button, Container, Grid, Stack } from '@mui/material';
import { ArrowLeft } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import {
  decomposeToChannelsAction,
} from '../../redux/slices/games';

function Index({
  decomposeToChannels,

  imageFileSource,
  imageFileName,
  blueResultImage,
  redResultImage,
  greenResultImage,
}) {
  const [size] = useState(3);
  const [, setTable] = useState(new Array(size * size).fill(0));
  const [file, setFile] = useState();

  useEffect(() => {
    setTable(new Array(size * size).fill(0));
  }, [size])

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 8e6) {
        setFile(e.target.files[0])
      } else {
        e.target.value = '';
        e.target.setCustomValidity('Maximum upload file size is 8 MB.');
        e.target.reportValidity();
      }
    }
  };

  const decompose = () => {
    decomposeToChannels({ image_file: imageFileName });
  }

  return (
    <Container sx={{ py: 2 }}>
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
            <img alt=''
              style={{
                width: '100%',
                borderRadius: '5px',
              }}
              src={imageFileSource} />
          </Grid>
          <Grid item sm={1} >
            <Stack justifyContent='center' alignItems='center' spacing={2}>
              <ArrowLeft />
              <ArrowLeft />
              <ArrowLeft />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Stack justifyContent='center' alignItems='center' spacing={2}>
              <img alt=''
                style={{
                  width: '100%',
                  borderRadius: '5px',
                }}
                src={blueResultImage || imageFileSource} />
              <img alt=''
                style={{
                  width: '100%',
                  borderRadius: '5px',
                }}
                src={redResultImage || imageFileSource} />
              <img alt=''
                style={{
                  width: '100%',
                  borderRadius: '5px',
                }}
                src={greenResultImage || imageFileSource} />
            </Stack>
          </Grid>
        </Grid>
        <Button fullWidth variant='contained' color='primary' onClick={decompose}>
          {'اعمال'}
        </Button>
      </Stack>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  images: state.games.images,
  blueResultImage: state.games.blueResultImage,
  greenResultImage: state.games.greenResultImage,
  redResultImage: state.games.redResultImage,
})

export default connect(mapStateToProps, {
  decomposeToChannels: decomposeToChannelsAction,
})(Index);
