import axios from 'axios';
import MD5 from 'md5';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';
import {
  ITask,
  INewTask,
  ITaskToUpdateText,
  ITaskToUpdateStatus,
  TasksActionTypes,
  PagerActionTypes,
  SortActionTypes,
  FilterActionType,
  FETCH_TASKS_START,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAIL,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_TEXT_SUCCESS,
  UPDATE_TASK_STATUS_SUCCESS,
  UPDATE_TASKS_AMOUNT,
  CHANGE_SORT_FIELD,
  CHANGE_SORT_DIRECTION,
  CHANGE_PAGE,
  CHANGE_FILTER,
} from './types';
import Sort from '../../interfaces/Sort.interface';

const URL = 'https://uxcandy.com/~shapoval/test-task-backend';

const fetchTasksStart = (): TasksActionTypes => ({
  type: FETCH_TASKS_START,
});

export const fetchTasksSuccess = (tasks: ITask[]): TasksActionTypes => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFail = (error: string | null): TasksActionTypes => ({
  type: FETCH_TASKS_FAIL,
  payload: error,
});

export const updateTasksAmount = (totalTasks: number): PagerActionTypes => ({
  type: UPDATE_TASKS_AMOUNT,
  payload: totalTasks,
});

export const addTaskSuccess = (task: ITask): TasksActionTypes => ({
  type: ADD_TASK_SUCCESS,
  payload: task,
});

export const updateTaskTextSuccess = (task: ITaskToUpdateText): TasksActionTypes => ({
  type: UPDATE_TASK_TEXT_SUCCESS,
  payload: task,
});

export const updateTaskStatusSuccess = (task: ITaskToUpdateStatus): TasksActionTypes => ({
  type: UPDATE_TASK_STATUS_SUCCESS,
  payload: task,
});

export const changeSortField = (sortField: string): SortActionTypes => ({
  type: CHANGE_SORT_FIELD,
  payload: sortField,
});

export const changeSortDirection = (sortDirection: string): SortActionTypes => ({
  type: CHANGE_SORT_DIRECTION,
  payload: sortDirection,
});

export const changePage = (currentPage: number): PagerActionTypes => ({
  type: CHANGE_PAGE,
  payload: currentPage,
});

export const changeFilter = (filter: string): FilterActionType => ({
  type: CHANGE_FILTER,
  payload: filter,
});

// export function fetchTasks (sort: Sort) {
//   const { currentPage, sortField, sortDirection } = sort;

//   return async (dispatch: Dispatch) => {
//     dispatch(fetchTasksStart());
//     dispatch(changePage(currentPage));
//     dispatch(changeSortField(sortField));
//     dispatch(changeSortDirection(sortDirection));

//     try {
//       const response = await axios.get(
//         `${URL}/?sort_field=${sortField}&sort_direction=${sortDirection}&page=${currentPage}&developer=Stanislav`,
//       );
//       const { data: { message: { tasks, total_task_count: totalTasks } } } = response;
//       dispatch(fetchTasksSuccess(tasks));
//       dispatch(updateTasksAmount(Number(totalTasks)));
//     } catch (err) {
//       dispatch(fetchTasksFail(err))
//     }
//   }
// };

export const fetchTasks = ({
  currentPage,
  sortField,
  sortDirection,
}: { currentPage: number,
  sortField: string,
  sortDirection: string }): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    dispatch(fetchTasksStart());
    dispatch(changePage(currentPage));
    dispatch(changeSortField(sortField));
    dispatch(changeSortDirection(sortDirection));

  await axios.get(
    `${URL}/?sort_field=${sortField}&sort_direction=${sortDirection}&page=${currentPage}&developer=Stanislav`,
  )
    .then(({ data: { message: { tasks, total_task_count: totalTasks } } }) => {
    dispatch(fetchTasksSuccess(tasks));
    dispatch(updateTasksAmount(Number(totalTasks)));
  })
    .catch(err => dispatch(fetchTasksFail(err)))
};

export const fetchTasksOnChangePage = (
  currentPage: number,
  sortField: string,
  sortDirection: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch => {
  dispatch(changePage(currentPage));

  axios
    .get(
      `${URL}/?sort_field=${sortField}&sort_direction=${sortDirection}&page=${currentPage}&developer=Stanislav`,
    )
    .then(({ data: { message: { tasks, total_task_count: totalTasks } } }) => {
      dispatch(fetchTasksSuccess(tasks));
      dispatch(updateTasksAmount(Number(totalTasks)));
    })
    .catch(err => dispatch(fetchTasksFail(err)));
};

export const fetchSortedTasks = ({
  currentPage,
  sortField,
  sortDirection,
}: { currentPage: number,
  sortField: string,
  sortDirection: string }): ThunkAction<void, AppState, null, Action<string>> => dispatch => {
  dispatch(fetchTasksStart());
  dispatch(changeSortField(sortField));
  dispatch(changeSortDirection(sortDirection));

  axios
    .get(
      `${URL}/?sort_field=${sortField}&sort_direction=${sortDirection}&page=${currentPage}&developer=Stanislav`,
    )
    .then(({ data: { message: { tasks, total_task_count: totalTasks } } }) => {
      dispatch(fetchTasksSuccess(tasks));
      dispatch(updateTasksAmount(Number(totalTasks)));
    })
    .catch(err => dispatch(fetchTasksFail(err)));
};

export const addTask = ({ username, email, text }: INewTask): ThunkAction<void, AppState, null, Action<string>> =>
  dispatch => {
  const task = new FormData();
  task.append('username', username);
  task.append('email', email);
  task.append('text', text);

  axios.post(`${URL}/create?developer=Stanislav`, task)
  .then(({ data: { message } }: { data: { message: ITask } }) => {
    console.log(message);
    dispatch(addTaskSuccess(message));
  })
};

export const updateTaskText = ({
  id,
  text: { text },
  token,
}: {
  id: number;
  text: { text: string };
  token: string;
}): ThunkAction<void, AppState, null, Action<string>> => dispatch => {
  const taskToUpdate = { id, text };
  const url = `text=${text}&token=${token}`;
  const encodedUrl = encodeURI(url);
  const hex = MD5(encodedUrl);

  axios({
    method: 'post',
    url: `${URL}/edit/${id}/?developer=Stanislav`,
    data: `${url}&signature=${hex}`,
  }).then(
    ({ data }: { data: { status: string } }) =>
      data.status === 'ok' && dispatch(updateTaskTextSuccess(taskToUpdate)),
  );
};

export const updateTaskStatus = ({
  id,
  status,
  token,
}: {
  id: number;
  status: number;
  token: string;
}): ThunkAction<void, AppState, null, Action<string>> => dispatch => {
  const taskToUpdate = { id, status };
  const url = `status=${status}&token=${token}`;
  const encodedUrl = encodeURI(url);
  const hex = MD5(encodedUrl);

  axios({
    method: 'post',
    url: `${URL}/edit/${id}/?developer=Stanislav`,
    data: `${url}&signature=${hex}`,
  }).then(
    ({ data }: { data: { status: string } }) =>
      data.status === 'ok' && dispatch(updateTaskStatusSuccess(taskToUpdate)),
  );
};
