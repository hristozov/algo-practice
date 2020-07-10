import { cloneArray, range } from "../util";

import { Comparator, ISort } from "./sort";

export class QuickSort<T> implements ISort<T> {
  public sort(t: T[], comparator: Comparator<T>): T[] {
    const sorted = cloneArray(t);

    let didSwap;
    do {
      didSwap = false;
      for (const i of range(1, sorted.length)) {
        if (comparator(sorted[i - 1], sorted[i]) > 0) {
          this.swap(sorted, i - 1, i);
          didSwap = true;
        }
      }
    } while (didSwap);

    return sorted;
  }

  private swap(target: T[], idx1: number, idx2: number): void {
    const tmp = target[idx1];
    target[idx1] = target[idx2];
    target[idx2] = tmp;
  }
}
