// Core
import React, { SFC, HTMLAttributes, ChangeEvent, CSSProperties } from 'react';
// Instruments
import styles from './styles.module.css';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  value: string;
  style?: CSSProperties;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: SFC<InputProps> = ({ type, name, value, style, placeholder, onChange }) => (
  <input
    type={type}
    name={name}
    value={value}
    style={style}
    className={styles.input}
    placeholder={placeholder}
    onChange={onChange}
  />
);

export default Input;
