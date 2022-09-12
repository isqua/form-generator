import { IForm } from '../types/form';

export enum FormGeneratorAction {
  update = 'update',
  reset = 'reset',
}

interface IFormGeneratorActionUpdate {
  type: FormGeneratorAction.update;
  payload: { text: string };
}

interface IFormGeneratorActionReset {
  type: FormGeneratorAction.reset;
}

export type IFormGeneratorAction =
  IFormGeneratorActionUpdate |
  IFormGeneratorActionReset;

export interface IFormGeneratorState {
  text: string;
  schema: IForm;
  error: string;
}
