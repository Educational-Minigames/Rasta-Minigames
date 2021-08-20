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

import GraphComponent from '../../components/Graph';
import { toPersianNumber } from '../../utils/translateNumber'
import { graphs } from './script3';

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

  const validateMatching = () => {
    setDisableStatus(true);
    if (graphs[tab].getSelectedLinks().length == 0) {
      toast.info('حداقل یه یال انتخاب کن!');
    } else {
      if (graphs[tab].isMatchingValid()) {
        if (graphs[tab].findAugmentingPath().length > 0) {
          toast.error('مسیر افزایشی پیدا کردیم!');
          graphs[tab].colorAugmentingPath();
        } else {
          toast.success('ایول! تطابقت بزرگ‌ترینه!');
        }
      } else {
        toast.error('این یال‌هایی که انتخاب کردی، تشکیل تطابق نمیدن!');
      }
    }
    setTimeout(() => {
      setDisableStatus(false);
    }, 3000)
  }

  const doSetTab = (tabNo) => {
    setGraph(<GraphComponent myGraph={graphs[tabNo]} />);
    setTab(tabNo);
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
              size='small'
            >
              <Button disabled={isDisabled} onClick={validateMatching}>{'بررسی تطابق'}</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}


export default index;