import { combineReducers } from 'redux';
import { ISortState, CHANGE_SORT_FIELD, CHANGE_SORT_DIRECTION, SortActionTypes } from '../actions/types';

const initialSortState: ISortState = {
  sortField: '',
  sortDirection: '',
};

function sortFieldReducer(state = initialSortState.sortField, action: SortActionTypes) {
  switch (action.type) {
    case CHANGE_SORT_FIELD:
      return action.payload;

    default:
      return state;
  }
}

function sortDirectionReducer(state = initialSortState.sortDirection, action: SortActionTypes) {
  switch (action.type) {
    case CHANGE_SORT_DIRECTION:
      return action.payload;

    default:
      return state;
  }
}

export default combineReducers({
  sortField: sortFieldReducer,
  sortDirection: sortDirectionReducer,
});
