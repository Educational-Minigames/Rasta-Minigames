import { combineReducers } from 'redux';

import { accountReducer } from './account';
import { landingReducer } from './landing';
import { notificationReducer } from './notifications';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';

const allReducers = combineReducers({
  account: accountReducer,
  notifications: notificationReducer,
  redirect: redirectReducer,
  landing: landingReducer,
  Intl: translatorReducer,
});

export default allReducers;
