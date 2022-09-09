import { JSONSchemaType } from 'ajv';
import {
  InputType,
  IFormInput,
  ITextAreaInput,
  ITextFieldInput,
} from '../../../shared/types/form';

const textAreaInputSchema: JSONSchemaType<ITextAreaInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.textarea },
    label: { type: 'string', nullable: true },
  },
  required: ['type'],
  additionalProperties: false,
};

const textFieldInputSchema: JSONSchemaType<ITextFieldInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.textfield },
    label: { type: 'string', nullable: true },
  },
  required: ['type'],
  additionalProperties: false,
};

export const formInputSchema: JSONSchemaType<IFormInput> = {
  type: 'object',
  oneOf: [
    textAreaInputSchema,
    textFieldInputSchema,
  ],
};
