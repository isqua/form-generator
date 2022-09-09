interface IRadioGroupOption {
  value: string;
  caption: string;
  hint?: string;
}

export interface IRadioGroupProps {
  options: IRadioGroupOption[];
  name?: string;
  className?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
}
