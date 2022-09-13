import React from 'react';

import { Form } from '../../../../shared/components/Form';
import { FormError } from '../../../../shared/components/FormError';
import { TextArea } from '../../../../shared/components/TextArea';
import { IButtonProps } from '../../../../shared/components/Button';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import { ActionType, IForm, InputType } from '../../types/form';
import { IFormParserProps } from './FormParser.types';

import styles from './FormParser.module.css';

const placeholder: IForm = {
  title: 'Form Title',
  items: [{ type: InputType.textfield }],
  actions: [{ type: ActionType.submit, text: 'Submit' }],
};

const debounceTimeoutInMs = 300;

export function FormParser(props: IFormParserProps): React.ReactElement {
  const {
    initialValue, error, onChange, onClear, onReset, onPrettify, onRollback,
  } = props;
  const [value, setValue] = React.useState<string>(initialValue);

  const debouncedChangeHandler = useDebounce(onChange, debounceTimeoutInMs);

  const handleChange = (text: string) => {
    setValue(text);
    debouncedChangeHandler(text);
  };

  // Reset the value if the state in the store has changed
  React.useEffect(
    () => setValue(initialValue),
    [initialValue],
  );

  const actions: IButtonProps[] = [
    {
      type: 'reset',
      children: 'Clear',
      onClick: onClear,
    },
    {
      type: 'reset',
      children: 'Example',
      onClick: onReset,
    },
    {
      type: 'button',
      children: 'Prettify',
      onClick: onPrettify,
    },
    {
      type: 'button',
      children: 'Rollback',
      onClick: onRollback,
    },
  ].map((action) => ({ ...action, theme: 'flat', className: styles.action }) as IButtonProps);

  return (
    <Form
      title="Form Generator"
      actions={actions}
      className={styles.container}
      fieldsClassName={styles.fields}
    >
      <TextArea
        className={styles.textarea}
        value={value}
        label="Describe your form in JSON"
        placeholder={JSON.stringify(placeholder, null, 2)}
        rows={15}
        onChange={handleChange}
      />
      <FormError testId="FormParserError" className={styles.error}>{error}</FormError>
    </Form>
  );
}
