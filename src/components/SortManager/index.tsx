// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import Button from '../shared/Button';
// Instruments
import { Sort } from '../../interfaces/Sort.interface';
import { AppState } from '../../redux/reducers';
import { ISortState, IPagerState } from '../../redux/actions/types';
import { fetchSortedTasks } from '../../redux/actions/tasks';

interface SortProps {
  currentPage: IPagerState['currentPage'];
  currentSortField: ISortState['sortField'];
  currentSortDirection: ISortState['sortDirection'];
  fetchSortedTasks: ({
    currentPage,
    sortField,
    sortDirection,
  }: Sort) => void;
}

const styles = {
  btnGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 300,
  },
};

const sortParams = [
  { sortField: 'id', sortDirection: { asc: 'asc', desc: 'desc' } },
  {
    sortField: 'username',
    sortDirection: { asc: 'asc', desc: 'desc' },
  },
  { sortField: 'email', sortDirection: { asc: 'asc', desc: 'desc' } },
  { sortField: 'status', sortDirection: { asc: 'asc', desc: 'desc' } },
];

export class SortManager extends Component<SortProps> {
  handleFetchSortedTasks = (
    sortField: string,
    sortDirection: { asc: string; desc: string },
  ) => {
    const {
      currentPage,
      currentSortField,
      currentSortDirection,
    } = this.props;

    const changedSortDirection =
      currentSortDirection === 'asc' ? sortDirection.desc : sortDirection.asc;

    const fetchTasks =
      currentSortField !== sortField
        ? this.props.fetchSortedTasks({
            currentPage,
            sortField,
            sortDirection: sortDirection.asc,
          })
        : this.props.fetchSortedTasks({
            currentPage,
            sortField: currentSortField,
            sortDirection: changedSortDirection,
          });

    return fetchTasks;
  };

  render() {
    const { currentSortField, currentSortDirection } = this.props;

    const sortButtonsJSX = sortParams.map(sortParam => {
      const { sortField, sortDirection } = sortParam;

      const renderSortDirection =
        sortField === currentSortField ? currentSortDirection : '';

      return (
        <Button
          key={sortField}
          isOrangeBgColor
          active={sortField === currentSortField}
          onClick={() => this.handleFetchSortedTasks(sortField, sortDirection)}
        >
          {`Sort by ${sortField} ${renderSortDirection}`}
        </Button>
      );
    });

    return <div style={styles.btnGroup}>{sortButtonsJSX}</div>;
  }
}

const mapStateToProps = (state: AppState) => ({
  currentPage: state.pager.currentPage,
  currentSortField: state.sort.sortField,
  currentSortDirection: state.sort.sortDirection,
});

export default connect(
  mapStateToProps,
  { fetchSortedTasks }
)(SortManager);
