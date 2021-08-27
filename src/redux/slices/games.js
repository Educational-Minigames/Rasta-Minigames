import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  imageProcessingWorkshop1Url,
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
      state.image = response;
      state.isFetching = false;
    },
    [imageProcessingWorkshop1Action.rejected.toString()]: isNotFetching,
  },
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: gamesReducer } = accountSlice;
