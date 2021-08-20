import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Landing from '../containers/Landing';
import Account2Points from '../MiniGames/Account2Points';
import Ant_Colony_Optimization from '../MiniGames/Ant_Colony_Optimization';
import Collective_Behavior_Of_Fish from '../MiniGames/Collective_Behavior_Of_Fish';
import Conways_Game_Of_Life from '../MiniGames/Conways_Game_Of_Life';
import Defusing_Bomb from '../MiniGames/Defusing_Bomb';
import Donor_Patient1 from '../MiniGames/Donor_Patient1';
import Donor_Patient2 from '../MiniGames/Donor_Patient2';
import Donor_Patient3 from '../MiniGames/Donor_Patient3';
import Donor_Patient4 from '../MiniGames/Donor_Patient4';
import Game_Of_Life_Simulation from '../MiniGames/Game_Of_Life_Simulation';
import Network_Vaccination from '../MiniGames/Network_Vaccination';
import Tarkibiat1 from '../MiniGames/Tarkibiat1';
import Tarkibiat2 from '../MiniGames/Tarkibiat2';
import Tarkibiat3 from '../MiniGames/Tarkibiat3';

const MyRoute = () => {
  return (
    <Switch>
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
