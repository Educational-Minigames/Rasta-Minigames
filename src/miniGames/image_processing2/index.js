import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import { applyMatrixFilterAction } from "../../redux/slices/games";

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


const createMatrix = (size) => {
  let table = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
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
  const [size, setSize] = useState(3);
  const [table, setTable] = useState(createMatrix(size));


  useEffect(() => {
    setTable(createMatrix(size));
  }, [size])

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(number)) {
      return true;
    } else {
      return false;
    }
  };

  const applyFilter = () => {
    applyMatrixFilter({ image_file: imageFileName, kernel: table })
  }

  return (
    <Container className={classes.container} >
      <Grid container spacing={2} justify='center' alignItems='center'>
        <Grid container item xs={6} spacing={2}>
          <Grid item xs={12}>
            {
              [...Array(size).keys()].map((i) => (
                <Grid key={i} container item>
                  {[...Array(size).keys()].map((j) => (
                    <Grid key={j} item xs>
                      <TextField variant='outlined' value={table[i][j]}
                        inputProps={{ className: 'ltr-input' }}
                        onChange={(e) => {
                          if (isJustDigits(e.target.value)) {
                            const newTable = [...table];
                            newTable[i][j] = parseInt(e.target.value) || 0;
                            setTable(newTable)
                          }
                        }} />
                    </Grid>
                  ))}
                </Grid>
              ))
            }
          </Grid>
          <Grid item xs={12}>
            <FormControl size='small' variant="outlined" fullWidth>
              <InputLabel>اندازه جدول</InputLabel>
              <Select
                value={size}
                onChange={(e) => { setSize(e.target.value) }}
                name='province'
                label='اندازه جدول'>
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
        <Grid item container justify='center' alignItems='center' xs={6}>
          <img alt='' className={classes.image}
            src={resultImage || imageFileSource} />
        </Grid>
        <Grid item xs={12} container justify='center'>
          <ButtonGroup fullWidth variant='contained' color='primary'>
            <Button onClick={applyFilter}>
              {'اعمال با فیلتر دلخواه'}
            </Button>
            <Button>
              {'اعمال با فیلتر گوسی'}
            </Button>
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