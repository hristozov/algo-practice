import { BinaryHeap } from '../ds/tree/binary-heap';
import { ISort } from './sort';

export class HeapSort<T> implements ISort<T> {
  public sort(t: T[], comparator: (el1: T, el2: T) => number): T[] {
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
