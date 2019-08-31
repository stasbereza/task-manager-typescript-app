import { combineReducers } from 'redux';
import {
  ITasksState,
  TasksActionTypes,
  FETCH_TASKS_START,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAIL,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_TEXT_SUCCESS,
  UPDATE_TASK_STATUS_SUCCESS,
} from '../actions/types';

const initialTasksState: ITasksState = {
  tasks: [],
  loading: false,
  error: null,
};

function tasksReducer(state = initialTasksState.tasks, action: TasksActionTypes) {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return action.payload;

    case ADD_TASK_SUCCESS:
      return [...state, action.payload];

    case UPDATE_TASK_TEXT_SUCCESS:
      return state.map(task =>
        task.id === action.payload.id ? { ...task, text: action.payload.text } : task,
      );
    case UPDATE_TASK_STATUS_SUCCESS:
      return state.map(task =>
        task.id === action.payload.id ? { ...task, status: action.payload.status } : task,
      );

    default:
      return state;
  }
}

function loadingReducer(state = initialTasksState.loading, action: TasksActionTypes) {
  switch (action.type) {
    case FETCH_TASKS_START:
      return true;

    case FETCH_TASKS_SUCCESS:
    case ADD_TASK_SUCCESS:
    case UPDATE_TASK_TEXT_SUCCESS:
    case UPDATE_TASK_STATUS_SUCCESS:
    case FETCH_TASKS_FAIL:
      return false;

    default:
      return state;
  }
}

function errorReducer(state = initialTasksState.error, action: TasksActionTypes) {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
    case ADD_TASK_SUCCESS:
    case UPDATE_TASK_TEXT_SUCCESS:
    case UPDATE_TASK_STATUS_SUCCESS:
      return null;

    case FETCH_TASKS_FAIL:
      return action.payload;

    default:
      return state;
  }
}

export default combineReducers({
  tasks: tasksReducer,
  loading: loadingReducer,
  error: errorReducer,
});

