import { combineReducers } from 'redux';
import appBlocking from '../ducks/appBlocking';
import items from '../ducks/items';
import marqueeStart from '../ducks/marqueeStart';

export default combineReducers({
  appBlocking,
  items,
  marqueeStart,
});
