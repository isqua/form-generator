import { JSONSchemaType } from 'ajv';
import {
  InputType,
  IFormInput,
  ICheckBoxInput,
  ITextAreaInput,
  ITextFieldInput,
} from '../../../shared/types/form';

const checkBoxInputSchema: JSONSchemaType<ICheckBoxInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.checkbox },
    label: { type: 'string' },
  },
  required: ['type', 'label'],
  additionalProperties: false,
};

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
    checkBoxInputSchema,
    textAreaInputSchema,
    textFieldInputSchema,
  ],
};
