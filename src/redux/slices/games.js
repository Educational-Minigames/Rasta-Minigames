import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getPlayerGamble,
  startNewRound,
  makeMeOutForThisGame,
  createPlayerGambler,
  submitScoreToActivePlayers,
} from '../../parse/gambling';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  applyFilterOnVoiceSegmentUrl,
  applyFilterWithSpecificFrequencyOnVoiceSegmentUrl,
  applyMatrixFilterUrl,
  applyThresholdUrl,
  decomposeToChannelsUrl,
  getTimeChartOfSoundUrl,
} from '../constants/urls';

const initialState = {
  allPlayerGambles: [],
};

export const applyThresholdAction = createAsyncThunkApi(
  'users/applyThresholdAction',
  Apis.POST,
  applyThresholdUrl,
);

export const applyMatrixFilterAction = createAsyncThunkApi(
  'users/applyMatrixFilterAction',
  Apis.POST_FORM_DATA,
  applyMatrixFilterUrl,
);

export const decomposeToChannelsAction = createAsyncThunkApi(
  'users/decomposeToChannelsAction',
  Apis.POST,
  decomposeToChannelsUrl,
);

export const getTimeChartOfSoundAction = createAsyncThunkApi(
  'users/getTimeChartOfSoundAction',
  Apis.POST,
  getTimeChartOfSoundUrl,
);

export const applyFilterOnVoiceSegmentAction = createAsyncThunkApi(
  'users/applyFilterOnVoiceSegmentAction',
  Apis.POST,
  applyFilterOnVoiceSegmentUrl,
);

export const applyFilterWithSpecificFrequencyOnVoiceSegmentAction = createAsyncThunkApi(
  'users/applyFilterWithSpecificFrequencyOnVoiceSegmentAction',
  Apis.POST,
  applyFilterWithSpecificFrequencyOnVoiceSegmentUrl,
);



export const getPlayerGambleAction = createAsyncThunk(
  'games/getPlayerGambleAction',
  async (arg, { rejectWithValue }) => {
    try {
      const playerGambles = await getPlayerGamble();
      const allPlayerGambles = [];
      playerGambles.forEach((request) => {
        const name = request.get('name');
        const temporaryScore = request.get('temporaryScore');
        const totalScore = request.get('totalScore');
        const isActive = request.get('isActive')
        allPlayerGambles.push({
          name,
          temporaryScore,
          totalScore,
          isActive,
        })
      });
      return { allPlayerGambles };
    } catch (err) {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره. یه چند لحظه دیگه دوباره تلاش کن!',
      });
    }
  }
);


export const submitScoreToActivePlayersAction = createAsyncThunk(
  'games/submitScoreToActivePlayersAction',
  async ({ score }, { rejectWithValue }) => {
    try {
      await submitScoreToActivePlayers({ score });
    } catch (err) {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره!',
      });
    }
  }
);


export const startNewRoundAction = createAsyncThunk(
  'games/startNewRoundAction',
  async (arg, { rejectWithValue }) => {
    try {
      await startNewRound();
    } catch (err) {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره!',
      });
    }
  }
);


export const createPlayerGamblerAction = createAsyncThunk(
  'games/createPlayerGamblerAction',
  async ({ name }, { rejectWithValue }) => {
    try {
      makeMeOutForThisGame,
        await createPlayerGambler({ name });
    } catch (err) {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره!',
      });
    }
  }
);

export const makeMeOutForThisGameAction = createAsyncThunk(
  'games/makeMeOutForThisGameAction',
  async ({ name }, { rejectWithValue }) => {
    try {
      await makeMeOutForThisGame({ name });
    } catch (err) {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره!',
      });
    }
  }
);









const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: () => initialState,
    createPlayerGamble: (state, { payload }) => {
      console.log("payload   ", payload)
      state.allPlayerGambles = [payload, ...state.allPlayerGambles]
    },
    updatePlayerGamble: (state, { payload: { name, temporaryScore, totalScore, isActive } }) => {
      let newAllPlayerGambles = [...state.allPlayerGambles];
      for (let i = 0; i < newAllPlayerGambles.length; i++) {
        if (newAllPlayerGambles[i].name == name) {
          newAllPlayerGambles[i] = { name, temporaryScore, totalScore, isActive };
        }
      }
      state.allPlayerGambles = newAllPlayerGambles;
    },
    deletePlayerGamble: (state, { payload: { name } }) => {
      let newAllPlayerGambles = [...state.allPlayerGambles];
      for (let i = 0; i < newAllPlayerGambles.length; i++) {
        if (newAllPlayerGambles[i].name == name) {
          newAllPlayerGambles.splice(i, 1);
        }
      }
      state.allPlayerGambles = newAllPlayerGambles;
    },
  },
  extraReducers: {
    [applyThresholdAction.pending.toString()]: isFetching,
    [applyThresholdAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.resultImage = 'https://' + response.image_dir;
      state.isFetching = false;
    },
    [applyThresholdAction.rejected.toString()]: isNotFetching,


    [applyMatrixFilterAction.pending.toString()]: isFetching,
    [applyMatrixFilterAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.resultImage = 'https://' + response.image_dir;
      state.isFetching = false;
    },
    [applyMatrixFilterAction.rejected.toString()]: isNotFetching,


    [decomposeToChannelsAction.pending.toString()]: isFetching,
    [decomposeToChannelsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.blueResultImage = 'https://' + response.blue_image_dir;
      state.greenResultImage = 'https://' + response.green_image_dir;
      state.redResultImage = 'https://' + response.red_image_dir;
      state.isFetching = false;
    },
    [decomposeToChannelsAction.rejected.toString()]: isNotFetching,


    [getTimeChartOfSoundAction.pending.toString()]: isFetching,
    [getTimeChartOfSoundAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.timeChartImage = 'https://' + response.time_dir;
      state.frequencyChartImage = 'https://' + response.fft_dir;
      state.frequencyLimit = response.f_domain;

      state.isFetching = false;
    },
    [getTimeChartOfSoundAction.rejected.toString()]: isNotFetching,


    [applyFilterOnVoiceSegmentAction.pending.toString()]: isFetching,
    [applyFilterOnVoiceSegmentAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.resultImage = 'https://' + response.fft_dir;
      state.isFetching = false;
    },
    [applyFilterOnVoiceSegmentAction.rejected.toString()]: isNotFetching,


    [applyFilterWithSpecificFrequencyOnVoiceSegmentAction.pending.toString()]: isFetching,
    [applyFilterWithSpecificFrequencyOnVoiceSegmentAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.fftImage = 'https://' + response.fft_dir;
      state.filteredFftImage = 'https://' + response.filtered_fft_dir;
      state.filteredTimeImage = 'https://' + response.filtered_time_dir;
      state.sound = 'https://' + response.sound_dir;
      state.isFetching = false;
    },
    [applyFilterWithSpecificFrequencyOnVoiceSegmentAction.rejected.toString()]: isNotFetching,



    [getPlayerGambleAction.fulfilled.toString()]: (
      state,
      { payload: { allPlayerGambles } }
    ) => {
      state.allPlayerGambles = allPlayerGambles;
    },

  },
});

export const {
  logout: logoutAction,
  createPlayerGamble: createPlayerGambleAction,
  deletePlayerGamble: deletePlayerGambleAction,
  updatePlayerGamble: updatePlayerGambleAction,
} = accountSlice.actions;

export const { reducer: gamesReducer } = accountSlice;
