import { combineReducers } from 'redux';
import mainReducer from './mainReducer';

/**
  * combine reducers
**/
const reducers = combineReducers({
  main: mainReducer
});

export default reducers;
