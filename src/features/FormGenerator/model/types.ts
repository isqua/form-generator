import { IForm } from '../../../shared/types/form';

export enum FormGeneratorAction {
  update = 'update',
}

interface IFormGeneratorActionUpdate {
  type: FormGeneratorAction.update;
  payload: { text: string };
}

export type IFormGeneratorAction = IFormGeneratorActionUpdate;

export interface IFormGeneratorState {
  text: string;
  schema: IForm;
  error: string;
}
