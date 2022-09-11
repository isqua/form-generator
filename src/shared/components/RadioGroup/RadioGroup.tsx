import React from 'react';

import { clx } from '../../utils/clx';
import { RadioOption } from './RadioOption';
import { IRadioGroupProps } from './RadioGroup.types';

import styles from './RadioGroup.module.css';
import { FormLabel } from '../FormLabel';
import { FormHint } from '../FormHint';

export function RadioGroup(props: IRadioGroupProps): React.ReactElement {
  const {
    className,
    disabled,
    hint,
    label,
    name,
    options,
  } = props;
  const htmlId = React.useId();

  return (
    <div className={clx(styles.container, className)}>
      <div className={clx(styles.header)}>
        <FormLabel htmlFor={htmlId}>{label}</FormLabel>
        {hint && (<FormHint>{hint}</FormHint>)}
      </div>

      <div className={clx(styles.options)}>
        {options.map((option) => (
          <RadioOption
            key={option.value}
            name={name || htmlId}
            value={option.value}
            caption={option.caption}
            hint={option.hint}
            checked={option.checked}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
