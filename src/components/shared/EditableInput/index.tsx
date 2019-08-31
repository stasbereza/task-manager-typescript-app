// Core
import React, { Component, FormEvent, MouseEvent } from 'react';
// Components
import Button from '../Button';
// Instruments
import styles from './styles.module.css';

interface EditableInputProps {
  text: string;
  onEditSuccess: (text: { text: string }) => void;
  onEditAbort: () => void;
}

interface EditableInputState {
  text: string;
}

export default class EditableInput extends Component<
  EditableInputProps,
  EditableInputState
> {
  state: EditableInputState = {
    text: this.props.text,
  };

  handleInputChange = ({ target: { value } }: { target: { value: string } }) =>
    this.setState({ text: value });

  handleEditSuccess = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.onEditSuccess(this.state);
  };

  handleEditCancel = (e: MouseEvent) => {
    e.preventDefault();

    this.props.onEditAbort();
  };

  render() {
    const { text } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleEditSuccess}>
        <textarea
          name={'text'}
          value={text}
          rows={8}
          className={styles.input}
          onChange={this.handleInputChange}
        />
        <div className={styles.actions}>
          <Button type="submit">Save</Button>
          <Button onClick={this.handleEditCancel} type="submit">
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}
