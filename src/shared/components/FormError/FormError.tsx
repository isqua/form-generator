import React from 'react';

import { clx } from '../../utils/clx';
import { IFormErrorProps } from './FormError.types';

import styles from './FormError.module.css';

export function FormError({ children, className, testId }: IFormErrorProps): React.ReactElement {
  return (<p data-testid={testId} className={clx(styles.error, className)}>{children}</p>);
}
