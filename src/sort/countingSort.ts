import { range } from '../util';

import { IBasicSort } from './sort';

export class CountingSort implements IBasicSort<number> {
  public sort(t: number[]): number[] {
    if (t.length === 0) {
      return [];
    }

    // First, find min and max.
    let min: number = t[0];
    let max: number = t[0];
    t.forEach((el) => {
      if (el < min) {
        min = el;
      }
      if (el > max) {
        max = el;
      }
    });

    // Maps values to their counts.
    const counter = t.reduce(
      (res, x) => res.set(x, (res.get(x) || 0) + 1),
      new Map<number, number>(),
    );

    // Now iterate [min;max] and expand the map.
    const result = [];
    for (const i of range(min, max + 1)) {
      // Add to the result as many times as needed.
      let remaining = counter.get(i) || 0;
      while (remaining > 0) {
        result.push(i);
        remaining -= 1;
      }
    }

    return result;
  }
}
