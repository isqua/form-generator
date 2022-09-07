import { MouseEvent, PropsWithChildren } from 'react';
import { ActionType } from '../../types/form';

export interface IButtonProps extends PropsWithChildren {
  type: ActionType;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
