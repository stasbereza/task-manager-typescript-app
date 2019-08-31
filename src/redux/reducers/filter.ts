import { IFilterState, CHANGE_FILTER, FilterActionType } from '../actions/types';

const initialFilterState: IFilterState = {
  filter: ''
};

export default function filterReducer(state = initialFilterState.filter, action: FilterActionType) {
  switch (action.type) {
    case CHANGE_FILTER:
      return action.payload;

    default:
      return state;
  }
}
