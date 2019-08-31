// Core
import React, { SFC } from 'react';
import { connect } from 'react-redux';
// Components
import Input from '../shared/Input';
// Instruments
import { IFilterState } from '../../redux/actions/types';
import { changeFilter } from '../../redux/actions/tasks';
import styles from './styles.module.css';

interface FilterProps {
  filter: IFilterState['filter'],
  changeFilter: (filter: IFilterState['filter']) => void;
}

const TaskFilter: SFC<FilterProps> = ({ filter, changeFilter }) => (
  <form className={styles.form}>
    <Input
      type="text"
      name="text"
      value={filter}
      placeholder="Filter by username and email..."
      onChange={({ target: { value } }) => changeFilter(value)}
    />
  </form>
);

const mapStateToProps = (state: IFilterState) => ({
  filter: state.filter,
});

export default connect(
  mapStateToProps,
  { changeFilter }
)(TaskFilter);
