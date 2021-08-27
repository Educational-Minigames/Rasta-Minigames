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
import { toast } from 'react-toastify';

import { stringToColor } from '../../utils/stringToColor';
import { toPersianNumber } from '../../utils/translateNumber';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  top_left: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 100,
  },
  resetGame: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 10,
  },
  bottomButtons: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 10,
  },
  paper: {
    padding: theme.spacing(2),
  },
  table: {
    height: '500px',
    width: '650px'
  },
  tableContainer: {
    marginTop: theme.spacing(4),
    overflowX: 'auto',
  }

}))


function Index({
  image,
}) {
  const classes = useStyles();
  const [size, setSize] = useState(3);
  const [table, setTable] = useState(new Array(size * size).fill(0));

  useEffect(() => {
    setTable(new Array(size * size).fill(0));
  }, [size])

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(number)) {
      return true;
    } else {
      return false;
    }
  };

  console.log(table)

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
                      <TextField variant='outlined' value={table[i * size + j]}
                        inputProps={{ className: 'ltr-input' }}
                        onChange={(e) => {
                          if (isJustDigits(e.target.value)) {
                            const newTable = [...table];
                            newTable[i * size + j] = parseInt(e.target.value) || 0;
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
                label='اندازه جدول'
              >
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
          <img alt='' width='200px'
            style={{ borderRadius: '5px', objectFit: 'cover' }}
            src={image || process.env.PUBLIC_URL + '/logo.png'} />
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant='contained' color='primary'>
            {'ثبت'}
          </Button>
        </Grid>
      </Grid>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  image: state.games.image,
})

export default connect(
  mapStateToProps,
  {

  }
)(Index);