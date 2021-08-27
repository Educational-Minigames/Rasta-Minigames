import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  imageProcessingWorkshop1Url,
  getTimeChartOfSoundUrl,
  applyFilterOnVoiceSegmentUrl,
} from '../constants/urls';

const initialState = {};

export const imageProcessingWorkshop1Action = createAsyncThunkApi(
  'users/imageProcessingWorkshop1Action',
  Apis.POST,
  imageProcessingWorkshop1Url,
  {
    defaultNotification: {
      success: 'اعمال شد',
      error: 'یه مشکلی وجود داره!',
    },
  }
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
  },
  extraReducers: {
    [imageProcessingWorkshop1Action.pending.toString()]: isFetching,
    [imageProcessingWorkshop1Action.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.image = response.time_dir;
      state.isFetching = false;
    },
    [imageProcessingWorkshop1Action.rejected.toString()]: isNotFetching,


    [getTimeChartOfSoundAction.pending.toString()]: isFetching,
    [getTimeChartOfSoundAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.timeChartImage = 'https://' + response.time_dir;
      state.isFetching = false;
    },
    [getTimeChartOfSoundAction.rejected.toString()]: isNotFetching,
  },
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: gamesReducer } = accountSlice;
