import React from 'react';
import { clx } from '../../utils/clx';
import { IButtonProps } from './Button.types';

import styles from './Button.module.css';

const themes = {
  flat: styles.theme_flat,
};

export function Button(props: IButtonProps): React.ReactElement {
  const {
    type, disabled, children, onClick, className, theme, title,
  } = props;

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      title={title}
      disabled={disabled}
      className={clx(styles.control, className, theme && themes[theme])}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
