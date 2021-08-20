import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import { getLandingDataUrl } from '../constants/urls';

const initialState = {
  members: [],
  teams:[],
};

export const getLandingDataAction = createAsyncThunkApi(
  'landing/getLandingDataAction',
  Apis.GET,
  getLandingDataUrl
);

const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {},
  extraReducers: {
    [getLandingDataAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.teams = response.teams;
      state.members = response.members;
    },
  },
});

export const { reducer: landingReducer } = landingSlice;
