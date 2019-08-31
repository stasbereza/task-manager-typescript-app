// Core
import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
// Components
import Input from '../shared/Input';
import Button from '../shared/Button';
// Instruments
import { INewTask } from '../../redux/actions/types';
import { addTask } from '../../redux/actions/tasks';
import styles from './styles.module.css';

interface TaskEditorProps {
  addTask: (task: INewTask) => void;
  onCancel: () => void;
}

// interface State {
//   username: string;
//   email: string;
//   text: string;
// }

const INITIAL_STATE = {
  username: '',
  email: '',
  text: '',
};

export class TaskEditor extends Component<TaskEditorProps> {
  state = { ...INITIAL_STATE };

  handleInputChange = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => this.setState({ [name]: value });

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, text } = this.state;

    if (username === '' || email === '' || text === '') {
      return;
    }

    const newTask = this.state;

    this.props.addTask(newTask);
    this.props.onCancel();
    this.resetState();
  };

  resetState = () => this.setState({ ...INITIAL_STATE });

  render() {
    const { username, email, text } = this.state;
    const { onCancel } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <Input
          type='input'
          name="username"
          value={username}
          className={styles.input}
          placeholder="User name"
          onChange={this.handleInputChange}
        />
        <Input
          type='input'
          name="email"
          value={email}
          className={styles.input}
          placeholder="Email"
          onChange={this.handleInputChange}
        />
        <textarea
          name="text"
          value={text}
          rows={8}
          className={styles.input}
          placeholder="Type task text..."
          onChange={this.handleInputChange}
        />
        <div className={styles.actions}>
          <Button type="submit">Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    );
  }
}

export default connect(null, { addTask })(TaskEditor);
