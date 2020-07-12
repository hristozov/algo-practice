import { cloneArray, range } from '../util';

import { Comparator, ISort } from './sort';

export class InsertSort<T> implements ISort<T> {
  public sort(t: T[], comparator: Comparator<T>): T[] {
    const result = cloneArray(t);
    for (const i of range(1, result.length)) {
      let j = i;
      while (j > 0 && comparator(result[j - 1], result[j]) > 0) {
        const tmp = result[j];
        result[j] = result[j - 1];
        result[j - 1] = tmp;
        j -= 1;
      }
    }

    return result;
  }
}
