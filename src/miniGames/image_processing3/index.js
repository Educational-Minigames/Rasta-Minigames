import {
  Button,
  Container,
  Grid,
  ButtonGroup,
  makeStyles,
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'


const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
}))


function Index({
  images,
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
        // uploadFile({
        //   id,
        //   answerFile: e.target.files[0]
        // });
      } else {
        e.target.value = '';
        e.target.setCustomValidity('Maximum upload file size is 8 MB.');
        e.target.reportValidity();
      }
    }
  };

  console.log(file)

  return (
    <Container className={classes.container} >
      <Grid container spacing={2} justify='center' alignItems='center'>
        <Grid container item justify='center' alignItems='center' xs={5}>
          <img alt='' width='150px' height='150px'
            style={{ objectFit: 'cover', borderRadius: '5px' }}
            src={(file && URL.createObjectURL(file)) || process.env.PUBLIC_URL + '/logo.png'} />
        </Grid>
        <Grid container item justify='center' alignItems='center' xs={2} direction='column'>
          <Grid item>
            <KeyboardBackspaceIcon />
          </Grid>
          <Grid item>
            <KeyboardBackspaceIcon />
          </Grid>
          <Grid item>
            <KeyboardBackspaceIcon />
          </Grid>
        </Grid>
        <Grid container item justify='center' alignItems='center' xs={5} direction='column' spacing={2}>
          <Grid container item justify='center' alignItems='center' xs={12}>
            <img alt='' width='150px' height='150px'
              style={{ objectFit: 'cover', borderRadius: '5px' }}
              src={process.env.PUBLIC_URL + '/logo.png'} />
          </Grid>
          <Grid container item justify='center' alignItems='center' xs={12}>
            <img alt='' width='150px' height='150px'
              style={{ objectFit: 'cover', borderRadius: '5px' }}
              src={process.env.PUBLIC_URL + '/logo.png'} />
          </Grid>
          <Grid container item justify='center' alignItems='center' xs={12}>
            <img alt='' width='150px' height='150px'
              style={{ objectFit: 'cover', borderRadius: '5px' }}
              src={process.env.PUBLIC_URL + '/logo.png'} />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <ButtonGroup fullWidth variant='contained' color='primary'>
            <Button onClick={() => document.getElementById('userProfilePicture').click()}>
              {'انتخاب تصویر'}
            </Button>
            <input
              value={file?.value}
              accept="application/pdf,image/*"
              style={{ display: 'none' }}
              id={'userProfilePicture'}
              type="file"
              onChange={handleFileChange}
            />
            <Button >
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
})

export default connect(
  mapStateToProps,
  {

  }
)(Index);