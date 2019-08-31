import admin from '../admin';
import { ISystemState } from '../redux/actions/types';

export const signIn = ({ login, password }: ISystemState['admin']) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (login === '' || password === '') {
        reject('All fields must be filled!');
        return;
      }

      if (admin.login !== login) {
        reject('Login is incorrect!');
        return;
      }

      if (admin.password !== password) {
        reject('Invalid password!');
        return;
      }

      resolve({
        login: admin.login,
        password: admin.password,
      });
    }, 500);
  });
};

export const signOut = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
