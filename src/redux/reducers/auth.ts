import { combineReducers } from 'redux';
import {
  ISystemState,
  SystemActionTypes,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
} from '../actions/types';

const initialSystemState: ISystemState = {
  admin: {
    login: '',
    password: '',
  },
  authenticated: false,
  error: null
};

function admin(state = initialSystemState.admin, action: SystemActionTypes) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return action.payload;

    case SIGN_OUT:
      return initialSystemState.admin;

    default:
      return state;
  }
}

function authenticated(state = initialSystemState.authenticated, action: SystemActionTypes) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return true;

    case SIGN_OUT:
      return false;

    default:
      return state;
  }
}

function error(state = initialSystemState.error, action: SystemActionTypes) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    case SIGN_IN_SUCCESS:
    case SIGN_OUT:
      return null;

    case SIGN_IN_FAIL:
      return action.payload;

    default:
      return state;
  }
}

export default combineReducers({
  admin,
  authenticated,
  error,
});
