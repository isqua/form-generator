import React from 'react';
import { Button } from '../Button';
import { IFormProps } from './Form.types';
import styles from './Form.module.css';
import { clx } from '../../utils/clx';

export function Form(props: IFormProps): React.ReactElement {
  const {
    title,
    actions,
    children,
    className,
    fieldsClassName,
    onSubmit,
  } = props;

  return (
    <form className={clx(className, styles.form)} onSubmit={onSubmit}>
      {title && <h4 className={styles.title}>{title}</h4>}

      {React.Children.count(children) > 0 && (
        <div className={clx(fieldsClassName, styles.fields)}>
          {children}
        </div>
      )}

      {actions && actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <Button
              // we have no control over the uniqueness of any button property
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              type={action.type}
              disabled={action.disabled}
              onClick={action.onClick}
            >
              {action.children}
            </Button>
          ))}
        </div>
      )}
    </form>
  );
}
