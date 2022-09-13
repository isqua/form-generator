import React from 'react';
import { Form } from '../../../../shared/components/Form';
import { FormField } from './FormField';
import { IFormBuilderProps } from './FormBuilder.types';

const defaultAction = 'https://httpbin.org/post';
const defaultMethod = 'post';

export const FormBuilder = React.memo((props: IFormBuilderProps): React.ReactElement => {
  const { schema, className } = props;
  const { title, items, actions } = schema;
  const buttons = actions?.map((action) => ({
    type: action.type,
    children: action.text,
  }));

  return (
    <Form
      testId="FormBuilder"
      action={defaultAction}
      method={defaultMethod}
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
