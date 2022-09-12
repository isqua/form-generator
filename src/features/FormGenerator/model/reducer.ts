import { validate } from '../schema/validate';
import { defaultIndent, defaultSchema, init } from './state';
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
        ...state,
        text,
        error: '',
      };
    }

    const { schema, error } = safeParseJson(text);

    if (error) {
      return {
        ...state,
        text,
        error,
      };
    }

    const result = validate(schema);

    if (result.data) {
      return {
        schema,
        text,
        lastValidText: text,
        error: '',
      };
    }

    return {
      ...state,
      text,
      error: result.errors.join('. '),
    };
  }

  if (action.type === FormGeneratorAction.clear) {
    return {
      schema: { items: [], actions: [] },
      lastValidText: state.lastValidText,
      text: '',
      error: '',
    };
  }

  if (action.type === FormGeneratorAction.reset) {
    return init(defaultSchema);
  }

  if (action.type === FormGeneratorAction.rollback) {
    const { schema, error } = safeParseJson(state.lastValidText);

    if (!error) {
      return {
        schema,
        text: state.lastValidText,
        lastValidText: state.lastValidText,
        error: '',
      };
    }
  }

  if (action.type === FormGeneratorAction.prettify && !state.error) {
    const text = JSON.stringify(state.schema, null, defaultIndent);

    return {
      ...state,
      text,
      lastValidText: text,
    };
  }

  return state;
}
