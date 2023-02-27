import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

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
    <Routes>
      {
        MINI_GAMES.map((miniGame, index) => {
          if (miniGame.component) {
            return (
              <Route key={index} exact path={miniGame.url} element={<miniGame.component {...miniGame.props} />} />
            )
          }
        })
      }
      {/* <Route exact path="/Conways_Game_Of_Life" component={Conways_Game_Of_Life} /> */}
      <Route exact path="/Collective_Behavior_Of_Fish" element={<Collective_Behavior_Of_Fish />} />
      <Route exact path="/Ant_Colony_Optimization" element={<Ant_Colony_Optimization />} />
      <Route exact path="/Game_Of_Life_Simulation" element={<Game_Of_Life_Simulation />} />
      <Route exact path="/Network_Vaccination" element={<Network_Vaccination />} />
      <Route exact path="/Tarkibiat/1" element={<Tarkibiat1 />} />
      <Route exact path="/Tarkibiat/2" element={<Tarkibiat2 />} />
      <Route exact path="/Tarkibiat/3" element={<Tarkibiat3 />} />
      <Route exact path="/Defusing_Bomb" element={<Defusing_Bomb />} />
      <Route exact path="/Account2Points" element={<Account2Points />} />
      <Route exact path="/Donor_Patient/1" element={<Donor_Patient1 />} />
      <Route exact path="/Donor_Patient/2" element={<Donor_Patient2 />} />
      <Route exact path="/Donor_Patient/3" element={<Donor_Patient3 />} />
      <Route exact path="/Donor_Patient/4" element={<Donor_Patient4 />} />
      <Route exact path="/" element={<Landing />} />
      <Route path="*" element={<Navigate to={{ pathname: '/' }} />}
      />
    </Routes>
  );
};

export default MyRoute;
