import React from 'react';

import { clx } from '../../utils/clx';
import { FormHint } from '../FormHint';
import { FormLabel } from '../FormLabel';
import { ICheckBoxProps } from './CheckBox.types';

import styles from './CheckBox.module.css';

export function CheckBox(props: ICheckBoxProps): React.ReactElement {
  const {
    className,
    disabled,
    hint,
    label,
    name,
    value,
  } = props;
  const htmlId = React.useId();

  return (
    <div className={clx(styles.container, className)}>
      <div className={styles.control}>
        <input
          id={htmlId}
          name={name}
          defaultChecked={value}
          type="checkbox"
          disabled={disabled}
          className={styles.input}
        />
      </div>
      <div className={styles.text}>
        <FormLabel htmlFor={htmlId}>{label}</FormLabel>
        {hint && <FormHint>{hint}</FormHint>}
      </div>
    </div>
  );
}
