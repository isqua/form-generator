import React from 'react';
import { CheckBox } from '../../../../shared/components/CheckBox';
import { RadioGroup } from '../../../../shared/components/RadioGroup';
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
          name={schema.name}
          label={schema.label}
          disabled={schema.disabled}
        />
      );
    case InputType.datefield:
      return (
        <TextInput
          name={schema.name}
          label={schema.label}
          disabled={schema.disabled}
          type="date"
        />
      );
    case InputType.numberfield:
      return (
        <TextInput
          name={schema.name}
          label={schema.label}
          disabled={schema.disabled}
          type="number"
        />
      );
    case InputType.radiogroup:
      return (
        <RadioGroup
          name={schema.name}
          label={schema.label}
          options={schema.options}
          disabled={schema.disabled}
        />
      );
    case InputType.textarea:
      return (
        <TextArea
          name={schema.name}
          label={schema.label}
          disabled={schema.disabled}
        />
      );
    case InputType.textfield:
      return (
        <TextInput
          name={schema.name}
          label={schema.label}
          disabled={schema.disabled}
          type="text"
        />
      );
    default:
      exhaustiveCheck = schema;

      return exhaustiveCheck;
  }
}
