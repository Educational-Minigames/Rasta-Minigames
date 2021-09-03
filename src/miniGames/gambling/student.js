import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  Paper,
  TableCell,
  TextField,
  Slider,
  ButtonGroup,
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { ThemeProvider } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { allPlayerGamblesSubscription } from '../../parse/gambling'
import {
  createPlayerGambleAction,
  deletePlayerGambleAction,
  getPlayerGambleAction,
  updatePlayerGambleAction,
  submitScoreToActivePlayersAction,
  startNewRoundAction,
  makeMeOutForThisGameAction,
  createPlayerGamblerAction,
} from '../../redux/slices/games';
import MuiTheme from '../../theme/MuiThemes/MuiTheme';

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
  }
}))

function Index({
  getPlayerGamble,
  createPlayerGamble,
  updatePlayerGamble,
  deletePlayerGamble,
  makeMeOutForThisGame,
  createPlayerGambler,

  allPlayerGambles,
}) {
  const classes = useStyles();
  const [name, setName] = useState();
  const [isRegistered, setRegistered] = useState(false);
  const [me, setMe] = useState();

  useEffect(() => {
    if (allPlayerGambles) {
      for (let i = 0; i < allPlayerGambles.length; i++) {
        if (allPlayerGambles[i].name == name) {
          setMe(allPlayerGambles[i]);
        }
      }
    }
  }, [name, allPlayerGambles])

  useEffect(async () => {
    getPlayerGamble();
    const subscription = await allPlayerGamblesSubscription();
    subscription.on('create', (playerGamble) => {
      const name = playerGamble.get('name');
      const temporaryScore = playerGamble.get('temporaryScore');
      const totalScore = playerGamble.get('totalScore');
      const isActive = playerGamble.get('isActive');
      createPlayerGamble({ name, temporaryScore, totalScore, isActive });
    });
    subscription.on('update', (playerGamble) => {
      const name = playerGamble.get('name');
      const temporaryScore = playerGamble.get('temporaryScore');
      const totalScore = playerGamble.get('totalScore');
      const isActive = playerGamble.get('isActive');
      updatePlayerGamble({ name, temporaryScore, totalScore, isActive });
    });
    subscription.on('delete', (playerGamble) => {
      const name = playerGamble.get('name');
      const temporaryScore = playerGamble.get('temporaryScore');
      const totalScore = playerGamble.get('totalScore');
      const isActive = playerGamble.get('isActive');
      deletePlayerGamble({ name, temporaryScore, totalScore, isActive });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [])

  const doRegister = () => {
    createPlayerGambler({ name });
    setRegistered(true);
  }

  const doLogoutFromGame = () => {
    makeMeOutForThisGame({ name });
  }

  const sortPlayerGambles = (a, b) => {
    if (a.isActive > b.isActive) {
      return -1;
    } else if (a.isActive < b.isActive) {
      return 1;
    }
    if (a.totalScore > b.totalScore) {
      return -1;
    }
    return 1;
  }

  return (
    <Container className={classes.container} >
      <Grid container justify='center' alignItems='center' spacing={2} xs={12} sm={8}>
        <Grid item xs={12}>
          <Typography align='center' variant='h1'>
            {'تیاسی'}
          </Typography>
        </Grid>
        {!isRegistered &&
          <>
            <Grid item xs={12} sm={6}>
              <TextField size='small' label='نام و نام خانوادگی' variant='outlined' fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' disabled={!name} fullWidth color='primary' onClick={doRegister}>
                {'ورود'}
              </Button>
            </Grid>
          </>
        }
        {isRegistered &&
          <>
            <Grid item xs={12} sm={6}>
              <Typography align='center' variant='h2'>
                {`نام شما: ${name}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ButtonGroup variant='contained' fullWidth color='primary' >
                <Button disabled={!me?.isActive} onClick={doLogoutFromGame}>
                  {'خروج از بازی'}
                </Button>
              </ButtonGroup>
            </Grid>
          </>
        }
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>نام</TableCell>
                  <TableCell align='center'>امتیاز این دست</TableCell>
                  <TableCell align='center'>امتیاز کل</TableCell>
                  <TableCell align='center'>وضعیت</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allPlayerGambles?.slice().sort(sortPlayerGambles).map((playerGamble, index) =>
                  <TableRow selected={playerGamble.name == name && isRegistered} key={index}>
                    <TableCell align='center'>
                      {playerGamble.name}
                    </TableCell>
                    <TableCell align='center'>
                      {playerGamble.temporaryScore}
                    </TableCell>
                    <TableCell align='center'>
                      {playerGamble.totalScore}
                    </TableCell>
                    <TableCell align='center'>
                      {playerGamble.isActive ? 'حاضر' : 'کنارکشیده'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  allPlayerGambles: state.games.allPlayerGambles,
})

export default connect(
  mapStateToProps,
  {
    makeMeOutForThisGame: makeMeOutForThisGameAction,
    createPlayerGambler: createPlayerGamblerAction,
    submitScoreToActivePlayers: submitScoreToActivePlayersAction,
    startNewRound: startNewRoundAction,
    createPlayerGamble: createPlayerGambleAction,
    updatePlayerGamble: updatePlayerGambleAction,
    deletePlayerGamble: deletePlayerGambleAction,
    getPlayerGamble: getPlayerGambleAction,
  }
)(Index);