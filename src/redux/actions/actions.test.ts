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
    fetchMock.restore();
  });

  it('creates FETCH_TASKS_SUCCESS when fetching tasks has been done', () => {
    fetchMock.getOnce(
      'https://uxcandy.com/~shapoval/test-task-backend/?sort_field=id&sort_direction=asc&page=1&developer=Stanislav',
      {
        body: { tasks: ['do something'] },
      },
    );

    const currentPage = 1;
    const sortField = 'id';
    const sortDirection = 'asc';
    const error = 'error';
    const amount = 46;

    const expectedActions = [
      { type: types.FETCH_TASKS_START },
      { type: types.CHANGE_PAGE, payload: currentPage },
      { type: types.CHANGE_SORT_FIELD, payload: sortField },
      { type: types.CHANGE_SORT_DIRECTION, payload: sortDirection },
      {
        type: types.FETCH_TASKS_SUCCESS,
        payload: [{ id: '1' }, { id: '2' }, { id: '3' }],
      },
      { type: types.UPDATE_TASKS_AMOUNT, payload: amount },
    ];

    const store = mockStore({ tasks: [] });
    const fakeSort = {
      currentPage,
      sortField,
      sortDirection,
    };
    const foo = store.dispatch(actions.fetchTasks(fakeSort));

    foo.then(() => {
      console.log(store.getActions());
      console.log(expectedActions);
      expect(store.getActions())
        .to.be.an('array')
        .that.have.length(6);
      expect(store.getActions()).to.have.deep.members(expectedActions);
    });
  });
});
