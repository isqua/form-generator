import { MouseEvent, PropsWithChildren } from 'react';

export interface IButtonProps extends PropsWithChildren {
  type: 'submit' | 'reset' | 'button';
  theme?: 'flat';
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
