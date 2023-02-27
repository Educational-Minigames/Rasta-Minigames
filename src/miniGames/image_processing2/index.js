import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import MuiTheme from '../../theme/MuiThemes/MuiTheme';
import { ThemeProvider, StyledEngineProvider } from '@mui/styles';

import { applyMatrixFilterAction } from "../../redux/slices/games";
import { Height } from '@mui/icons-material';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  image: {
    width: '100%',
    borderRadius: '5px',
  },
}))


const createMatrix = ({ width, height }) => {
  let table = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push(0)
    }
    table.push(row)
  }
  return table;
}

function Index({
  applyMatrixFilter,

  imageFileName,
  imageFileSource,
  resultImage,
}) {
  const classes = useStyles();
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(3);
  const [table, setTable] = useState(createMatrix({ width, height }));


  const changeWidth = (event) => {
    setTable(createMatrix({ width: event.target.value, height }));
    setWidth(event.target.value)
  }

  const changeHeight = (event) => {
    setTable(createMatrix({ width, height: event.target.value }));
    setHeight(event.target.value)
  }

  const applyFilter = () => {
    let newTable = [...table]
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        newTable[j][i] = parseFloat(newTable[j][i]);
      }
    }
    setTable(newTable);
    applyMatrixFilter({ image_file: imageFileName, kernel: JSON.stringify(newTable) })
  }

  return (
    <Container className={classes.container} >
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid container item xs={6} spacing={1}>
          <Grid item xs={12}>
            {
              [...Array(height).keys()].map((i) => (
                <Grid key={i} container item>
                  {[...Array(width).keys()].map((j) => (
                    <Grid key={j} item xs>
                      <TextField
                        fullWidth
                        variant='outlined' value={table[i][width - j - 1]}
                        inputProps={{ className: 'ltr-input' }}
                        onChange={(e) => {
                          let newTable = [...table];
                          newTable[i][width - j - 1] = e.target.value;
                          setTable(newTable);
                        }} />
                    </Grid>
                  ))}
                </Grid>
              ))
            }
          </Grid>
          <Grid item xs={6}>
            <FormControl size='small' variant="outlined" fullWidth>
              <InputLabel>طول</InputLabel>
              <Select variant="standard" value={height} onChange={changeHeight} label='طول'>
                <MenuItem value={2} >2</MenuItem>
                <MenuItem value={3} >3</MenuItem>
                <MenuItem value={4} >4</MenuItem>
                <MenuItem value={5} >5</MenuItem>
                <MenuItem value={6} >6</MenuItem>
                <MenuItem value={7} >7</MenuItem>
              </Select>
            </FormControl >
          </Grid>
          <Grid item xs={6}>
            <FormControl size='small' variant="outlined" fullWidth>
              <InputLabel>ارتفاع</InputLabel>
              <Select variant="standard" value={width} onChange={changeWidth} label='ارتفاع'>
                <MenuItem value={2} >2</MenuItem>
                <MenuItem value={3} >3</MenuItem>
                <MenuItem value={4} >4</MenuItem>
                <MenuItem value={5} >5</MenuItem>
                <MenuItem value={6} >6</MenuItem>
                <MenuItem value={7} >7</MenuItem>
              </Select>
            </FormControl >
          </Grid>
        </Grid>
        <Grid item container justifyContent='center' alignItems='center' xs={6}>
          <img alt='' className={classes.image}
            src={resultImage || imageFileSource} />
        </Grid>
        <Grid item xs={12} container justifyContent='center'>
          <ButtonGroup fullWidth variant='contained' color='primary'>
            <Button onClick={applyFilter}>
              {'اعمال با فیلتر دلخواه'}
            </Button>
            {/* <Button>
              {'اعمال با فیلتر گوسی'}
            </Button> */}
          </ButtonGroup>
        </Grid>
      </Grid>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  image: state.games.image,
  resultImage: state.games.resultImage,
})

export default connect(
  mapStateToProps,
  {
    applyMatrixFilter: applyMatrixFilterAction
  }
)(Index);