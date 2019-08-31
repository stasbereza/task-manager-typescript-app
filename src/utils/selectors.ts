import { ITask } from '../redux/actions/types';

export const getVisibleTasks = (tasks: ITask[], filter: string) =>
  tasks.filter(
    task => task.username.includes(filter) || task.email.includes(filter),
  );
