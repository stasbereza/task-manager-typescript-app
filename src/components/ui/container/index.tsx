// Core
import React, { SFC, ReactNode } from 'react';

interface ContainerProps {
  width?: number;
  styles?: React.CSSProperties;
  children?: ReactNode;
}

const Container: SFC<ContainerProps> = ({ width = 1170, styles = {}, children }) => (
  <div
    style={{ maxWidth: width, margin: '0 auto', padding: '0 16px', ...styles }}>
    {children}
  </div>
);

export default Container;
