import { SAVE_SESSION } from '../actions/types';

const auth = (store: { getState: () => { auth: object; }; }) => (next: (arg0: any) => void) => (action: { type: string; }) => {
  if (action.type && action.type === SAVE_SESSION) {
    localStorage.setItem('session', JSON.stringify(store.getState().auth));
  }

  next(action);
};

export default auth;
