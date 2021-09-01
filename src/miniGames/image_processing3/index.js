import {
  Button,
  Container,
  Grid,
  ButtonGroup,
  makeStyles,
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import {
  decomposeToChannelsAction,
} from '../../redux/slices/games';


const useStyles = makeStyles(() => ({
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
  decomposeToChannels,

  imageFileSource,
  imageFileName,
  blueResultImage,
  redResultImage,
  greenResultImage,
}) {
  const classes = useStyles();
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
    <Container className={classes.container} >
      <Grid container spacing={2} justify='center' alignItems='center'>
        <Grid container item justify='center' alignItems='center' xs={5} direction='column' spacing={2}>
          <Grid container item justify='center' alignItems='center' xs={12}>
            <img alt='' className={classes.image} src={blueResultImage || imageFileSource} />
          </Grid>
          <Grid container item justify='center' alignItems='center' xs={12}>
            <img alt='' className={classes.image} src={redResultImage || imageFileSource} />
          </Grid>
          <Grid container item justify='center' alignItems='center' xs={12}>
            <img alt='' className={classes.image} src={greenResultImage || imageFileSource} />
          </Grid>
        </Grid>
        <Grid container item justify='center' alignItems='center' xs={2} direction='column'>
          <Grid item>
            <ArrowRightAltIcon />
          </Grid>
          <Grid item>
            <ArrowRightAltIcon />
          </Grid>
          <Grid item>
            <ArrowRightAltIcon />
          </Grid>
        </Grid>
        <Grid container item justify='center' alignItems='center' xs={5}>
          <img alt='' className={classes.image}
            src={imageFileSource} />
        </Grid>
        <Grid item xs={6}>
          <ButtonGroup fullWidth variant='contained' color='primary'>
            {/* <Button onClick={() => document.getElementById('userProfilePicture').click()}>
              {'انتخاب تصویر'}
            </Button>
            <input
              value={file?.value}
              accept="application/pdf,image/*"
              style={{ display: 'none' }}
              id={'userProfilePicture'}
              type="file"
              onChange={handleFileChange}
            /> */}
            <Button onClick={decompose}>
              {'اعمال'}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  images: state.games.images,
  blueResultImage: state.games.blueResultImage,
  greenResultImage: state.games.greenResultImage,
  redResultImage: state.games.redResultImage,
})

export default connect(
  mapStateToProps,
  {
    decomposeToChannels: decomposeToChannelsAction,
  }
)(Index);