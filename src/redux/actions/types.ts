export interface ITask {
  id: number;
  username: string;
  email: string;
  text: string;
  status: number;
}

export interface INewTask {
  username: string;
  email: string;
  text: string;
}
export interface ITaskToUpdateText {
  id: number;
  text: string;
}

export interface ITaskToUpdateStatus {
  id: number;
  status: number;
}

export interface ITasksState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
}

export interface ISystemState {
  authenticated: boolean;
  admin: {login: string, password: string};
  error: string | null;
}

export interface IPagerState {
  totalItems: number;
  currentPage: number;
  pageSize: number;
}

export interface ISortState {
  sortField: string;
  sortDirection: string;
}

export interface IFilterState {
  filter: string;
}

export const FETCH_TASKS_START = 'FETCH_TASKS_START';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAIL = 'FETCH_TASKS_FAIL';

interface fetchTasksStartAction {
  type: typeof FETCH_TASKS_START
}

interface fetchTasksSuccessAction {
  type: typeof FETCH_TASKS_SUCCESS
  payload: ITask[]
}

interface fetchTasksFailAction {
  type: typeof FETCH_TASKS_FAIL
  payload: string | null;
}

export type TasksActionTypes = fetchTasksStartAction | fetchTasksSuccessAction | fetchTasksFailAction | AddTaskSuccessAction | UpdateTaskTextSuccessAction | UpdateTaskStatusSuccessAction;

export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const UPDATE_TASK_TEXT_SUCCESS = 'UPDATE_TASK_TEXT_SUCCESS';
export const UPDATE_TASK_STATUS_SUCCESS = 'UPDATE_TASK_STATUS_SUCCESS';

interface AddTaskSuccessAction {
  type: typeof ADD_TASK_SUCCESS,
  payload: ITask
}

interface UpdateTaskTextSuccessAction {
  type: typeof UPDATE_TASK_TEXT_SUCCESS
  payload: ITaskToUpdateText
}

interface UpdateTaskStatusSuccessAction {
  type: typeof UPDATE_TASK_STATUS_SUCCESS
  payload: ITaskToUpdateStatus
}

export const CHANGE_PAGE = 'CHANGE_PAGE';
export const UPDATE_TASKS_AMOUNT = 'UPDATE_TASKS_AMOUNT';

interface ChangePageAction {
  type: typeof CHANGE_PAGE,
  payload: number
}

interface UpdateTasksAmountAction {
  type: typeof UPDATE_TASKS_AMOUNT,
  payload: number
}

export type PagerActionTypes = ChangePageAction | UpdateTasksAmountAction;

export const CHANGE_SORT_FIELD = 'CHANGE_SORT_FIELD';
export const CHANGE_SORT_DIRECTION = 'CHANGE_SORT_DIRECTION';

interface ChangeSortFieldAction {
  type: typeof CHANGE_SORT_FIELD,
  payload: string
}

interface ChangeSortDirectionAction {
  type: typeof CHANGE_SORT_DIRECTION,
  payload: string
}

export type SortActionTypes = ChangeSortFieldAction | ChangeSortDirectionAction;

export const CHANGE_FILTER = 'CHANGE_FILTER';

interface ChangeFilterAction {
  type: typeof CHANGE_FILTER,
  payload: string
}

export type FilterActionType = ChangeFilterAction;

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const SIGN_OUT = 'SIGN_OUT';
export const SAVE_SESSION = 'SAVE_SESSION';

export interface SignInRequestAction {
  type: typeof SIGN_IN_REQUEST,
}

export interface SignInSuccessAction {
  type: typeof SIGN_IN_SUCCESS,
  payload: ISystemState['admin']
}

export interface SignInFailAction {
  type: typeof SIGN_IN_FAIL,
  payload: string | null;
}

export interface SignOutAction {
  type: typeof SIGN_OUT,
}

export interface SaveSessionAction {
  type: typeof SAVE_SESSION,
}

export type SystemActionTypes = SignInRequestAction | SignInSuccessAction | SignInFailAction | SignOutAction | SaveSessionAction;
