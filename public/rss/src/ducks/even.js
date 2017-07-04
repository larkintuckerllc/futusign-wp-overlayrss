import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_EVEN = `${ACTION_PREFIX}SET_EVEN`;
// SCHEMA
// REDUCERS
export default (state = true, action) => {
  switch (action.type) {
    case SET_EVEN:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getEven = state => state.even;
// VALIDATORS
const validEven = value =>
  !(value === undefined || typeof value !== 'boolean');
// ACTION CREATORS
export const setEven = (value) => {
  if (!validEven(value)) throw new Error();
  return ({
    type: SET_EVEN,
    value,
  });
};
