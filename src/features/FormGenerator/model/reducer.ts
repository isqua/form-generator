import { validate } from '../schema/validate';
import { FormGeneratorAction, IFormGeneratorState, IFormGeneratorAction } from './types';

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

    try {
      const schema = JSON.parse(text);
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
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      return {
        schema: state.schema,
        text,
        error: message,
      };
    }
  }

  return state;
}
