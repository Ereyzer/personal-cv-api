import { afterAll, beforeAll, expect, test, describe, jest } from '@jest/globals';

import { isLinkedinLink } from '../app/src/validation/validators';
import Joi from 'joi';

describe('hooks', function () {
  beforeAll(() => {
    console.log('start testing validators');
  });
  afterAll(() => {
    console.log('End testing validators');
  });

  const errMethod: (
    code: string,
    local?: Joi.Context,
    localState?: Joi.State
  ) => Joi.ErrorReport = (code, context) => {
    if (context && context.message) {
      throw new Joi.ValidationError(context.message, [], '');
    } else {
      throw new Joi.ValidationError('Validation error', [], '');
    }
  };
  const helpers = {
    error: jest.fn(errMethod),
  } as unknown as Joi.CustomHelpers;

  test('linkedin link saccess', () => {
    const link = 'https://www.linkedin.com/in/some-user-s7dujew9/';
    expect(isLinkedinLink(link, helpers)).toBe(link);
  });

  test('linkedin link error', () => {
    const link = 'https://www.com/in/some-user-s7dujew9/';
    expect(() => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

      isLinkedinLink(link, helpers);
    }).toThrowError(Joi.ValidationError);
    // Check if helpers.error was called
    expect(helpers.error).toHaveBeenCalledWith('any.custom', { message: 'invalid linkedin uri' });
  });
});
