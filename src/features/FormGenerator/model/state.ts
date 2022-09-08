import { ActionType, InputType, IForm } from '../../../shared/types/form';
import { IFormGeneratorState } from './types';

export const defaultSchema: IForm = {
  title: 'Register',
  items: [
    { type: InputType.textarea, label: 'Bio' },
    { type: InputType.textarea, label: 'Contacts' },
  ],
  actions: [
    { type: ActionType.submit, text: 'Sign up' },
  ],
};

export function init(schema: IForm): IFormGeneratorState {
  return {
    schema,
    text: JSON.stringify(schema, null, 2),
    error: '',
  };
}
