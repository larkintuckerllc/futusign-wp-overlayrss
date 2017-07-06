import { combineReducers } from 'redux';
import even from '../ducks/even';
import items from '../ducks/items';
import marqueeStart from '../ducks/marqueeStart';

export default combineReducers({
  even,
  items,
  marqueeStart,
});
