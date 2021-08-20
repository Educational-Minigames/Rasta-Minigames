import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import GraphComponent from '../../components/Graph2';
import { toPersianNumber } from '../../utils/translateNumber'
import { graphs } from './script';

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

function index() {
  const classes = useStyles();
  const [Graph, setGraph] = useState(<GraphComponent myGraph={graphs[0]} />);
  const [tab, setTab] = useState(0);
  const [isDisabled, setDisableStatus] = useState(false);

  const checkAnswer = () => {
    setDisableStatus(true);
    if (graphs[tab].getSelectedLinks().length == 0) {
      toast.info('حداقل یه یال انتخاب کن!');
    } else {
      if (graphs[tab].isMatchingValid()) {
        if (graphs[tab].calculateGameTheoryAnswer()) {
          toast.success('ایول! جوابت درسته.');
        } else {
          toast.error('اینا علاقه دارن سیستم رو دور بزنن!');
        }
      } else {
        toast.error('توجه کن که یک اهداکننده نمی‌تونه کلیه‌ش رو به چند نفر اهدا کنه، همین‌جور یک بیمار نمی‌تونه از چندتا اهداکننده کلیه بگیره.', { autoClose: 5000 });
      }
    }
    setTimeout(() => {
      setDisableStatus(false);
    }, 3000)
  }

  return (
    <Grid className={classes.container}>
      {Graph}
      {/* <div className={classes.top_left}>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <ButtonGroup
              orientation="vertical"
              color="secondary"
              variant='contained'
              size='small'
              fullWidth
            >
              <Button onClick={() => doSetTab(0)}> {'گراف اول'}</Button>
              <Button onClick={() => doSetTab(1)}> {'گراف اول'}</Button>
              <Button onClick={() => doSetTab(2)}> {'گراف اول'}</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div> */}

      <div className={classes.bottomButtons}>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <ButtonGroup
              color="secondary"
              variant='contained'
            >
              <Button disabled={isDisabled} onClick={checkAnswer}>{'بررسی'}</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}


export default index;