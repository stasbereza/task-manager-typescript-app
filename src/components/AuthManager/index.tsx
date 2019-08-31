// Core
import React, { FunctionComponent, CSSProperties } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// Components
import Button from '../shared/Button';
// Instruments
import { AppState } from '../../redux/reducers';
import { ISystemState } from '../../redux/actions/types';
import { signOut } from '../../redux/actions/auth';

interface PrivateActionsProps {
  signOut: () => void;
}

interface AuthManagerProps {
  authenticated: ISystemState['authenticated'];
  signOut: () => void;
}

const styles: { list: CSSProperties; link: CSSProperties; activeLink: CSSProperties; } = {
  list: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    display: 'block',
    padding: '8px',
    fontFamily: 'inherit',
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'uppercase',
    textDecoration: 'none',
  },
  activeLink: {
    color: 'palevioletred',
    border: '2px solid palevioletred',
    borderRadius: 4,
  },
};

const PublicActions = () => (
  <li>
    <NavLink
      to="/login"
      style={styles.link}
      activeStyle={styles.activeLink}>
      Log in
    </NavLink>
  </li>
);

const PrivateActions: FunctionComponent<PrivateActionsProps> = ({
  signOut,
}) => (
  <li>
    <Button onClick={async () => await signOut()}>
      Logout
    </Button>
  </li>
);

const AuthManager: FunctionComponent<AuthManagerProps> = ({
  authenticated,
  signOut
}) => (
  <ul style={styles.list}>
    {authenticated ? <PrivateActions signOut={signOut} /> : <PublicActions />}
  </ul>
);

const mapStateToProps = (state: AppState) => ({
  authenticated: state.auth.authenticated,
});

export default connect(
  mapStateToProps,
  { signOut }
)(AuthManager);
