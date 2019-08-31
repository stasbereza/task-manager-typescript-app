import { IPagerState, CHANGE_PAGE, UPDATE_TASKS_AMOUNT, PagerActionTypes } from '../actions/types';

const initialPagerState: IPagerState = {
  totalItems: 0,
  currentPage: 1,
  pageSize: 3,
};

export default function pagerReducer(state = initialPagerState, action: PagerActionTypes) {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, currentPage: action.payload };

    case UPDATE_TASKS_AMOUNT:
      return { ...state, totalItems: action.payload };

    default:
      return state;
  }
}
