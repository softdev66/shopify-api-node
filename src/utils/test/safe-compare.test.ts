import { ShopifyError } from '../../error';
import safeCompare from '../safe-compare';

test('safeCompare returns correct boolean value for comparisons', () => {
  const valueA = 'some value';
  const valueB = 'some value';
  const valueC = 'some other value';

  expect(safeCompare(valueA, valueB)).toBe(true);
  expect(safeCompare(valueB, valueC)).toBe(false);
});
test('works on all appropriate data types (strings, arrays, objects)', () => {
  const string1 = 'string';
  const string2 = 'string';
  const stringResult = safeCompare(string1, string2);

  const array1 = [1, 2, 'fish'];
  const array2 = [1, 2, 'fish'];
  const arrayResult = safeCompare(array1, array2);

  const obj1 = { key: 'val' };
  const obj2 = { key: 'val' };
  const objResult = safeCompare(obj1, obj2);

  expect(stringResult).toBe(true);
  expect(arrayResult).toBe(true);
  expect(objResult).toBe(true);
});

test('args of different types throw ShopifyError', () => {
  const arg1 = 'hello';
  const arg2 = ['world'];

  expect(() => {
    safeCompare(arg1, arg2);
  }).toThrowError(ShopifyError);
  expect(() => {
    safeCompare(arg1, arg2);
  }).toThrow(/Mismatched data types provided:/);
});
