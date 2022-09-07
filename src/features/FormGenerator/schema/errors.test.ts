import { ErrorObject } from 'ajv';
import { formatErrors } from './errors';

describe('features/FormGenerator/schema/errors', () => {
  it('should return empty list when errors are undefined', () => {
    const actual = formatErrors(undefined);

    expect(actual).toEqual([]);
  });

  it('should return empty list when errors are null', () => {
    const actual = formatErrors(null);

    expect(actual).toEqual([]);
  });

  it('should format empty path as "Form"', () => {
    const error: ErrorObject = {
      instancePath: '',
      schemaPath: '#/required',
      keyword: 'required',
      params: { missingProperty: 'items' },
      message: "must have required property 'items'",
    };

    const actual = formatErrors([error]);

    expect(actual).toEqual(["Form must have required property 'items'"]);
  });

  it('should format root property as part of a form', () => {
    const error: ErrorObject = {
      instancePath: '/items',
      schemaPath: '#/properties/items/minItems',
      keyword: 'minItems',
      params: { limit: 1 },
      message: 'must NOT have fewer than 1 items',
    };

    const actual = formatErrors([error]);

    expect(actual).toEqual(['Form/items must NOT have fewer than 1 items']);
  });

  it('should format array item properly', () => {
    const error: ErrorObject = {
      instancePath: '/items/0',
      schemaPath: '#/properties/items/items/required',
      keyword: 'required',
      params: { missingProperty: 'type' },
      message: "must have required property 'type'",
    };

    const actual = formatErrors([error]);

    expect(actual).toEqual(["Form/items/0 must have required property 'type'"]);
  });
});
