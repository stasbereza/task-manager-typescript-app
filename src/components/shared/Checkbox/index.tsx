  // Core
import React, { SFC, ReactNode, HTMLAttributes, ChangeEvent } from 'react';
import styled from 'styled-components';

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  className?: string;
  checked: boolean;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

interface StyledCheckboxProps {
  children?: ReactNode;
  checked: boolean;
  disabled: boolean;
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? 'salmon' : 'papayawhip')};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

const Checkbox: SFC<CheckboxProps> = ({ className, checked, disabled, id, onChange }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} disabled={disabled} id={id} onChange={onChange} />
    <StyledCheckbox checked={checked} disabled={disabled}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
