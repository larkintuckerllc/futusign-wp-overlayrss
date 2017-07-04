import { combineReducers } from 'redux';
import { normalize, schema } from 'normalizr';
import { createSelector } from 'reselect';
import { ACTION_PREFIX } from '../strings';
import { ServerException } from '../util/exceptions';
// API
import { get } from '../apis/feed';

// REDUCER MOUNT POINT
// ACTIONS
export const FETCH_ITEMS_REQUEST = `${ACTION_PREFIX}FETCH_ITEMS_REQUEST`;
export const FETCH_ITEMS_SUCCESS = `${ACTION_PREFIX}FETCH_ITEMS_SUCCESS`;
export const FETCH_ITEMS_ERROR = `${ACTION_PREFIX}FETCH_ITEMS_ERROR`;
export const RESET_FETCH_ITEMS_ERROR = `${ACTION_PREFIX}RESET_FETCH_ITEMS_ERROR`;
export const RESET_ITEMS = `${ACTION_PREFIX}RESET_ITEMS`;
// SCHEMA
const itemSchema = new schema.Entity('items');
const itemsSchema = new schema.Array(itemSchema);
// REDUCERS
const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS: {
      return {
        ...state,
        ...action.response.entities.items,
      };
    }
    case RESET_ITEMS: {
      return {};
    }
    default:
      return state;
  }
};
const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      return action.response.result;
    case RESET_ITEMS:
      return [];
    default:
      return state;
  }
};
const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return true;
    case FETCH_ITEMS_SUCCESS:
    case FETCH_ITEMS_ERROR:
      return false;
    default:
      return state;
  }
};
const length = (state = 0, action) => {
  // TODO: ACCOUNT FOR DATES AND TITLES
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS: {
      let count = 0;
      const countIds = action.response.result;
      for (let i = 0; i < countIds.length; i += 1) {
        const countId = countIds[i];
        count += action.response.entities.items[countId].description.length;
      }
      return count;
    }
    default:
      return state;
  }
};
const fetchErrorMessage = (state = null, action) => {
  switch (action.type) {
    case FETCH_ITEMS_ERROR:
      return action.message;
    case FETCH_ITEMS_REQUEST:
    case FETCH_ITEMS_SUCCESS:
      return null;
    default:
      return state;
  }
};
export default combineReducers({
  byId,
  ids,
  isFetching,
  fetchErrorMessage,
  length,
});
// ACCESSORS AKA SELECTORS
export const getItem = (state, id) => state.items.byId[id];
const getItemsIds = state => state.items.ids;
const getItemsById = state => state.items.byId;
export const getItems = createSelector(
  [getItemsIds, getItemsById],
  (itemsIds, itemsById) => itemsIds.map(id => itemsById[id]),
);
export const getIsFetchingItems = state => state.items.isFetching;
export const getFetchItemsErrorMessage = state => state.items.fetchErrorMessage;
export const getLength = state => state.items.length;
// ACTION CREATOR VALIDATORS
// ACTION CREATORS
export const fetchItems = () => (dispatch, getState) => {
  if (getIsFetchingItems(getState())) throw new Error();
  dispatch({
    type: FETCH_ITEMS_REQUEST,
  });
  return get()
    .then(
      response => dispatch({
        type: FETCH_ITEMS_SUCCESS,
        response: normalize(response, itemsSchema),
      }),
      (error) => {
        dispatch({
          type: FETCH_ITEMS_ERROR,
          message: error.message,
        });
        throw new ServerException(error.message);
      },
    );
};
export const resetFetchItemsError = () => ({
  type: RESET_FETCH_ITEMS_ERROR,
});
