import React from 'react';
import { clx } from '../../utils/clx';
import { IButtonProps } from './Button.types';

import styles from './Button.module.css';

export function Button(props: IButtonProps): React.ReactElement {
  const {
    type, disabled, children, onClick, className,
  } = props;

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={clx(styles.control, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
