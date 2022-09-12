import React from 'react';
import {
  fireEvent, render, screen, Screen,
} from '@testing-library/react';
import { FormGenerator } from './FormGenerator';
import { ActionType, InputType } from './types/form';
import { defaultSchema } from './model';

const expectDefaultFormToBePresented = (screen: Screen) => {
  expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();

  const textField = screen.getByRole('textbox', { name: 'Full Name' });
  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('name', 'name');

  const dateField = screen.getByLabelText('Onboarding Date');
  expect(dateField).toBeInTheDocument();
  expect(dateField).toHaveAttribute('name', 'onboarding');

  const textarea = screen.getByRole('textbox', { name: 'Bio' });
  expect(textarea).toBeInTheDocument();
  expect(textarea).toHaveAttribute('name', 'bio');

  const checkbox = screen.getByRole('checkbox', { name: 'I agree to defined terms and policies' });
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveAttribute('name', 'terms');

  expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
};

const formJsonInputLabel = 'Describe your form in JSON';

describe('features/FormGenerator', () => {
  it('should render example form by default', () => {
    render(<FormGenerator />);

    expectDefaultFormToBePresented(screen);
  });

  it('should render error but not rerender form when text is not a valid JSON', () => {
    const value = '{"title":"hello';
    const expectedError = 'Unexpected end of JSON input';

    render(<FormGenerator />);
    fireEvent.change(
      screen.getByLabelText(formJsonInputLabel),
      { target: { value } },
    );

    expect(screen.getByText(expectedError)).toBeInTheDocument();
    expectDefaultFormToBePresented(screen);
  });

  it('should render error but not rerender form when user JSON does not match schema', () => {
    const value = JSON.stringify({
      items: [{ label: 'hello' }],
      actions: [],
    });
    const expectedError = "Form/items/0 must have required property 'type'";

    render(<FormGenerator />);
    fireEvent.change(
      screen.getByLabelText(formJsonInputLabel),
      { target: { value } },
    );

    expect(screen.getByText(expectedError)).toBeInTheDocument();
    expectDefaultFormToBePresented(screen);
  });

  it('should render user defined form if it is valid', () => {
    const value = JSON.stringify({
      items: [{ type: InputType.textarea, label: 'Hey' }],
      actions: [{ type: ActionType.button, text: 'Greet' }],
    });

    render(<FormGenerator />);
    fireEvent.change(
      screen.getByLabelText(formJsonInputLabel),
      { target: { value } },
    );

    expect(screen.getByRole('textbox', { name: 'Hey' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Greet' })).toBeInTheDocument();
  });

  it('should not rerender the form and not render any errors on empty input', () => {
    const value = '  ';

    render(<FormGenerator />);
    fireEvent.change(
      screen.getByLabelText(formJsonInputLabel),
      { target: { value } },
    );

    expectDefaultFormToBePresented(screen);
    expect(screen.getByTestId('FormParserError')).toBeEmptyDOMElement();
  });

  it('should reset all state to the default example when a user hit the Reset button', () => {
    const userValue = '"';

    render(<FormGenerator />);
    fireEvent.change(
      screen.getByLabelText(formJsonInputLabel),
      { target: { value: userValue } },
    );
    expect(screen.getByText('Unexpected end of JSON input')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Example' }));
    const actual = JSON.parse(screen.getByLabelText<HTMLTextAreaElement>(formJsonInputLabel).value);

    expect(actual).toEqual(defaultSchema);
    expectDefaultFormToBePresented(screen);
    expect(screen.getByTestId('FormParserError')).toBeEmptyDOMElement();
  });

  it('should clear all state when a user hit the Clear button', () => {
    render(<FormGenerator />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(screen.getByLabelText(formJsonInputLabel)).toHaveValue('');
    expect(screen.getByTestId('FormParserError')).toBeEmptyDOMElement();
    expect(screen.getByTestId('FormBuilder')).toBeEmptyDOMElement();
  });

  it('should prettify JSON when a user hit the Prettify button', () => {
    const userForm = {
      items: [{ type: InputType.textfield, label: 'City' }],
      actions: [{ type: ActionType.submit, text: 'Relocate' }],
    };
    const prettyValue = JSON.stringify(userForm, null, 2);

    render(<FormGenerator />);
    fireEvent.change(
      screen.getByLabelText(formJsonInputLabel),
      { target: { value: JSON.stringify(userForm) } },
    );
    fireEvent.click(screen.getByRole('button', { name: 'Prettify' }));

    expect(screen.getByTestId('FormParserError')).toBeEmptyDOMElement();
    expect(screen.getByRole('textbox', { name: 'City' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Relocate' })).toBeInTheDocument();
    expect(screen.getByLabelText(formJsonInputLabel)).toHaveValue(prettyValue);
  });
});
