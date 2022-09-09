import { JSONSchemaType } from 'ajv';
import {
  InputType,
  IFormInput,
  IInputOption,
  IDateFieldInput,
  ICheckBoxInput,
  INumberFieldInput,
  IRadioGroupInput,
  ITextAreaInput,
  ITextFieldInput,
} from '../../../shared/types/form';

const inputOptionSchema: JSONSchemaType<IInputOption> = {
  type: 'object',
  properties: {
    value: { type: 'string' },
    caption: { type: 'string' },
  },
  required: ['value', 'caption'],
  additionalProperties: false,
};

const checkBoxInputSchema: JSONSchemaType<ICheckBoxInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.checkbox },
    label: { type: 'string' },
  },
  required: ['type', 'label'],
  additionalProperties: false,
};

const dateFieldInputSchema: JSONSchemaType<IDateFieldInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.datefield },
    label: { type: 'string', nullable: true },
  },
  required: ['type'],
  additionalProperties: false,
};

const numberFieldInputSchema: JSONSchemaType<INumberFieldInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.numberfield },
    label: { type: 'string', nullable: true },
  },
  required: ['type'],
  additionalProperties: false,
};

const radioGroupInputSchema: JSONSchemaType<IRadioGroupInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.radiogroup },
    label: { type: 'string', nullable: true },
    options: { type: 'array', items: inputOptionSchema, minItems: 2 },
  },
  required: ['type', 'options'],
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
    dateFieldInputSchema,
    numberFieldInputSchema,
    radioGroupInputSchema,
    textAreaInputSchema,
    textFieldInputSchema,
  ],
};
