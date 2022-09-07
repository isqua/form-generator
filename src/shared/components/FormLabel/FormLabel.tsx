import React from 'react';
import styles from './FormLabel.module.css';
import { IFormLabelProps } from './FormLabel.types';

export function FormLabel({ children, htmlFor }: IFormLabelProps): React.ReactElement {
  return (<label htmlFor={htmlFor} className={styles.label}>{children}</label>);
}
