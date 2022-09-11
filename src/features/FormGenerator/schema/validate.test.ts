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
      it('should parse a full configured textarea', async () => {
        const config = {
          items: [
            {
              type: InputType.textarea,
              name: 'contacts',
              label: 'Contacts',
              disabled: true,
            },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toEqual(config);
        expect(actual.errors).toHaveLength(0);
      });

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
      it('should parse a full configured textfield', async () => {
        const config = {
          items: [
            {
              type: InputType.textfield,
              name: 'name',
              label: 'Full Name',
              disabled: false,
            },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toEqual(config);
        expect(actual.errors).toHaveLength(0);
      });

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

    describe('checkbox', () => {
      it('should parse a full configured checkbox', async () => {
        const config = {
          items: [
            {
              type: InputType.checkbox,
              name: 'subscribe',
              label: 'Send me spam',
              disabled: true,
            },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toEqual(config);
        expect(actual.errors).toHaveLength(0);
      });

      it('should require a label of a checkbox', async () => {
        const config = {
          items: [
            { type: InputType.checkbox },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toBeNull();
        expect(actual.errors).toContain(
          "Form/items/0 must have required property 'label'",
        );
      });
    });

    describe('radiogroup', () => {
      it('should parse a full configured radiogroup', async () => {
        const config = {
          items: [
            {
              type: InputType.radiogroup,
              label: 'Radio',
              name: 'hehe',
              options: [
                { value: 'foo', caption: 'Foo' },
                { value: 'bar', caption: 'Bar' },
              ],
              disabled: false,
            },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toEqual(config);
        expect(actual.errors).toHaveLength(0);
      });

      it('should not require a label of a radiogroup', async () => {
        const config = {
          items: [
            {
              type: InputType.radiogroup,
              options: [
                { value: 'foo', caption: 'Foo' },
                { value: 'bar', caption: 'Bar' },
              ],
              disabled: false,
            },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toEqual(config);
        expect(actual.errors).toHaveLength(0);
      });

      it('should require options of radiogroup', async () => {
        const config = {
          items: [
            { type: InputType.radiogroup, label: 'Radio' },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toBeNull();
        expect(actual.errors).toContain("Form/items/0 must have required property 'options'");
      });

      it('should require at least two options of radiogroup', async () => {
        const config = {
          items: [
            {
              type: InputType.radiogroup,
              label: 'Radio',
              options: [
                { value: 'foo', caption: 'Foo' },
              ],
            },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toBeNull();
        expect(actual.errors).toContain('Form/items/0/options must NOT have fewer than 2 items');
      });

      it('should require a value in radiogroup option', async () => {
        const config = {
          items: [
            {
              type: InputType.radiogroup,
              options: [
                { value: 'foo', caption: 'Foo' },
                { caption: 'Bar' },
              ],
            },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toBeNull();
        expect(actual.errors).toContain("Form/items/0/options/1 must have required property 'value'");
      });

      it('should require a caption in radiogroup option', async () => {
        const config = {
          items: [
            {
              type: InputType.radiogroup,
              options: [
                { value: 'foo', caption: 'Foo' },
                { value: 'bar' },
              ],
            },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toBeNull();
        expect(actual.errors).toContain("Form/items/0/options/1 must have required property 'caption'");
      });
    });

    describe('numberfield', () => {
      it('should parse a full configured numberfield', async () => {
        const config = {
          items: [
            {
              type: InputType.numberfield,
              name: 'count',
              label: 'Count',
              disabled: true,
            },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toEqual(config);
        expect(actual.errors).toHaveLength(0);
      });

      it('should allow empty label of a number field', async () => {
        const config = {
          items: [
            { type: InputType.numberfield },
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

    describe('datefield', () => {
      it('should parse a full configured datefield', async () => {
        const config = {
          items: [
            {
              type: InputType.datefield,
              name: 'birthday',
              label: 'Your birthday',
              disabled: false,
            },
          ],
          actions: [
            { type: ActionType.submit, text: 'Preview' },
          ],
        };

        const actual = validate(config);

        expect(actual.data).toEqual(config);
        expect(actual.errors).toHaveLength(0);
      });

      it('should allow empty label of a date field', async () => {
        const config = {
          items: [
            { type: InputType.datefield },
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
