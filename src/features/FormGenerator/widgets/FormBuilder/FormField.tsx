import React from 'react';
import { TextArea } from '../../../../shared/components/TextArea';
import { IFormFieldProps } from './FormField.types';

export function FormField({ schema }: IFormFieldProps): React.ReactElement {
  switch (schema.type) {
    default:
      return (
        <TextArea
          label={schema.label}
        />
      );
  }
}
