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
  textarea = 'textarea',
  textfield = 'textfield',
}

export interface IAbstractFormInput {
  label?: string;
  type: InputType;
}

export interface ITextAreaInput extends IAbstractFormInput {
  type: InputType.textarea;
}

export interface ITextFieldInput extends IAbstractFormInput {
  type: InputType.textfield;
}

export type IFormInput = ITextAreaInput | ITextFieldInput;

export interface IForm {
  title?: string;
  items: IFormInput[];
  actions: FormAction[];
}
