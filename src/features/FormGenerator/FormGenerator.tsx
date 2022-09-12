import React from 'react';

import {
  reducer, defaultSchema, init, FormGeneratorAction,
} from './model';
import { FormBuilder } from './widgets/FormBuilder';
import { FormParser } from './widgets/FormParser';
import { Layout } from '../../shared/components/Layout';

export function FormGenerator(): React.ReactElement {
  const [state, dispatch] = React.useReducer(reducer, defaultSchema, init);

  const handleChange = React.useCallback((text: string) => {
    dispatch({
      type: FormGeneratorAction.update,
      payload: { text },
    });
  }, [dispatch]);

  const handleReset = () => {
    dispatch({ type: FormGeneratorAction.reset });
  };

  return (
    <Layout
      main={(
        <FormParser
          initialValue={state.text}
          error={state.error}
          onChange={handleChange}
          onReset={handleReset}
        />
      )}
      secondary={(
        <FormBuilder
          schema={state.schema}
        />
      )}
    />
  );
}
