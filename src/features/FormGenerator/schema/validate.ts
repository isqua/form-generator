import Ajv from 'ajv';
import { formSchema } from './form';
import { formatErrors } from './errors';
import { IForm } from '../../../shared/types/form';

interface ValidResult {
  data: IForm;
  errors: never[];
}

interface InvalidResult {
  data: null;
  errors: string[];
}

type ValidateResult = ValidResult | InvalidResult;

export const validate = (data: unknown): ValidateResult => {
  const ajv = new Ajv();
  const validate = ajv.compile<IForm>(formSchema);

  const isValid = validate(data);

  if (isValid) {
    return { data, errors: [] };
  }

  const formattedErrors = formatErrors(validate.errors);

  return {
    data: null,
    errors: formattedErrors,
  };
};
