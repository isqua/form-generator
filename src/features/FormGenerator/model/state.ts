import { ActionType, InputType, IForm } from '../../../shared/types/form';
import { IFormGeneratorState } from './types';

export const defaultSchema: IForm = {
  title: 'Register',
  items: [
    { type: InputType.textfield, label: 'Full Name' },
    { type: InputType.textarea, label: 'Bio' },
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
