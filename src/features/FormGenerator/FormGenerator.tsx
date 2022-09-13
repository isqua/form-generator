import React from 'react';

import {
  reducer, defaultSchema, init,
} from './model';
import { FormBuilder } from './widgets/FormBuilder';
import { FormParser } from './widgets/FormParser';
import { Layout } from '../../shared/components/Layout';

export function FormGenerator(): React.ReactElement {
  const [state, dispatch] = React.useReducer(reducer, defaultSchema, init);

  return (
    <Layout
      main={(
        <FormParser
          state={state}
          dispatch={dispatch}
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
