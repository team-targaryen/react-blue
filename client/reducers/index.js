import { combineReducers } from 'redux';

// import all reducers
import mainReducer from './mainReducer';
import './utils/reducerFunctions'
//combine reducers
const reducers = combineReducers({
  main: mainReducer
});

export default reducers;
