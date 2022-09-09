import React from 'react';
import { CheckBox } from '../../../../shared/components/CheckBox';
import { TextArea } from '../../../../shared/components/TextArea';
import { TextInput } from '../../../../shared/components/TextInput';
import { InputType } from '../../../../shared/types/form';
import { IFormFieldProps } from './FormField.types';

export function FormField({ schema }: IFormFieldProps): React.ReactElement {
  let exhaustiveCheck: never;

  switch (schema.type) {
    case InputType.checkbox:
      return (
        <CheckBox
          label={schema.label}
        />
      );
    case InputType.textarea:
      return (
        <TextArea
          label={schema.label}
        />
      );
    case InputType.textfield:
      return (
        <TextInput
          label={schema.label}
          type="text"
        />
      );
    default:
      exhaustiveCheck = schema;

      return exhaustiveCheck;
  }
}
