import { JSONSchemaType } from 'ajv';
import {
  InputType,
  IFormInput,
  ITextAreaInput,
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

export const formInputSchema: JSONSchemaType<IFormInput> = textAreaInputSchema;
