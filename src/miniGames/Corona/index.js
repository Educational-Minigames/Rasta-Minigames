import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import { Layer, Stage } from 'react-konva';

import { toPersianNumber } from '../../utils/translateNumber'
import PersonView from './person';
import { Society, TESTS } from './script';

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
  resetGame: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 10,
  },
  paper: {
    padding: theme.spacing(2),
  }
}))

function CoronaTest() {
  const classes = useStyles();
  const [_, updateComponent] = useState();
  const [society, setSociety] = useState(new Society(updateComponent));
  const [mode, setMode] = useState(0);
  const [score, setScore] = useState(0);

  const doTakeTest = () => {
    const result = society.takeTest();
    if (result !== 'ERROR') {
      setMode(1);
    }
  }

  const roadToHospital = () => {
    society.reset();
    setMode(2);
  }

  const doSendToHospital = () => {
    const out = society.sendToHospital();
    if (out !== 'ERROR') {
      setScore(out);
      setMode(3);
    }
  }

  const getReadyForAnotherTest = () => {
    society.reset();
    setMode(0);
  }

  const resetGame = () => {
    setSociety(new Society(updateComponent))
    setMode(0);
  }

  console.log(society)

  return (
    <Container className={classes.container}>
      <div className={classes.budget}>
        <Paper className={classes.paper}>
          <Typography variant='h4'>
            {`بودجه‌ی باقی‌مانده: ${toPersianNumber(society.budget)}`}
          </Typography>
        </Paper>
      </div>
      <div className={classes.resetGame}>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <ButtonGroup
              orientation="vertical"
              color="secondary"
              variant='contained'
              fullWidth
            >
              <Button onClick={resetGame}>شروع دوباره‌ی بازی</Button>
              <Button onClick={roadToHospital}>به سوی بیمارستان...</Button>
              <Button onClick={() => { society.selectAll() }}>انتخاب همه</Button>
              <Button onClick={() => { society.unselectAll() }}>حذف انتخاب همه</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>
      <Grid container justifyContent='center' spacing={2}>
        <Grid item>
          <Stage width={window.innerWidth} height={window.innerHeight * 2} >
            <Layer>
              {society.people.map((person) => {
                return (
                  <PersonView
                    key={person.id}
                    id={person.id} x={person.x} y={person.y}
                    name={person.firstName + ' ' + person.lastName}
                    patience={person.patience}
                    isSelected={person.isSelected}
                    imageType={person.imageType}
                    selectPerson={society.selectPerson.bind(society)}
                    unselectPerson={society.unselectPerson.bind(society)} />
                )
              })}
            </Layer>
          </Stage >
        </Grid>
        {mode === 0 &&
          <Grid container item spacing={2} justifyContent='center' alignItems='center'>
            <Grid item xs={12} sm={6} container justifyContent='center' alignItems='center'>
              <FormControl variant="outlined" fullWidth >
                <InputLabel id="demo-simple-select-required-label">تست‌ها</InputLabel>
                <Select
                  variant="standard"
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name='test'
                  label='تست‌ها'
                  onChange={(event) => { society.selectTest(event.target.value) }}>
                  {TESTS.map((test, index) => {
                    return (
                      <MenuItem key={index} value={index}>{`تست شماره ${toPersianNumber(index + 1)} با درصد‌تشخیص ${toPersianNumber(test.diagnosis)} و دشواری ${toPersianNumber(test.difficulty)}. هزینه‌ی این تست به ازای هر نفر ${toPersianNumber(test.cost)} تومان است.`}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl >
            </Grid>
            <Grid item xs={12} sm={3} container justifyContent='center' alignItems='center'>
              <Button variant='contained' color='secondary' fullWidth onClick={doTakeTest}>
                انجام تست
              </Button>
            </Grid>
          </Grid>
        }
        {mode === 1 &&
          <Grid container item spacing={2} justifyContent='center' alignItems='center'>
            <Grid item xs={12} sm={6} container justifyContent='center' alignItems='center'>
              <Button variant='contained' color='secondary' fullWidth onClick={getReadyForAnotherTest}>
                انجام تست مجدد
              </Button>
            </Grid>
          </Grid>
        }
        {mode === 2 &&
          <Grid container item spacing={2} justifyContent='center' alignItems='center'>
            <Grid item xs={12} container justifyContent='center' alignItems='center'>
              <Button variant='contained' color='secondary' fullWidth onClick={doSendToHospital}>
                افرادی رو که فکر می‌کنی بیمار هستند، انتخاب کن و به بیمارستان معرفیشون کن!
              </Button>
            </Grid>
          </Grid>
        }
        {mode === 3 &&
          <Grid container item spacing={2} justifyContent='center' alignItems='center'>
            <Grid item xs={12} container justifyContent='center' alignItems='center'>
              <Paper className={classes.paper}>
                <Typography variant='h4'>
                  {`امتیاز شما: ${toPersianNumber(score)}`}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        }
      </Grid>
    </Container>
  );
}


export default CoronaTest;
