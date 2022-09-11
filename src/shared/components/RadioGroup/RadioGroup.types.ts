interface IRadioGroupOption {
  value: string;
  caption: string;
  hint?: string;
  checked?: boolean;
}

export interface IRadioGroupProps {
  options: IRadioGroupOption[];
  name?: string;
  className?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
  checked?: boolean;
}
