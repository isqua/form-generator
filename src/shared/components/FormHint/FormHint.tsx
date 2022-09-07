import React from 'react';
import styles from './FormHint.module.css';

export function FormHint({ children }: React.PropsWithChildren): React.ReactElement {
  return (<p className={styles.hint}>{children}</p>);
}
