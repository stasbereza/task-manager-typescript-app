// Core
import React, { SFC, ReactNode, HTMLAttributes, MouseEvent } from 'react';
import classNames from 'classnames/bind';
// Instruments
import styles from './styles.module.css';

const cx = classNames.bind(styles);

type ButtonType = "button" | "submit";
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  active?: boolean;
  disabled?: boolean;
  children: ReactNode;
  isOrangeBgColor?: boolean;
  onClick?: (event: MouseEvent) => void;
}

const Button: SFC<ButtonProps> = ({
  type,
  active,
  disabled,
  children,
  isOrangeBgColor,
  onClick,
}) => {
  const btnCls = cx({
    button: true,
    isOrangeBgColor,
    active,
    disabled,
  });

  return (
    <button
      type={type}
      disabled={disabled}
      className={btnCls}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
