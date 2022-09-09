import { validate } from '../schema/validate';
import { FormGeneratorAction, IFormGeneratorState, IFormGeneratorAction } from './types';

const safeParseJson = (text: string) => {
  try {
    const schema = JSON.parse(text);
    return { schema, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { schema: null, error: message };
  }
};

export function reducer(
  state: IFormGeneratorState,
  action: IFormGeneratorAction,
): IFormGeneratorState {
  if (action.type === FormGeneratorAction.update) {
    const text = action.payload.text.trim();

    if (text.trim().length === 0) {
      return {
        schema: state.schema,
        text,
        error: '',
      };
    }

    const { schema, error } = safeParseJson(text);

    if (error) {
      return {
        schema: state.schema,
        text,
        error,
      };
    }

    const result = validate(schema);

    if (result.data) {
      return {
        schema,
        text,
        error: '',
      };
    }

    return {
      schema: state.schema,
      text,
      error: result.errors.join('. '),
    };
  }

  return state;
}
