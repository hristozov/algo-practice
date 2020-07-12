import { cloneArray } from '../util';

import { Comparator, ISort } from './sort';

/**
 * 2^k - 1, Hibbard (1963)
 */
const GAPS = [
  1048575,
  524287,
  262143,
  131071,
  65535,
  32767,
  16383,
  8191,
  4095,
  2047,
  1023,
  511,
  255,
  127,
  63,
  31,
  15,
  7,
  3,
  1,
];

/**
 * Implementation of Shellsort.
 *
 * Inner loop uses insertion sort.
 *
 * https://en.wikipedia.org/wiki/Shellsort
 */
export class ShellSort<T> implements ISort<T> {
  public sort(t: T[], comparator: Comparator<T>): T[] {
    const result = cloneArray(t);
    for (const gap of GAPS) {
      for (let i = gap; i < result.length; i += 1) {
        const temp = result[i];
        let j;
        for (
          j = i;
          j >= gap && comparator(result[j - gap], temp) > 0;
          j -= gap
        ) {
          result[j] = result[j - gap];
        }
        result[j] = temp;
      }
    }

    return result;
  }
}
