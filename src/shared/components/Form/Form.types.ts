import { PropsWithChildren } from 'react';
import { IButtonProps } from '../Button/Button.types';

export interface IFormProps extends PropsWithChildren {
  title?: string;
  className?: string;
  fieldsClassName?: string;
  fieldClassName?: string;
  actions?: IButtonProps[];
  onSubmit?: () => void;
  testId?: string;
}
