import { ErrorObject } from 'ajv';

const needlessErrorTypes = [
  // Hide messages like “Form/items/5 must match exactly one schema in oneOf”
  // Showing unmatched properties for /items/5 is enough
  'oneOf',
];

const formatPath = (instancePath: string): string => `Form${instancePath}`;

const formatError = (error: ErrorObject): string => {
  const { instancePath, message } = error;

  return `${formatPath(instancePath)} ${message}`;
};

export const formatErrors = (errors?: ErrorObject[] | null): string[] => {
  if (!errors) {
    return [];
  }

  const formattedErrors = errors
    .filter((error) => !needlessErrorTypes.includes(error.keyword))
    .map(formatError);

  return Array.from(new Set(formattedErrors));
};
