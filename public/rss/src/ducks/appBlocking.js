import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_APP_BLOCKING = `${ACTION_PREFIX}SET_APP_BLOCKING`;
// SCHEMA
// REDUCERS
export default (state = true, action) => {
  switch (action.type) {
    case SET_APP_BLOCKING:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getAppBlocking = state => state.appBlocking;
// VALIDATORS
const validAppBlocking = value =>
  !(value === undefined || typeof value !== 'boolean');
// ACTION CREATORS
export const setAppBlocking = (value) => {
  if (!validAppBlocking(value)) throw new Error();
  return ({
    type: SET_APP_BLOCKING,
    value,
  });
};
