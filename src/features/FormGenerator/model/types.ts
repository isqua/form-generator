import { IForm } from '../types/form';

export enum FormGeneratorAction {
  update = 'update',
  reset = 'reset',
  clear = 'clear',
  prettify = 'prettify',
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

interface IFormGeneratorActionPrettify {
  type: FormGeneratorAction.prettify;
}

export type IFormGeneratorAction =
  IFormGeneratorActionClear |
  IFormGeneratorActionPrettify |
  IFormGeneratorActionUpdate |
  IFormGeneratorActionReset;

export interface IFormGeneratorState {
  text: string;
  schema: IForm;
  error: string;
}
