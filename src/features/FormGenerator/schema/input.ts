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
    name: { type: 'string', nullable: true },
    label: { type: 'string' },
    disabled: { type: 'boolean', nullable: true },
  },
  required: ['type', 'label'],
  additionalProperties: false,
};

const dateFieldInputSchema: JSONSchemaType<IDateFieldInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.datefield },
    name: { type: 'string', nullable: true },
    label: { type: 'string', nullable: true },
    disabled: { type: 'boolean', nullable: true },
  },
  required: ['type'],
  additionalProperties: false,
};

const numberFieldInputSchema: JSONSchemaType<INumberFieldInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.numberfield },
    name: { type: 'string', nullable: true },
    label: { type: 'string', nullable: true },
    disabled: { type: 'boolean', nullable: true },
  },
  required: ['type'],
  additionalProperties: false,
};

const radioGroupInputSchema: JSONSchemaType<IRadioGroupInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.radiogroup },
    name: { type: 'string', nullable: true },
    label: { type: 'string', nullable: true },
    options: { type: 'array', items: inputOptionSchema, minItems: 2 },
    disabled: { type: 'boolean', nullable: true },
  },
  required: ['type', 'options'],
  additionalProperties: false,
};

const textAreaInputSchema: JSONSchemaType<ITextAreaInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.textarea },
    name: { type: 'string', nullable: true },
    label: { type: 'string', nullable: true },
    disabled: { type: 'boolean', nullable: true },
  },
  required: ['type'],
  additionalProperties: false,
};

const textFieldInputSchema: JSONSchemaType<ITextFieldInput> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: InputType.textfield },
    name: { type: 'string', nullable: true },
    label: { type: 'string', nullable: true },
    disabled: { type: 'boolean', nullable: true },
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
