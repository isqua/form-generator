import { ActionType, IForm, InputType } from '../../../shared/types/form';
import { validate } from './validate';

describe('features/FormGenerator/schema/validate', () => {
  describe('basic', () => {
    it('should allow usual form', async () => {
      const config: IForm = {
        title: 'Generate a Form',
        items: [
          { type: InputType.textarea, label: 'Form Config' },
        ],
        actions: [
          { type: ActionType.submit, text: 'Preview' },
        ],
      };

      const actual = validate(config);

      expect(actual.errors).toHaveLength(0);
      expect(actual.data).toEqual(config);
    });

    it('should allow form without title', async () => {
      const config: IForm = {
        items: [
          { type: InputType.textarea, label: 'Form Config' },
        ],
        actions: [
          { type: ActionType.submit, text: 'Preview' },
        ],
      };

      const actual = validate(config);

      expect(actual.errors).toHaveLength(0);
      expect(actual.data).toEqual(config);
    });

    it('should require items field', async () => {
      const config: Partial<IForm> = {
        actions: [
          { type: ActionType.submit, text: 'Preview' },
        ],
      };

      const actual = validate(config);

      expect(actual.data).toBeNull();
      expect(actual.errors).toEqual([
        "Form must have required property 'items'",
      ]);
    });

    it('should require actions field', async () => {
      const config: Partial<IForm> = {
        items: [
          { type: InputType.textarea, label: 'Form Config' },
        ],
      };

      const actual = validate(config);

      expect(actual.data).toBeNull();
      expect(actual.errors).toHaveLength(1);
      expect(actual.errors).toEqual([
        "Form must have required property 'actions'",
      ]);
    });

    it('should require at least one input', async () => {
      const config: IForm = {
        items: [],
        actions: [
          { type: ActionType.submit, text: 'Preview' },
        ],
      };

      const actual = validate(config);

      expect(actual.data).toBeNull();
      expect(actual.errors).toHaveLength(1);
      expect(actual.errors).toEqual([
        'Form/items must NOT have fewer than 1 items',
      ]);
    });

    it('should require at least one action', async () => {
      const config: IForm = {
        items: [
          { type: InputType.textarea, label: 'Form Config' },
        ],
        actions: [],
      };

      const actual = validate(config);

      expect(actual.data).toBeNull();
      expect(actual.errors).toHaveLength(1);
      expect(actual.errors).toEqual([
        'Form/actions must NOT have fewer than 1 items',
      ]);
    });
  });

  describe('fields', () => {
    it('should require the type of an input', async () => {
      const config = {
        items: [
          { label: 'Form Config' },
        ],
        actions: [
          { type: ActionType.submit, text: 'Preview' },
        ],
      };

      const actual = validate(config);

      expect(actual.data).toBeNull();
      expect(actual.errors).toHaveLength(1);
      expect(actual.errors).toEqual([
        "Form/items/0 must have required property 'type'",
      ]);
    });

    describe('textarea', () => {
      it('should allow empty label of a textarea', async () => {
        const config = {
          items: [
            { type: InputType.textarea },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toEqual(config);
        expect(actual.errors).toHaveLength(0);
      });
    });

    describe('textfield', () => {
      it('should allow empty label of a text field', async () => {
        const config = {
          items: [
            { type: InputType.textfield },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toEqual(config);
        expect(actual.errors).toHaveLength(0);
      });
    });
  });
});
