import React from 'react';

import { clx } from '../../utils/clx';
import { FormHint } from '../FormHint';
import { FormLabel } from '../FormLabel';
import { ITextAreaProps } from './TextArea.types';

import styles from './TextArea.module.css';

export function TextArea(props: ITextAreaProps): React.ReactElement {
  const {
    className,
    disabled,
    hint,
    label,
    name,
    placeholder,
    value,
    rows,
    onChange,
  } = props;
  const htmlId = React.useId();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={clx(styles.container, className)}>
      {label && <FormLabel htmlFor={htmlId}>{label}</FormLabel>}

      <textarea
        id={htmlId}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={styles.input}
        onChange={handleChange}
      />

      {hint && <FormHint>{hint}</FormHint>}
    </div>
  );
}
