import { ErrorObject } from 'ajv';

const formatPath = (instancePath: string): string => `Form${instancePath}`;

const formatError = (error: ErrorObject): string => {
  const { instancePath, message } = error;

  return `${formatPath(instancePath)} ${message}`;
};

export const formatErrors = (errors?: ErrorObject[] | null): string[] => {
  if (!errors) {
    return [];
  }

  const formattedErrors = errors.map(formatError);

  return Array.from(new Set(formattedErrors));
};
