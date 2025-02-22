import { afterEach, beforeEach, afterAll, beforeAll, describe, expect, test } from '@jest/globals';

// import { IController } from "../app/src/interfaces/interface_controlers.ts";
// import { ctrlWrapper } from '../app/src/utils/ctrlWrapper.ts';
// import { NextFunction } from 'express-serve-static-core';

describe('hooks', function () {
  beforeAll(() => {
    console.log('Виконати на початку тестів');
  });

  afterAll(() => {
    console.log('Виконати після тестів');
  });

  beforeEach(() => {
    console.log('Виконати на початку кожного тесту');
  });

  afterEach(() => {
    console.log('Виконати наприкінці кожного тесту');
  });

  test('1 + 2 to equal 1', () => {
    console.log('1 + 2 to equal 1');
    expect(1 + 2).toBe(3);
  });
  test('ctrlWrapper test', () => {
    console.log('test wrapper for controllers');
    // const callback: IController = async (req, res, next) => {
    //     console.log('In  callback');
    // };
    // const req: Request = ;
    // let res: Response;
    // let next: NextFunction;
    // expect(ctrlWrapper(callback)(req, res, next)).toBeCalled();
  });
});
