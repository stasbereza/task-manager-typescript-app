// Core
import React, { SFC, ReactNode, HTMLAttributes, MouseEvent } from 'react';
import classNames from 'classnames/bind';
// Instruments
import styles from './styles.module.css';

const cx = classNames.bind(styles);

type ButtonType = "button" | "submit";
interface PagerButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  active?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: (event: MouseEvent) => void;
}

const PagerButton: SFC<PagerButtonProps> = ({ type, active, disabled, children, onClick }) => {
  const btnCls = cx({
    button: true,
    active,
    disabled,
  });

  return (
    <button
      className={btnCls}
      disabled={disabled}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default PagerButton;
