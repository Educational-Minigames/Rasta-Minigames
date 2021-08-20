import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import * as druid from "@saehrimnir/druidjs";
import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
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

const DIMENSION = 10;
const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const accounts = [
  'آشپزی سالم',
  'پرسپولیس',
  'فوتبال برتر',
  'نود',
  'هاشم بیک‌زاده',
  'حامد احمدزاده',
  'نی‌نوازان',
  'همایون شجریان',
  'موسیقی شب',
  'مهسا میرزایی',
]

const tmp = new Array(DIMENSION);
for (let i = 0; i < DIMENSION; i++) {
  tmp[i] = new Array(DIMENSION);
}

for (let i = 0; i < DIMENSION; i++) {
  for (let j = 0; j < DIMENSION; j++) {
    tmp[i][j] = 0;
    if (i == j) tmp[i][i] = 100;
  }
}

let chartData = {
  datasets: [
    {
      label: '',
      data: [],
      backgroundColor: '',
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

function index() {
  const classes = useStyles();
  const [_, rerender] = useState();
  const [data, setData] = useState(tmp);
  const [tab, setTab] = useState(0);

  const setValue = (e) => {
    const i = parseInt(e.target.name[0]);
    const j = parseInt(e.target.name[2]);
    const row = data[i];
    try {
      row[j] = parseFloat(e.target.value);
    }
    catch {
      toast.error('اشکالی در ذخیره‌ی مقدار این خونه از جدول وجود داشت! دوباره تلاش کن.');
      return;
    }
    setData([
      ...data.slice(0, i),
      row,
      ...data.slice(i + 1, DIMENSION)
    ]);
  }

  const isEnglishDigit = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(number)) {
      return number;
    } else {
      return false;
    }
  };

  const calculateAnswer = () => {
    druid.MDS.transform_async(druid.Matrix.from(data)).then(
      (result) => {
        chartData.datasets = [];
        for (let i = 0; i < result._data.length; i += 2) {
          chartData.datasets.push({
            label: accounts[i / 2],
            data: [{ x: Math.floor(result._data[i] * 10000) / 10000, y: Math.floor(result._data[i + 1] * 10000) / 10000 }],
            backgroundColor: stringToColor(accounts[i / 2].slice(0, 5)),
          })
        }
        rerender(Math.random());
      }
    );
  }


  return (
    <Container className={classes.container} >

      <div className={classes.top_left}>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <ButtonGroup
              color="secondary"
              variant='contained'
              size='small'
            >
              <Button disabled={tab == 0} onClick={() => setTab(0)}>{'جدول'}</Button>
              <Button disabled={tab == 1} onClick={() => { setTab(1); calculateAnswer(); }}>{'نمودار'}</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>

      {/* {tab == 1 &&
        <div className={classes.bottomButtons}>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <ButtonGroup
                color="secondary"
                variant='contained'
                size='small'
              >
                <Button onClick={calculateAnswer}>{'کاهش بعد'}</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </div>
      } */}

      {tab == 0 &&
        <Grid container justify='center' alignItems='center'>
          <div className={classes.tableContainer} >
            <table className={classes.table}>
              <tr>
                <th></th>
                {accounts.map((account) => (
                  <th key={account}>
                    <th><Typography align='center' size='small'>{account}</Typography></th>
                  </th>
                ))}
              </tr>
              {accounts.map((account, i) => (
                <tr key={account}>
                  <th><Typography align='center' size='small'>{account}</Typography></th>
                  {accounts.map((num, j) => (
                    <th key={num}>
                      <TextField size='small' style={{ minWidth: '60px' }} disabled={i == j} defaultValue={i == j ? 'X' : data[i][j]} name={[i, j]} variant='outlined' onBlur={setValue} />
                    </th>
                  ))}
                </tr>
              ))
              }
            </table>
          </div>
        </Grid>
      }

      {tab == 1 &&
        <Grid container justify='center' alignItems='center' xs={12} md={10} >
          <Scatter data={chartData} options={options} />
        </Grid>
      }


    </Container >
  );
}


export default index;