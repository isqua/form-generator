import { ActionType, InputType, IForm } from '../../../shared/types/form';
import { IFormGeneratorState } from './types';

const today = new Date().toISOString().slice(0, 10);

export const defaultSchema: IForm = {
  title: 'Register',
  items: [
    {
      type: InputType.textfield,
      name: 'name',
      label: 'Full Name',
      placeholder: 'Jane Doe',
    },
    { type: InputType.numberfield, name: 'compensation', label: 'Annual Compensation' },
    {
      type: InputType.radiogroup,
      name: 'laptop',
      label: 'Preferred Laptop',
      options: [
        { value: 'mac', caption: 'MacBook Pro 13”', checked: true },
        { value: 'windows', caption: 'Dell XPS 13” with Windows' },
        { value: 'linux', caption: 'Dell XPS 13” with Ubuntu' },
      ],
    },
    {
      type: InputType.datefield,
      name: 'onboarding',
      value: today,
      label: 'Onboarding Date',
    },
    { type: InputType.textarea, name: 'bio', label: 'Bio' },
    {
      type: InputType.checkbox,
      name: 'terms',
      checked: true,
      label: 'I agree to defined terms and policies',
    },
  ],
  actions: [
    { type: ActionType.reset, text: 'Cancel' },
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
