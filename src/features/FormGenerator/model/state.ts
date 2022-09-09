import { ActionType, InputType, IForm } from '../../../shared/types/form';
import { IFormGeneratorState } from './types';

export const defaultSchema: IForm = {
  title: 'Register',
  items: [
    { type: InputType.textfield, label: 'Full Name' },
    { type: InputType.numberfield, label: 'Annual Compensation' },
    {
      type: InputType.radiogroup,
      label: 'Preferred Laptop',
      options: [
        { value: 'mac', caption: 'MacBook Pro 13”' },
        { value: 'windows', caption: 'Dell XPS 13” with Windows' },
        { value: 'linux', caption: 'Dell XPS 13” with Ubuntu' },
      ],
    },
    { type: InputType.datefield, label: 'Onboarding Date' },
    { type: InputType.textarea, label: 'Bio' },
    { type: InputType.checkbox, label: 'I agree to defined terms and policies' },
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
