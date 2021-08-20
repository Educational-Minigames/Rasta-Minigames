import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import GraphComponent from '../../components/Graph3';
import { toPersianNumber } from '../../utils/translateNumber'
import { getNextState, graphs } from './script';

const useStyles = makeStyles((theme) => ({

  container: {
    overflow: 'hidden',
    minHeight: '100vh',
    paddingBottom: theme.spacing(2),
  },
  budget: {
    position: 'fixed',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 10,
  },
  top_left: {
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
  }
}))

const omm = [
  'اول',
  'دوم',
  'سوم',
  'چهارم',
  'پنجم',
]
const MY_COLOR = '#2eff00';

function index() {
  const classes = useStyles();
  const [Graph, setGraph] = useState(<GraphComponent myGraph={graphs[0]} />);
  const [currentState, setCurrentState] = useState(0);
  const [inputNumber, setInputNumber] = useState();

  const [tab, setTab] = useState(0);
  const [isDisabled, setDisableStatus] = useState(false);

  const handler = () => {
    if (!setNumber()) return;

    const nextState = getNextState(currentState, inputNumber);

    if (nextState == currentState + 1) {
      toast.success(`ایول! رقم ${omm[currentState]} برابر ${inputNumber} بود.`)
      graphs[tab].getNode(currentState + 2).setColor(MY_COLOR);
      if (currentState == 4) {
        toast.success('ایول! رمز ماشین زمان رو پیدا کردی :)');
      }
    } else {
      toast.error('ای بابا :(');
      graphs[tab].getNode(nextState + 1).setColor('red');
    }
    setCurrentState(nextState);
    setInputNumber('');
  }

  const isEnglishDigit = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(number)) {
      return number;
    } else {
      return false;
    }
  };

  const setNumber = () => {
    let number = inputNumber;
    if (!isEnglishDigit(number)) {
      toast.error('عددی که وارد کردی معتبر نیست :(');
      return false;
    }
    number = parseInt(number);
    if (number < 1 || number > 5) {
      toast.error('لطفاً یک عدد بین ۱ و ۵ وارد کن!');
      return false;
    }
    setInputNumber(number);
    return true;
  }

  const restart = () => {
    setCurrentState(0);
    graphs[tab].nodes.forEach((node) => node.setColor(''));
    graphs[tab].getNode(1).setColor(MY_COLOR);
  }

  return (
    <Grid className={classes.container}>
      {Graph}
      {currentState != 6 && currentState != 7 && currentState != 5 &&
        <div className={classes.bottomButtons}>
          <Grid container justify='center' alignItems='center' spacing={1}>
            <Grid item>
              <ButtonGroup
                color="primary"
                variant='contained'
              >
                <Button disabled={isDisabled} onClick={handler}>{'بررسی'}</Button>
              </ButtonGroup>
            </Grid>
            <Grid item>
              <TextField size='small' variant='outlined' label={`رقم ${omm[currentState]} را وارد کنید`} value={inputNumber} onChange={(e) => { setInputNumber(e.target.value) }} />
            </Grid>
          </Grid>
        </div>
      }
      {(currentState == 6 || currentState == 7 || currentState == 5) &&
        <div className={classes.bottomButtons}>
          <Grid container justify='center' alignItems='center' spacing={1}>
            <Grid item>
              <ButtonGroup
                color="primary"
                variant='contained'
              >
                <Button disabled={isDisabled} onClick={restart}>{'دوباره'}</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </div>
      }
    </Grid>
  );
}

export default index;