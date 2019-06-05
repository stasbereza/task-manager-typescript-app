// Core
import React, { FunctionComponent, ReactNode } from 'react';
// Containers
import Container from '../ui/container';
// Instruments
import styles from './styles.module.css';

interface Props {
  children: ReactNode;
}

const AppBar: FunctionComponent<Props> = ({ children }) => (
  <header className={styles.header}>
    <Container
      styles={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {children}
    </Container>
  </header>
);

export default AppBar;
