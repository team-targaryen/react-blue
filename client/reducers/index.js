import { combineReducers } from 'redux';

// import all reducers
import mainReducer from './mainReducer';
import childrenListReducer from './childrenListReducer';

//combine reducers
const reducers = combineReducers({
  main: mainReducer,
  children: childrenListReducer
});

export default reducers;
