import { BinaryHeap } from '../ds/tree/binaryHeap';

import { Comparator, ISort } from './sort';

export class HeapSort<T> implements ISort<T> {
  public sort(t: T[], comparator: Comparator<T>): T[] {
    const heap = t.reduce((res, current) => res.add(current),
                          new BinaryHeap(comparator));

    const result = [];
    while (!heap.isEmpty()) {
      const first = heap.first();
      if (first !== null) {
        result.push(first);
      }

      heap.removeFirst();
    }

    return result;
  }
}
