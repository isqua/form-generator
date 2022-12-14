import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ActionType, InputType, IForm } from '../../types/form';
import { FormBuilder } from './FormBuilder';

describe('features/FormGenerator/widgets/FormBuilder', () => {
  describe('basic render', () => {
    it('should render simple form', () => {
      const schema: IForm = {
        title: 'hello',
        items: [
          { type: InputType.textarea, label: 'City' },
        ],
        actions: [
          { type: ActionType.submit, text: 'Apply' },
        ],
      };

      render(<FormBuilder schema={schema} />);

      expect(screen.getByRole('heading', { name: 'hello' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'City' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
    });

    it('should render multiple fields', () => {
      const schema: IForm = {
        items: [
          { type: InputType.textarea, label: 'Bio' },
          { type: InputType.textarea, label: 'City' },
          { type: InputType.textarea, label: 'Contacts' },
        ],
        actions: [],
      };

      render(<FormBuilder schema={schema} />);

      expect(screen.getByRole('textbox', { name: 'Bio' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'City' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Contacts' })).toBeInTheDocument();
    });

    it('should render multiple actions', () => {
      const schema: IForm = {
        items: [],
        actions: [
          { type: ActionType.submit, text: 'Apply' },
          { type: ActionType.reset, text: 'Reset' },
          { type: ActionType.button, text: 'Show example' },
        ],
      };

      render(<FormBuilder schema={schema} />);

      expect(screen.getByRole('button', { name: 'Apply' })).toHaveAttribute('type', 'submit');
      expect(screen.getByRole('button', { name: 'Reset' })).toHaveAttribute('type', 'reset');
      expect(screen.getByRole('button', { name: 'Show example' })).toHaveAttribute('type', 'button');
    });
  });

  describe('fields', () => {
    describe('textarea', () => {
      it('should render fully configured textarea', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.textarea,
              name: 'description',
              label: 'Description',
              placeholder: 'write something inspiring',
              value: 'Hello',
              disabled: false,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const control = screen.getByRole('textbox', { name: 'Description' });

        expect(control).toBeInTheDocument();
        expect(control).toHaveAttribute('name', 'description');
        expect(control).toHaveValue('Hello');
        expect(control).toBeEnabled();
        expect(control).toStrictEqual(screen.getByPlaceholderText('write something inspiring'));
      });

      it('should render disabled textarea if disabled property is true', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.textarea,
              disabled: true,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('textbox')).toBeDisabled();
      });

      it('should render a textarea with required properties only', () => {
        const schema: IForm = {
          items: [
            { type: InputType.textarea },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('textbox', { name: '' })).toBeInTheDocument();
      });
    });

    describe('text field', () => {
      it('should render fully configured text field', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.textfield,
              name: 'full_name',
              label: 'Full Name',
              disabled: false,
              placeholder: 'Walter Gropius',
              value: 'Peter Behrens',
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const control = screen.getByRole('textbox', { name: 'Full Name' });
        expect(control).toBeInTheDocument();
        expect(control).toHaveAttribute('name', 'full_name');
        expect(control).toHaveValue('Peter Behrens');
        expect(control).toBeEnabled();
        expect(control).toStrictEqual(screen.getByPlaceholderText('Walter Gropius'));
      });

      it('should render disabled text field if disabled property is true', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.textfield,
              disabled: true,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('textbox')).toBeDisabled();
      });

      it('should render text field with required properties only', () => {
        const schema: IForm = {
          items: [
            { type: InputType.textfield },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('textbox', { name: '' })).toBeInTheDocument();
      });
    });

    describe('number field', () => {
      it('should render fully configured number field', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.numberfield,
              name: 'salary',
              label: 'Salary',
              placeholder: 'Desired net salary in USD',
              value: 8600,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const control = screen.getByRole('spinbutton', { name: 'Salary' });
        expect(control).toBeInTheDocument();
        expect(control).toHaveAttribute('name', 'salary');
        expect(control).toHaveValue(8600);
        expect(control).toStrictEqual(screen.getByPlaceholderText('Desired net salary in USD'));
      });

      it('should render disabled number field if disabled property is true', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.numberfield,
              disabled: true,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);
        expect(screen.getByRole('spinbutton')).toBeDisabled();
      });

      it('should render number field with required properties only', () => {
        const schema: IForm = {
          items: [
            { type: InputType.numberfield },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('spinbutton', { name: '' })).toBeInTheDocument();
      });
    });

    describe('date field', () => {
      it('should render fully configured date field', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.datefield,
              name: 'onboarding',
              value: '1919-04-12',
              label: 'Onboarding Date',
              disabled: false,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const control = screen.getByLabelText('Onboarding Date');
        expect(control).toBeInTheDocument();
        expect(control).toHaveAttribute('name', 'onboarding');
        expect(control).toHaveValue('1919-04-12');
        expect(control).toBeEnabled();
      });

      it('should render disabled date field if disabled property is true', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.datefield,
              label: 'date',
              disabled: true,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);
        expect(screen.getByLabelText('date')).toBeDisabled();
      });

      it('should render date field with required properties only', () => {
        const schema: IForm = {
          items: [
            { type: InputType.datefield },
          ],
          actions: [],
        };

        const { container } = render(<FormBuilder schema={schema} />);

        expect(container.querySelector('input[type=date]')).toBeInTheDocument();
      });
    });

    describe('checkbox', () => {
      it('should render fully configured checkbox', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.checkbox,
              name: 'subscription',
              value: 'yes',
              label: 'Subscribe',
              disabled: false,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const control = screen.getByRole('checkbox', { name: 'Subscribe' });
        expect(control).toBeInTheDocument();
        expect(control).toHaveAttribute('name', 'subscription');
        expect(control).toHaveAttribute('value', 'yes');
        expect(control).toBeEnabled();
      });

      it('should render disabled checkbox if disabled property is true', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.checkbox,
              label: 'Check me if you can',
              disabled: true,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);
        expect(screen.getByRole('checkbox')).toBeDisabled();
      });

      it('should render checked checkbox if checked property is true', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.checkbox,
              label: 'Check me if you can',
              checked: true,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);
        expect(screen.getByRole('checkbox')).toBeChecked();
      });

      it('should render a checkbox with required properties only', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.checkbox,
              label: 'Subscribe',
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('checkbox', { name: 'Subscribe' })).toBeInTheDocument();
      });
    });

    describe('radio group', () => {
      it('should render fully configured radio group', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.radiogroup,
              name: 'hardchoice',
              label: 'Radio',
              options: [
                { value: 'foo', caption: 'Foo' },
                { value: 'bar', caption: 'Bar' },
              ],
              disabled: false,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const fooOption = screen.getByRole('radio', { name: 'Foo' });
        const barOption = screen.getByRole('radio', { name: 'Bar' });
        expect(fooOption).toBeInTheDocument();
        expect(fooOption).toHaveAttribute('name', 'hardchoice');
        expect(fooOption).toBeEnabled();
        expect(barOption).toBeInTheDocument();
        expect(barOption).toHaveAttribute('name', 'hardchoice');
        expect(fooOption).toBeEnabled();

        fireEvent.click(screen.getByText('Foo'));
        expect(fooOption).toBeChecked();

        fireEvent.click(screen.getByText('Bar'));
        expect(barOption).toBeChecked();
        expect(fooOption).not.toBeChecked();
      });

      it('should render disabled radio group if disabled property is true', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.radiogroup,
              options: [
                { value: 'foo', caption: 'Foo' },
                { value: 'bar', caption: 'Bar' },
              ],
              disabled: true,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);
        expect(screen.getByRole('radio', { name: 'Foo' })).toBeDisabled();
        expect(screen.getByRole('radio', { name: 'Bar' })).toBeDisabled();
      });

      it('should check value in a radio group if an option has checked attribute', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.radiogroup,
              options: [
                { value: 'foo', caption: 'Foo' },
                { value: 'bar', caption: 'Bar', checked: true },
              ],
              disabled: true,
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('radio', { name: 'Bar' })).toBeChecked();
      });

      it('should render a radio group with required properties only', () => {
        const schema: IForm = {
          items: [
            {
              type: InputType.radiogroup,
              label: 'Radio',
              options: [
                { value: 'foo', caption: 'Foo' },
                { value: 'bar', caption: 'Bar' },
              ],
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const fooOption = screen.getByRole('radio', { name: 'Foo' });
        const barOption = screen.getByRole('radio', { name: 'Bar' });
        expect(fooOption).toBeInTheDocument();
        expect(barOption).toBeInTheDocument();

        fireEvent.click(screen.getByText('Foo'));
        expect(fooOption).toBeChecked();

        fireEvent.click(screen.getByText('Bar'));
        expect(barOption).toBeChecked();
        expect(fooOption).not.toBeChecked();
      });
    });
  });
});
