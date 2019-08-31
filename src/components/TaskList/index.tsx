// Core
import React, { SFC } from 'react';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
// Components
import Task from '../Task';
import InlineMessage from '../shared/InlineMessage';
import Pager from '../shared/Pager';
// Instruments
import { AppState } from '../../redux/reducers';
import { ITasksState, IFilterState } from '../../redux/actions/types';
import { getVisibleTasks } from '../../utils/selectors';
import styles from './styles.module.css';

interface TaskListProps {
  tasks: ITasksState['tasks'];
  filter: IFilterState['filter'];
}

const TaskList: SFC<TaskListProps> = ({ tasks }) =>
  tasks.length > 0 ? (
    <>
      <Masonry className={styles.list} elementType={'ul'}>
        {tasks.map(task => (
          <li key={task.id} className={styles.item}>
            <Task task={task} />
          </li>
        ))}
      </Masonry>
      <Pager />
    </>
  ) : (
    <InlineMessage text="The filter matches nothing!" />
  );

const mapStateToProps = (state: AppState) => ({
  tasks: getVisibleTasks(state.tasks.tasks, state.filter),
});

export default connect(
  mapStateToProps,
)(TaskList);
