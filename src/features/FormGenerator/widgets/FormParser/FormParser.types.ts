export interface IFormParserProps {
  initialValue: string;
  error?: string;
  onChange(schema: string): void;
}