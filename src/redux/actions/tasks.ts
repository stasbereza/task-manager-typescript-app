import axios from 'axios';
import MD5 from 'md5';
import {
  Task,
  Tasks,
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
import { string } from 'prop-types';

const URL = 'https://uxcandy.com/~shapoval/test-task-backend';

// interface AxiosInstance {
//   request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R>;
// }

const fetchTasksStart = () => ({
  type: FETCH_TASKS_START,
});

const fetchTasksSuccess = (tasks: Tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

const fetchTasksFail = (error: string) => ({
  type: FETCH_TASKS_FAIL,
  payload: error,
});

const changeSortField = (sortField: string) => ({
  type: CHANGE_SORT_FIELD,
  payload: sortField,
});

const changeSortDirection = (sortDirection: string) => ({
  type: CHANGE_SORT_DIRECTION,
  payload: sortDirection,
});

const changePage = (currentPage: number) => ({
  type: CHANGE_PAGE,
  payload: currentPage,
});

const updateTasksAmount = (totalTasks: number) => ({
  type: UPDATE_TASKS_AMOUNT,
  payload: totalTasks,
});

const addTaskSuccess = (task: Task) => ({
  type: ADD_TASK_SUCCESS,
  payload: task,
});

const updateTaskTextSuccess = (task: Task) => ({
  type: UPDATE_TASK_TEXT_SUCCESS,
  payload: task,
});

const updateTaskStatusSuccess = (task: Task) => ({
  type: UPDATE_TASK_STATUS_SUCCESS,
  payload: task,
});

export const changeFilter = (filter: string) => ({
  type: CHANGE_FILTER,
  payload: filter,
});

export const fetchTasks = ({
  page,
  sortField,
  sortDirection,
}: Sort) => (dispatch: {
  (arg0: { type: string | number | object }): void;
}) => {
  dispatch(fetchTasksStart());
  dispatch(changePage(page));
  dispatch(changeSortField(sortField));
  dispatch(changeSortDirection(sortDirection));

  axios
    .get(
      `${URL}/?sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}&developer=Stanislav`,
    )
    .then(({ data: { message: { tasks, total_task_count: totalTasks } } }) => {
      dispatch(fetchTasksSuccess(tasks));
      dispatch(updateTasksAmount(Number(totalTasks)));
    })
    .catch(err => dispatch(fetchTasksFail(err)));
};

export const fetchTasksOnChangePage = (
  page: number,
  sortField: string,
  sortDirection: string,
) => (dispatch: {
  (arg0: { type: string; payload: number | string | Tasks }): void;
}) => {
  dispatch(changePage(page));

  axios
    .get(
      `${URL}/?sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}&developer=Stanislav`,
    )
    .then(({ data: { message: { tasks, total_task_count: totalTasks } } }) => {
      dispatch(fetchTasksSuccess(tasks));
      dispatch(updateTasksAmount(Number(totalTasks)));
    })
    .catch(err => dispatch(fetchTasksFail(err)));
};

export const fetchSortedTasks = ({
  page,
  sortField,
  sortDirection,
}: Sort) => (dispatch: {
  (arg0: { type: string }): string | number | Tasks;
}) => {
  dispatch(fetchTasksStart());
  dispatch(changeSortField(sortField));
  dispatch(changeSortDirection(sortDirection));

  axios
    .get(
      `${URL}/?sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}&developer=Stanislav`,
    )
    .then(({ data: { message: { tasks, total_task_count: totalTasks } } }) => {
      dispatch(fetchTasksSuccess(tasks));
      dispatch(updateTasksAmount(Number(totalTasks)));
    })
    .catch(err => dispatch(fetchTasksFail(err)));
};

export const addTask = ({ username, email, text }: Task) => (
  dispatch: (arg0: { type: string; payload: Task }) => void,
) => {
  const task = new FormData();
  task.append('username', username);
  task.append('email', email);
  task.append('text', text);

  axios({
    method: 'post',
    url: `${URL}/create?developer=Stanislav`,
    crossDomain: true,
    mimeType: 'multipart/form-data',
    contentType: false,
    processData: false,
    dataType: 'json',
    data: task,
  }).then(({ data: { message } }: { data: { message: Task } }) =>
    dispatch(addTaskSuccess(message)),
  );
};

export const updateTaskText = ({
  id,
  text: { text },
  token = 'beejee',
}: {
  id: number;
  text: { text: string };
  token: string;
}) => (dispatch: (arg0: { type: string; payload: Task }) => void) => {
  const taskToUpdate = { id, text };
  const url = `text=${text}&token=${token}`;
  const encodedUrl = encodeURI(url);
  const hex = MD5(encodedUrl);

  axios({
    method: 'post',
    url: `${URL}/edit/${id}/?developer=Stanislav`,
    crossDomain: true,
    mimeType: 'multipart/form-data',
    contentType: false,
    processData: false,
    dataType: 'string',
    data: `${url}&signature=${hex}`,
  }).then(
    ({ data }: { data: { status: string } }) =>
      data.status === 'ok' && dispatch(updateTaskTextSuccess(taskToUpdate)),
  );
};

export const updateTaskStatus = ({
  id,
  status,
  token = 'beejee',
}: {
  id: number;
  status: number;
  token: string;
}) => (dispatch: (arg0: { type: string; payload: Task }) => void) => {
  const taskToUpdate = { id, status };
  const url = `status=${status}&token=${token}`;
  const encodedUrl = encodeURI(url);
  const hex = MD5(encodedUrl);

  axios({
    method: 'post',
    url: `${URL}/edit/${id}/?developer=Stanislav`,
    crossDomain: true,
    mimeType: 'multipart/form-data',
    contentType: false,
    processData: false,
    dataType: 'string',
    data: `${url}&signature=${hex}`,
  }).then(
    ({ data }: { data: { status: string } }) =>
      data.status === 'ok' && dispatch(updateTaskStatusSuccess(taskToUpdate)),
  );
};
