import { afterEach, beforeEach, afterAll, beforeAll, describe, expect, test } from '@jest/globals';

// import { IController } from "../app/src/interfaces/interface_controlers.ts";
// import { ctrlWrapper } from '../app/src/utils/ctrlWrapper.ts';
// import { NextFunction } from 'express-serve-static-core';

import { parseNumber } from '../app/src/utils/parsePaginationParams.ts';
import { calculatePaginationData } from '../app/src/utils/calculatePaginationData.ts';

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
  test('parse number: 6', () => {
    expect(parseNumber('6', 5)).toBe(6);
  });
  test('parse number: NaN', () => {
    expect(parseNumber('a', 5)).toBe(5);
  });
  test('parse number: number 8', () => {
    expect(parseNumber(8, 5)).toBe(5);
  });
  test('parse number: number -6', () => {
    expect(parseNumber(-6, 5)).toBe(5);
  });
  test('parse number: -6', () => {
    expect(parseNumber('-6', 5)).toBe(5);
  });
});

describe('pagination data', () => {
  test('sacsses', () => {
    console.log(
      JSON.stringify({
        page: 2,
        perPage: 10,
        totalItems: 100,
        totalPages: 10,
        hasPrevPage: true,
        hasNextPage: true,
      })
    );

    expect(calculatePaginationData(100, 2, 10).page).toBe(2);
    expect(calculatePaginationData(100, 2, 10).perPage).toBe(10);
    expect(calculatePaginationData(100, 2, 10).totalItems).toBe(100);
    expect(calculatePaginationData(100, 2, 10).totalPages).toBe(10);
    expect(calculatePaginationData(100, 2, 10).hasPrevPage).toBeTruthy();
  });
});
