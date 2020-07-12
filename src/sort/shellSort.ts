import { cloneArray } from '../util';

import { Comparator, ISort } from './sort';

const GAPS = [127, 63, 31, 15, 7, 3, 1]; // Hibbard, 2^k - 1

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
