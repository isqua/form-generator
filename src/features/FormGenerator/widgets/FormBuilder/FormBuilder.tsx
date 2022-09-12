import React from 'react';
import { Form } from '../../../../shared/components/Form';
import { FormField } from './FormField';
import { IFormBuilderProps } from './FormBuilder.types';

export const FormBuilder = React.memo((props: IFormBuilderProps): React.ReactElement => {
  const { schema, className } = props;
  const { title, items, actions } = schema;
  const buttons = actions?.map((action) => ({
    type: action.type,
    children: action.text,
  }));

  return (
    <Form
      title={title}
      actions={buttons}
      className={className}
    >
      {items.length > 0 && (
        items.map((item, index) => (
          <FormField
            // we have no control over the uniqueness of any input property
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            schema={item}
          />
        ))
      )}
    </Form>
  );
});
