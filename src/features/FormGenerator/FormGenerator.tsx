import React from 'react';

import {
  reducer, defaultSchema, init, FormGeneratorAction,
} from './model';
import { FormBuilder } from './widgets/FormBuilder';
import { FormParser } from './widgets/FormParser';
import { Layout } from '../../shared/components/Layout';

export function FormGenerator(): React.ReactElement {
  const [state, dispatch] = React.useReducer(reducer, defaultSchema, init);

  const handleChange = (text: string) => {
    dispatch({
      type: FormGeneratorAction.update,
      payload: { text },
    });
  };

  return (
    <Layout
      main={(
        <FormParser
          initialValue={state.text}
          error={state.error}
          onChange={handleChange}
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
