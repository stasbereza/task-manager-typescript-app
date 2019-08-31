// Core
import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
// Components
import Checkbox from '../shared/Checkbox';
import EditableInput from '../shared/EditableInput';
import Button from '../shared/Button';
// Instruments
import { AppState } from '../../redux/reducers';
import { ITask, ISystemState } from '../../redux/actions/types';
import { updateTaskText, updateTaskStatus } from '../../redux/actions/tasks';
import styles from './styles.module.css';

interface TaskProps {
  task: ITask;
  authenticated: ISystemState['authenticated'];
  updateTaskText: ({
    id,
    text,
    token
  }: {
    id: number,
    text: { text: string },
    token: string
  }) => void;
  updateTaskStatus: ({
    id,
    status,
    token
  }: {
    id: number,
    status: number,
    token: string
  }) => void;
}

interface TaskState {
  isBeingEdited: boolean;
  checked: boolean;
}

class Task extends Component<TaskProps, TaskState> {
  state: TaskState = { isBeingEdited: false, checked: false };

  componentDidMount() {
    if (this.props.task.status === 10) {
      this.setState({
        checked: true,
      });
    }
  }

  shouldComponentUpdate(nextProps: TaskProps, nextState: TaskState) {
    const propsChanged =
      nextProps.task.text !== this.props.task.text ||
      nextProps.task.status !== this.props.task.status ||
      nextProps.authenticated !== this.props.authenticated;

    const stateChanged =
      this.state.isBeingEdited !== nextState.isBeingEdited ||
      this.state.checked !== nextState.checked;

    return propsChanged || stateChanged;
  }

  onEditStart = () => this.setState({ isBeingEdited: true });

  onEditEnd = () => this.setState({ isBeingEdited: false });

  handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ checked: e.target.checked }, () => {
      const status = this.state.checked ? 10 : 0;
      const token = 'beejee';

      this.props.updateTaskStatus({
        id: this.props.task.id,
        status,
        token
      });
    });
  };

  handleUpdate = (text: { text: string }) => {
    const token = 'beejee';

    this.props.updateTaskText({ id: this.props.task.id, text, token });
    this.onEditEnd();
  };

  render() {
    const { authenticated } = this.props;
    const { id, username, email, text } = this.props.task;
    const { checked, isBeingEdited } = this.state;

    return (
      <div className={styles.task}>
        <label htmlFor={String(id)} style={{ marginBottom: 8 }}>
          <Checkbox
            id={String(id)}
            checked={checked}
            disabled={!authenticated}
            onChange={this.handleCheckboxChange}
          />
          <span style={{ marginLeft: 8 }}>
            {checked ? 'Completed' : 'Uncompleted'}
          </span>
        </label>
        <p className={styles.text}>
          <span className={styles.title}>Username: </span>
          {username}
        </p>
        <p className={styles.text}>
          <span className={styles.title}>Email: </span>
          {email}
        </p>
        {isBeingEdited ? (
          <EditableInput
            text={text}
            onEditSuccess={this.handleUpdate}
            onEditAbort={this.onEditEnd}
          />
        ) : (
          <>
            <p className={styles.text}>
              <span className={styles.title}>Text: </span>
              {text}
            </p>
            <div className={styles.actions}>
              <Button disabled={!authenticated} onClick={this.onEditStart}>
                Edit
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = { updateTaskText, updateTaskStatus };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
