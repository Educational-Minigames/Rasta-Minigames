import { PhotoSizeSelectLargeSharp } from '@material-ui/icons';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Landing from '../containers/Landing';
import MINI_GAMES from '../miniGames';
import Account2Points from '../miniGames/Account2Points';
import Ant_Colony_Optimization from '../miniGames/Ant_Colony_Optimization';
import Collective_Behavior_Of_Fish from '../miniGames/Collective_Behavior_Of_Fish';
import Conways_Game_Of_Life from '../miniGames/Conways_Game_Of_Life';
import Defusing_Bomb from '../miniGames/Defusing_Bomb';

import Donor_Patient1 from '../miniGames/Donor_Patient1';
import Donor_Patient2 from '../miniGames/Donor_Patient2';
import Donor_Patient3 from '../miniGames/Donor_Patient3';
import Donor_Patient4 from '../miniGames/Donor_Patient4';
import Game_Of_Life_Simulation from '../miniGames/Game_Of_Life_Simulation';
import Network_Vaccination from '../miniGames/Network_Vaccination';
import Tarkibiat1 from '../miniGames/Tarkibiat1';
import Tarkibiat2 from '../miniGames/Tarkibiat2';
import Tarkibiat3 from '../miniGames/Tarkibiat3';

const MyRoute = () => {
  return (
    <Switch>
      {
        MINI_GAMES.map((miniGame, index) => {
          return (
            <Route key={index} exact path={miniGame.url} render={() => <miniGame.component {...miniGame.props} />} />
          )
        })
      }
      <Route exact path="/Conways_Game_Of_Life" component={Conways_Game_Of_Life} />
      <Route exact path="/Collective_Behavior_Of_Fish" component={Collective_Behavior_Of_Fish} />
      <Route exact path="/Ant_Colony_Optimization" component={Ant_Colony_Optimization} />
      <Route exact path="/Game_Of_Life_Simulation" component={Game_Of_Life_Simulation} />
      <Route exact path="/Network_Vaccination" component={Network_Vaccination} />
      <Route exact path="/Tarkibiat/1" component={Tarkibiat1} />
      <Route exact path="/Tarkibiat/2" component={Tarkibiat2} />
      <Route exact path="/Tarkibiat/3" component={Tarkibiat3} />
      <Route exact path="/Defusing_Bomb" component={Defusing_Bomb} />
      <Route exact path="/Account2Points" component={Account2Points} />
      <Route exact path="/Donor_Patient/1" component={Donor_Patient1} />
      <Route exact path="/Donor_Patient/2" component={Donor_Patient2} />
      <Route exact path="/Donor_Patient/3" component={Donor_Patient3} />
      <Route exact path="/Donor_Patient/4" component={Donor_Patient4} />
      <Route exact path="/" component={Landing} />
      <Route
        path="*"
        render={() => <Redirect to={{ pathname: '/' }} />}
      />
    </Switch>
  );
};
export default MyRoute;
