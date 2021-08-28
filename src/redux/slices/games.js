import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  applyFilterOnVoiceSegmentUrl,
  applyMatrixFilterUrl,
  applyThresholdUrl,
  decomposeToChannelsUrl,
  getTimeChartOfSoundUrl,
  applyFilterWithSpecificFrequencyOnVoiceSegmentUrl,
} from '../constants/urls';

const initialState = {};

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

  },
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: gamesReducer } = accountSlice;
