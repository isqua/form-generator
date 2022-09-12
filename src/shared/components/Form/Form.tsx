import React from 'react';
import { clx } from '../../utils/clx';
import { hasChildren } from '../../utils/hasChildren';
import { Button } from '../Button';
import { IFormProps } from './Form.types';
import styles from './Form.module.css';

export function Form(props: IFormProps): React.ReactElement {
  const {
    title,
    actions,
    children,
    className,
    fieldsClassName,
    testId,
    onSubmit,
  } = props;

  return (
    <form className={clx(className, styles.form)} onSubmit={onSubmit} data-testid={testId}>
      {title && <h4 className={styles.title}>{title}</h4>}

      {hasChildren(children) && (
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
              theme={action.theme}
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
