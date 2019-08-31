import { combineReducers } from 'redux';
import tasksReducer from './tasks';
import sortReducer from './sort';
import pagerReducer from './pager';
import filterReducer from './filter';
import authReducer from './auth';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  pager: pagerReducer,
  sort: sortReducer,
  filter: filterReducer,
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
