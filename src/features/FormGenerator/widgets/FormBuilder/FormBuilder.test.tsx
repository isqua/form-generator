import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormBuilder } from './FormBuilder';
import { ActionType, InputType, IForm } from '../../../../shared/types/form';

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
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const control = screen.getByRole('textbox', { name: 'Description' });

        expect(control).toBeInTheDocument();
        expect(control).toHaveAttribute('name', 'description');
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
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const control = screen.getByRole('textbox', { name: 'Full Name' });
        expect(control).toBeInTheDocument();
        expect(control).toHaveAttribute('name', 'full_name');
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
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const control = screen.getByRole('spinbutton', { name: 'Salary' });
        expect(control).toBeInTheDocument();
        expect(control).toHaveAttribute('name', 'salary');
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
              label: 'Onboarding Date',
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const control = screen.getByLabelText('Onboarding Date');
        expect(control).toBeInTheDocument();
        expect(control).toHaveAttribute('name', 'onboarding');
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
              label: 'Subscribe',
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const control = screen.getByRole('checkbox', { name: 'Subscribe' });
        expect(control).toBeInTheDocument();
        expect(control).toHaveAttribute('name', 'subscription');
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
            },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        const fooOption = screen.getByRole('radio', { name: 'Foo' });
        const barOption = screen.getByRole('radio', { name: 'Bar' });
        expect(fooOption).toBeInTheDocument();
        expect(fooOption).toHaveAttribute('name', 'hardchoice');
        expect(barOption).toBeInTheDocument();
        expect(barOption).toHaveAttribute('name', 'hardchoice');

        fireEvent.click(screen.getByText('Foo'));
        expect(fooOption).toBeChecked();

        fireEvent.click(screen.getByText('Bar'));
        expect(barOption).toBeChecked();
        expect(fooOption).not.toBeChecked();
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
