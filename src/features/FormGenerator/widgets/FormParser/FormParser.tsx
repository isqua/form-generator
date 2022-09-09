import React from 'react';

import { Form } from '../../../../shared/components/Form';
import { FormError } from '../../../../shared/components/FormError';
import { TextArea } from '../../../../shared/components/TextArea';
import { ActionType, IForm, InputType } from '../../../../shared/types/form';
import { IFormParserProps } from './FormParser.types';

import styles from './FormParser.module.css';

const placeholder: IForm = {
  title: 'Form Title',
  items: [{ type: InputType.textfield }],
  actions: [{ type: ActionType.submit, text: 'Submit' }],
};

export function FormParser(props: IFormParserProps): React.ReactElement {
  const {
    initialValue, error, onChange,
  } = props;
  const [value, setValue] = React.useState<string>(initialValue);

  const handleChange = (text: string) => {
    setValue(text);
    onChange(text);
  };

  return (
    <Form
      title="Form Generator"
      actions={[]}
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
