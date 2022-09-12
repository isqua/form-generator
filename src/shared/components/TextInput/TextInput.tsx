import React from 'react';

import { clx } from '../../utils/clx';
import { FormHint } from '../FormHint';
import { FormLabel } from '../FormLabel';
import { ITextInputProps } from './TextInput.types';

import styles from './TextInput.module.css';

export function TextInput(props: ITextInputProps): React.ReactElement {
  const {
    className,
    disabled,
    hint,
    label,
    name,
    type,
    placeholder,
    value,
  } = props;
  const htmlId = React.useId();

  return (
    <div className={clx(styles.container, className)}>
      {label && <FormLabel htmlFor={htmlId}>{label}</FormLabel>}

      <input
        id={htmlId}
        name={name}
        defaultValue={value}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
      />

      {hint && <FormHint>{hint}</FormHint>}
    </div>
  );
}
