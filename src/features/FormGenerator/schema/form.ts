import { JSONSchemaType } from 'ajv';
import { IForm } from '../../../shared/types/form';
import { formActionSchema } from './action';
import { formInputSchema } from './input';

export const formSchema: JSONSchemaType<IForm> = {
  type: 'object',
  properties: {
    title: { type: 'string', nullable: true },
    items: { type: 'array', items: formInputSchema, minItems: 1 },
    actions: { type: 'array', items: formActionSchema, minItems: 1 },
  },
  required: ['actions', 'items'],
};
