export interface IFormParserProps {
  initialValue: string;
  error?: string;
  onChange(schema: string): void;
  onReset(): void;
  onClear(): void;
  onPrettify(): void;
  onRollback(): void;
}
