import { CountingSort } from './countingSort';
import { numericSort } from './numericSort.spec';

describe('CountingSort', () => {
  numericSort(CountingSort, false);
});
