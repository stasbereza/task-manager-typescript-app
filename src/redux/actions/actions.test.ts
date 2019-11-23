import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import * as actions from './tasks';
import * as types from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_TASKS_SUCCESS when fetching tasks has been done', () => {
    // fetchMock.getOnce('https://uxcandy.com/~shapoval/test-task-backend/?sort_field=id&sort_direction=asc&page=1&developer=Stanislav', {
    //   body: { tasks: ['do something'] },
    // })
    const store = mockStore({ tasks: [] });

    const currentPage = 1;
    const sortField = 'id';
    const sortDirection = 'asc';
    const amount = 46;

    const expectedActions = [
      { type: types.FETCH_TASKS_START },
      { type: types.CHANGE_PAGE, payload: currentPage },
      { type: types.CHANGE_SORT_FIELD, payload: sortField },
      { type: types.CHANGE_SORT_DIRECTION, payload: sortDirection },
      { type: types.FETCH_TASKS_SUCCESS, body: { tasks: ['do something'] } },
      { type: types.UPDATE_TASKS_AMOUNT, payload: amount }
    ];

    const fakeSort = {
      currentPage,
      sortField,
      sortDirection,
    };

    return store.dispatch(actions.fetchTasks(fakeSort)).then(() => {
      const actions = store.getActions();
      expect(actions[5]).to.eql(expectedActions[5]);
    })
    })
  })
