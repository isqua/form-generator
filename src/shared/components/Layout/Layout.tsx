import React from 'react';

import { ILayoutProps } from './Layout.types';

import styles from './Layout.module.css';

export function Layout(props: ILayoutProps): React.ReactElement {
  const { main, secondary } = props;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {main}
      </div>
      <div className={styles.secondary}>
        {secondary}
      </div>
    </div>
  );
}
