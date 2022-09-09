import React from 'react';

import { clx } from '../../utils/clx';
import { FormHint } from '../FormHint';
import { FormLabel } from '../FormLabel';
import { IRadioOptionProps } from './RadioOption.types';

import styles from './RadioGroup.module.css';

export function RadioOption(props: IRadioOptionProps): React.ReactElement {
  const {
    name,
    value,
    caption,
    checked,
    disabled,
    hint,
  } = props;
  const htmlId = React.useId();

  return (
    <div className={clx(styles.option)}>
      <div className={styles.control}>
        <input
          type="radio"
          id={htmlId}
          name={name}
          value={value}
          defaultChecked={checked}
          disabled={disabled}
          className={styles.input}
        />
      </div>
      <div className={styles.text}>
        <FormLabel htmlFor={htmlId}>{caption}</FormLabel>
        {hint && <FormHint>{hint}</FormHint>}
      </div>
    </div>
  );
}
