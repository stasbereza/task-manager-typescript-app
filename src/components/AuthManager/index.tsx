// Core
import React, { FunctionComponent, ReactNode } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// Components
import Button from '../shared/Button';
// Instruments
import { signOut } from '../../redux/actions/auth';

interface PrivateActionsProps {
  signOut: () => void;
}

interface AuthManagerProps {
  authenticated: boolean;
  // children: ReactNode;
}

const styles = {
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
      // style={styles.link}
      activeStyle={styles.activeLink}>
      Log in
    </NavLink>
  </li>
);

const PrivateActions: FunctionComponent<PrivateActionsProps> = ({
  signOut,
}) => (
  <li>
    <Button
      onClick={async () => {
        await signOut();
      }}>
      Logout
    </Button>
  </li>
);

const AuthManager: FunctionComponent<AuthManagerProps> = ({
  authenticated,
  ...props
}) => (
  <ul style={styles.list}>
    {authenticated ? <PrivateActions signOut={signOut} /> : <PublicActions />}
  </ul>
);

const mapStateToProps = (state: { auth: { authenticated: boolean } }) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = { signOut };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthManager);
