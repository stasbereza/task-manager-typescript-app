// Core
import React from 'react';
import { connect } from 'react-redux';
// Components
import Input from '../shared/Input';
// Instruments
import { changeFilter } from '../../redux/actions/tasks';
import styles from './styles.module.css';

const TaskFilter = ({ filter, onFilterChange }) => (
  <form className={styles.form}>
    <Input
      name="text"
      value={filter}
      placeholder="Filter by username and email..."
      onChange={({ target: { value } }) => onFilterChange(value)}
    />
  </form>
);

const mapStateToProps = (state: { filter: string }) => ({
  filter: state.filter,
});

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: string }) => void,
) => ({
  onFilterChange: (filter: string) => dispatch(changeFilter(filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskFilter);
