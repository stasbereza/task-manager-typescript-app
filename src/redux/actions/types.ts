export interface Task {
  id?: number;
  username: string;
  email: string;
  text: string;
  status?: number;
}

export interface Tasks {
  tasks: Task[];
}

export const FETCH_TASKS_START = 'FETCH_TASKS_START';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAIL = 'FETCH_TASKS_FAIL';

export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const UPDATE_TASK_TEXT_SUCCESS = 'UPDATE_TASK_TEXT_SUCCESS';
export const UPDATE_TASK_STATUS_SUCCESS = 'UPDATE_TASK_STATUS_SUCCESS';

export const CHANGE_PAGE = 'CHANGE_PAGE';
export const UPDATE_TASKS_AMOUNT = 'UPDATE_TASKS_AMOUNT';

export const CHANGE_SORT_FIELD = 'CHANGE_SORT_FIELD';
export const CHANGE_SORT_DIRECTION = 'CHANGE_SORT_DIRECTION';

export const CHANGE_FILTER = 'CHANGE_FILTER';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const SIGN_OUT = 'SIGN_IN_FAIL';
export const SAVE_SESSION = 'SAVE_SESSION';
