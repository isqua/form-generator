export interface ITextAreaProps {
  className?: string;
  label?: string;
  hint?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  rows?: number;
  onChange?: (text: string) => void;
}
