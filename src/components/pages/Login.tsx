// Core
import React, { Component, CSSProperties, FormEvent } from 'react';
import { connect } from 'react-redux';
// Components
import Input from '../shared/Input';
import Button from '../shared/Button';
// Instruments
import { AppState } from '../../redux/reducers';
import { ISystemState } from '../../redux/actions/types';
import { signIn } from '../../redux/actions/auth';

interface LoginProps {
  authenticated: ISystemState["authenticated"];
  error: ISystemState["error"];
  history: { push: (arg0: string) => void };
  signIn: (admin: ISystemState['admin']) => void;
}

// interface State {
//   login: string;
//   password: string;
// }

const styles: { page: CSSProperties; form: CSSProperties; inputGroup: CSSProperties; inputError: CSSProperties; } = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputError: {
    borderBottom: '1px solid #f00',
  },
};

const INITIAL_STATE = { login: '', password: '' };

class LoginPage extends Component<LoginProps> {
  state = { ...INITIAL_STATE };

  componentDidUpdate() {
    this.checkAuthentication();
  }

  checkAuthentication = () => {
    const { authenticated, history } = this.props;

    if (authenticated) {
      history.push('/');
    }
  };

  handleInputChange = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => this.setState({ [name]: value });

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.signIn({ ...this.state });
    this.resetState();
  };

  resetState = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { login, password } = this.state;
    const { error, history } = this.props;
    const loginError = error === 'Login is incorrect!' && error;
    const passwordError = error === 'Invalid password!' && error;
    const emptyFieldsError = error === 'All fields must be filled!' && error;
    const loginInputErrorStyles = loginError || emptyFieldsError ? styles.inputError : undefined;
    const passInputErrorStyles = passwordError || emptyFieldsError ? styles.inputError : undefined;

    return (
      <div style={styles.page}>
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <div style={styles.inputGroup}>
            <Input
              type="text"
              name="login"
              value={login}
              style={loginInputErrorStyles}
              placeholder="Login"
              onChange={this.handleInputChange}
            />
            <span style={{ fontSize: 12, color: '#f00' }}>{loginError}</span>
            <Input
              type="password"
              name="password"
              value={password}
              style={passInputErrorStyles}
              placeholder="Password"
              onChange={this.handleInputChange}
            />
            <span style={{ fontSize: 12, color: '#f00' }}>{passwordError || emptyFieldsError}</span>
          </div>
          <div>
            <Button type="submit">Login</Button>
            <Button onClick={() => history.push('/')}>Back</Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  authenticated: state.auth.authenticated,
  error: state.auth.error,
});

export default connect(
  mapStateToProps,
  { signIn },
)(LoginPage);
