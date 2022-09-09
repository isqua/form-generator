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
  datefield = 'datefield',
  numberfield = 'numberfield',
  radiogroup = 'radiogroup',
  textarea = 'textarea',
  textfield = 'textfield',
}

export interface IInputOption {
  value: string;
  caption: string;
}

export interface IAbstractFormInput {
  label?: string;
  type: InputType;
}

export interface ICheckBoxInput extends IAbstractFormInput {
  type: InputType.checkbox;
  label: string;
}

export interface IDateFieldInput extends IAbstractFormInput {
  type: InputType.datefield;
}

export interface INumberFieldInput extends IAbstractFormInput {
  type: InputType.numberfield;
}

export interface IRadioGroupInput extends IAbstractFormInput {
  type: InputType.radiogroup;
  options: IInputOption[];
}

export interface ITextAreaInput extends IAbstractFormInput {
  type: InputType.textarea;
}

export interface ITextFieldInput extends IAbstractFormInput {
  type: InputType.textfield;
}

export type IFormInput =
  ICheckBoxInput |
  IDateFieldInput |
  INumberFieldInput |
  IRadioGroupInput |
  ITextAreaInput |
  ITextFieldInput;

export interface IForm {
  title?: string;
  items: IFormInput[];
  actions: FormAction[];
}
