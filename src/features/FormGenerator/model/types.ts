import { IForm } from '../types/form';

export enum FormGeneratorAction {
  update = 'update',
  reset = 'reset',
  clear = 'clear',
}

interface IFormGeneratorActionUpdate {
  type: FormGeneratorAction.update;
  payload: { text: string };
}

interface IFormGeneratorActionReset {
  type: FormGeneratorAction.reset;
}

interface IFormGeneratorActionClear {
  type: FormGeneratorAction.clear;
}

export type IFormGeneratorAction =
  IFormGeneratorActionClear |
  IFormGeneratorActionUpdate |
  IFormGeneratorActionReset;

export interface IFormGeneratorState {
  text: string;
  schema: IForm;
  error: string;
}
