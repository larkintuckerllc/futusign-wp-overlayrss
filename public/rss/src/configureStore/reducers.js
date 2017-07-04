import { combineReducers } from 'redux';
import appBlocking from '../ducks/appBlocking';
import even from '../ducks/even';
import items from '../ducks/items';
import marqueeStart from '../ducks/marqueeStart';

export default combineReducers({
  appBlocking,
  even,
  items,
  marqueeStart,
});
