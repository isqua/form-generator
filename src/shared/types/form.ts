export enum ActionType {
  button = 'button',
  reset = 'reset',
  submit = 'submit',
}

export interface FormAction {
  type: ActionType;
  text: string;
}

export enum InputType {
  checkbox = 'checkbox',
  numberfield = 'numberfield',
  textarea = 'textarea',
  textfield = 'textfield',
}

export interface IAbstractFormInput {
  label?: string;
  type: InputType;
}

export interface ICheckBoxInput extends IAbstractFormInput {
  type: InputType.checkbox;
  label: string;
}

export interface INumberFieldInput extends IAbstractFormInput {
  type: InputType.numberfield;
}

export interface ITextAreaInput extends IAbstractFormInput {
  type: InputType.textarea;
}

export interface ITextFieldInput extends IAbstractFormInput {
  type: InputType.textfield;
}

export type IFormInput =
  ICheckBoxInput |
  INumberFieldInput |
  ITextAreaInput |
  ITextFieldInput;

export interface IForm {
  title?: string;
  items: IFormInput[];
  actions: FormAction[];
}
