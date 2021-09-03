import Parse from 'parse';
const PlayerGamble = Parse.Object.extend('PlayerGamble');

// student:

export const createPlayerGambler = async ({ name }) => {
  const query = new Parse.Query('PlayerGamble');
  query.equalTo('name', name);
  const playerGamble = await query.find();
  if (playerGamble.length == 0) {
    console.log("!!!!!!!!!!!")
    const playerGamble = new PlayerGamble();
    playerGamble.set('name', name);
    playerGamble.save();
  }
}

export const makeMeOutForThisGame = async ({ name }) => {
  const query = new Parse.Query('PlayerGamble');
  query.equalTo('name', name);
  let playerGamble = await query.find();
  playerGamble = playerGamble[0];
  if (!playerGamble) {
    return;
  }
  console.log(playerGamble)
  playerGamble.set('isActive', false);
  playerGamble.save();
}

export const myPlayerGambleSubscription = async ({ name }) => {
  const query = new Parse.Query('PlayerGamble');
  query.equalTo('name', name);
  return await query.subscribe();
};

// mentor:

export const getPlayerGamble = async () => {
  const query = new Parse.Query('PlayerGamble');
  return await query.find();
}

export const submitScoreToActivePlayers = async ({ score }) => {
  const query = new Parse.Query('PlayerGamble');
  query.equalTo('isActive', true);
  const activePlayerGambles = await query.find();
  for (let i = 0; i < activePlayerGambles.length; i++) {
    const previousScore = activePlayerGambles[i].get('temporaryScore')
    activePlayerGambles[i].set('temporaryScore', parseInt(previousScore) + parseInt(score));
    activePlayerGambles[i].save();
  }
}

export const startNewRound = async () => {
  const query = new Parse.Query('PlayerGamble');
  const activePlayerGambles = await query.find();
  for (let i = 0; i < activePlayerGambles.length; i++) {
    const playerTotalScore = activePlayerGambles[i].get('totalScore')
    const playerTemporaryScore = activePlayerGambles[i].get('temporaryScore')

    if (!activePlayerGambles[i].get('isActive')) {
      activePlayerGambles[i].set('totalScore', parseInt(playerTotalScore) + parseInt(playerTemporaryScore));
    }

    activePlayerGambles[i].set('temporaryScore', 0);
    activePlayerGambles[i].set('isActive', true);
    await activePlayerGambles[i].save();
  }
}

export const allPlayerGamblesSubscription = async () => {
  const query = new Parse.Query('PlayerGamble');
  return await query.subscribe();
};









// export const getRequests = async () => {
//   const query = new Parse.Query('RequestMentor');
//   return await query.find();
// };

// export const deleteRequest = async ({ teamId, fsmId }) => {
//   const query = new Parse.Query('RequestMentor');
//   query.equalTo('teamId', teamId);
//   query.equalTo('fsmId', +fsmId);
//   const requests = await query.find();
//   for (let i = 0; i < requests.length; i++) {
//     await requests[i].destroy({});
//   }
//   // await Parse.Object.destroyAll(requests)
//   return;
// };

// export const getRequestSubscription = async () => {
//   const query = new Parse.Query('RequestMentor');
//   return await query.subscribe();
// };
