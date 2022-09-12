import { JSONSchemaType } from 'ajv';

import { ActionType, FormAction } from '../types/form';

export const formActionSchema: JSONSchemaType<FormAction> = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: Object.values(ActionType) },
    text: { type: 'string', minLength: 1 },
  },
  required: ['type', 'text'],
  additionalProperties: false,
};
