// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import Button from '../shared/Button';
// Instruments
import Sort from '../../interfaces/Sort.interface';
import { fetchSortedTasks } from '../../redux/actions/tasks';

interface Props {
  page: number;
  currentSortField: string;
  currentSortDirection: string;
  onFetchSortedTasks: ({ page, sortField, sortDirection }: Sort) => void;
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

class SortManager extends Component<Props> {
  handleFetchSortedTasks = (
    sortField: string,
    sortDirection: { asc: string; desc: string },
  ) => {
    const {
      page,
      currentSortField,
      currentSortDirection,
      onFetchSortedTasks,
    } = this.props;

    const changedSortDirection =
      currentSortDirection === 'asc' ? sortDirection.desc : sortDirection.asc;

    const fetchTasks =
      currentSortField !== sortField
        ? onFetchSortedTasks({
            page,
            sortField,
            sortDirection: sortDirection.asc,
          })
        : onFetchSortedTasks({
            page,
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
          onClick={() => this.handleFetchSortedTasks(sortField, sortDirection)}>
          {`Sort by ${sortField} ${renderSortDirection}`}
        </Button>
      );
    });

    return <div style={styles.btnGroup}>{sortButtonsJSX}</div>;
  }
}

const mapStateToProps = state => ({
  page: state.pager.currentPage,
  currentSortField: state.sort.sortField,
  currentSortDirection: state.sort.sortDirection,
});

const mapDispatchToProps = dispatch => ({
  onFetchSortedTasks: ({ page, sortField, sortDirection }: Sort) =>
    dispatch(fetchSortedTasks({ page, sortField, sortDirection })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SortManager);
