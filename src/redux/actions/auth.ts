import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';
import * as api from '../../utils/authApi';
import {
  ISystemState,
  // SystemActionTypes,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT,
  SAVE_SESSION,
} from './types';

export const signIn = (credentials: ISystemState['admin']): ThunkAction<void, AppState, null, Action<string>> => dispatch => {
  dispatch({ type: SIGN_IN_REQUEST });

  api.signIn(credentials).then(
    response => {
      dispatch({ type: SIGN_IN_SUCCESS, payload: response });
      dispatch({ type: SAVE_SESSION });
    },
    error => dispatch({ type: SIGN_IN_FAIL, payload: error }),
  );
};

export const signOut = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  await api.signOut();
  dispatch({ type: SIGN_OUT });
  dispatch({ type: SAVE_SESSION });
};
