import React from 'react';

import { clx } from '../../utils/clx';
import { IFormErrorProps } from './FormError.types';

import styles from './FormError.module.css';

export function FormError({ children, className }: IFormErrorProps): React.ReactElement {
  return (<p className={clx(styles.error, className)}>{children}</p>);
}
