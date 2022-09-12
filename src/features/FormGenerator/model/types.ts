import { IForm } from '../types/form';

export enum FormGeneratorAction {
  update = 'update',
  reset = 'reset',
  clear = 'clear',
  prettify = 'prettify',
  rollback = 'rollback',
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

interface IFormGeneratorActionRollback {
  type: FormGeneratorAction.rollback;
}

export type IFormGeneratorAction =
  IFormGeneratorActionClear |
  IFormGeneratorActionPrettify |
  IFormGeneratorActionUpdate |
  IFormGeneratorActionReset |
  IFormGeneratorActionRollback;

export interface IFormGeneratorState {
  text: string;
  schema: IForm;
  error: string;
  lastValidText: string;
}
