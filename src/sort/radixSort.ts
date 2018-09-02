import { range } from '../util';

/**
 * LSD radix sort implementation.
 *
 * {@link https://en.wikipedia.org/wiki/Radix_sort}
 */
export class RadixSort {
  private static getMax(numbers: number[]): number {
    let maxIdx = 0;
    for (let idx = 1; idx < numbers.length; idx++) {
      if (numbers[idx] >= numbers[maxIdx]) {
        maxIdx = idx;
      }
    }

    return numbers[maxIdx];
  }

  public sort(numbers: number[], base: number): number[] {
    if (numbers.length === 0) {
      return [];
    }
    const maxElement = RadixSort.getMax(numbers);

    let currentList = numbers; // The current state of the sort.
    let currentDigitIdx = 0; // The index of the current digit, from the right.
    while (base ** currentDigitIdx <= maxElement) {
      // Initialize buckets for each digit of the base.
      const buckets: number[][] = [];
      for (const i of range(0, base)) {
        buckets[i] = [];
      }

      currentList.forEach((element) => {
        // Find the target bucket and add the element there.
        const bucketIdx = Math.floor(element / (base ** currentDigitIdx)) % base;
        buckets[bucketIdx].push(element);
      });

      // Now, join the buckets for the current iteration.
      currentList = buckets.reduce((result, bucket) => result.concat(bucket), []);

      currentDigitIdx++;
    }

    return currentList;
  }
}
