import React from 'react';
import { render, screen } from '@testing-library/react';
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
      it('should render textarea without label', () => {
        const schema: IForm = {
          items: [
            { type: InputType.textarea, label: '' },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('textbox', { name: '' })).toBeInTheDocument();
      });

      it('should render textarea with label', () => {
        const schema: IForm = {
          items: [
            { type: InputType.textarea, label: 'Description' },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('textbox', { name: 'Description' })).toBeInTheDocument();
      });
    });

    describe('text field', () => {
      it('should render text field without label', () => {
        const schema: IForm = {
          items: [
            { type: InputType.textfield, label: '' },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('textbox', { name: '' })).toBeInTheDocument();
      });

      it('should render text field with label', () => {
        const schema: IForm = {
          items: [
            { type: InputType.textfield, label: 'Full Name' },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('textbox', { name: 'Full Name' })).toBeInTheDocument();
      });
    });

    describe('number field', () => {
      it('should render text number without label', () => {
        const schema: IForm = {
          items: [
            { type: InputType.numberfield },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('spinbutton', { name: '' })).toBeInTheDocument();
      });

      it('should render number field with label', () => {
        const schema: IForm = {
          items: [
            { type: InputType.numberfield, label: 'Salary' },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('spinbutton', { name: 'Salary' })).toBeInTheDocument();
      });
    });

    describe('checkbox', () => {
      it('should render checkbox with label', () => {
        const schema: IForm = {
          items: [
            { type: InputType.checkbox, label: 'Subscribe' },
          ],
          actions: [],
        };

        render(<FormBuilder schema={schema} />);

        expect(screen.getByRole('checkbox', { name: 'Subscribe' })).toBeInTheDocument();
      });
    });
  });
});
