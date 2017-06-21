import { ACTION_PREFIX } from '../strings';

// API
// ACTIONS
export const SET_MARQUEE_START = `${ACTION_PREFIX}SET_MARQUEE_START`;
// SCHEMA
// REDUCERS
export default (state = false, action) => {
  switch (action.type) {
    case SET_MARQUEE_START:
      return action.value;
    default:
      return state;
  }
};
// ACCESSORS AKA SELECTORS
export const getMarqueeStart = state => state.marqueeStart;
// VALIDATORS
const validMarqueeStart = value =>
  !(value === undefined || typeof value !== 'boolean');
// ACTION CREATORS
export const setMarqueeStart = (value) => {
  if (!validMarqueeStart(value)) throw new Error();
  return ({
    type: SET_MARQUEE_START,
    value,
  });
};
