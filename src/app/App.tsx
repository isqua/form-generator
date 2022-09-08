import React from 'react';
import { FormGenerator } from '../features/FormGenerator';
import styles from './App.module.css';

export function App(): React.ReactElement {
  return (
    <div className={styles.app}>
      <FormGenerator />
    </div>
  );
}
