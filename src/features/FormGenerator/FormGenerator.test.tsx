import React from 'react';
import {
  fireEvent, render, screen, Screen,
} from '@testing-library/react';
import { FormGenerator } from './FormGenerator';
import { ActionType, InputType } from '../../shared/types/form';

const expectDefaultFormToBePresented = (screen: Screen) => {
  expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Full Name' })).toBeInTheDocument();
  expect(screen.getByLabelText('Onboarding Date')).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Bio' })).toBeInTheDocument();
  expect(
    screen.getByRole('checkbox', { name: 'I agree to defined terms and policies' }),
  ).toBeInTheDocument();
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
});
