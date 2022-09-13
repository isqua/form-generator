import React from 'react';

import { Form } from '../../../../shared/components/Form';
import { FormError } from '../../../../shared/components/FormError';
import { TextArea } from '../../../../shared/components/TextArea';
import { IButtonProps } from '../../../../shared/components/Button';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import { ActionType, IForm, InputType } from '../../types/form';
import { FormGeneratorAction, IFormGeneratorAction } from '../../model';
import { IFormParserProps } from './FormParser.types';

import styles from './FormParser.module.css';

const placeholder: IForm = {
  title: 'Form Title',
  items: [{ type: InputType.textfield }],
  actions: [{ type: ActionType.submit, text: 'Submit' }],
};

const debounceTimeoutInMs = 300;

const getActions = (dispatch: React.Dispatch<IFormGeneratorAction>): IButtonProps[] => {
  const actions: IButtonProps[] = [
    {
      type: 'reset',
      children: 'Clear',
      onClick: () => dispatch({ type: FormGeneratorAction.clear }),
    },
    {
      type: 'reset',
      children: 'Example',
      title: 'Insert an example config',
      onClick: () => dispatch({ type: FormGeneratorAction.reset }),
    },
    {
      type: 'button',
      children: 'Prettify',
      title: 'Prettify your config',
      onClick: () => dispatch({ type: FormGeneratorAction.prettify }),
    },
    {
      type: 'button',
      children: 'Rollback',
      title: 'Rollback to last valid config',
      onClick: () => dispatch({ type: FormGeneratorAction.rollback }),
    },
  ];

  return actions.map((action) => ({ ...action, theme: 'flat', className: styles.action }) as IButtonProps);
};

export function FormParser(props: IFormParserProps): React.ReactElement {
  // In the real world I would use redux hooks, but our app is too small for it, so let’s use props
  const { state, dispatch } = props;
  const [value, setValue] = React.useState<string>(state.text);
  const actions = getActions(dispatch);

  const dispatchChange = React.useCallback((text: string) => {
    dispatch({
      type: FormGeneratorAction.update,
      payload: { text },
    });
  }, [dispatch]);

  const debouncedChangeHandler = useDebounce(dispatchChange, debounceTimeoutInMs);

  const handleChange = (text: string) => {
    setValue(text);
    debouncedChangeHandler(text);
  };

  // Reset the value if the state in the store has changed
  React.useEffect(
    () => setValue(state.text),
    [state.text],
  );

  return (
    <Form
      title="Form Generator"
      actions={actions}
      className={styles.container}
      fieldsClassName={styles.fields}
    >
      <TextArea
        className={styles.textarea}
        value={value}
        label="Describe your form in JSON"
        placeholder={JSON.stringify(placeholder, null, 2)}
        rows={15}
        onChange={handleChange}
      />
      <FormError testId="FormParserError" className={styles.error}>{state.error}</FormError>
    </Form>
  );
}
