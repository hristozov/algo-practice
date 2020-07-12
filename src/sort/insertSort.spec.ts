import { InsertSort } from './insertSort';
import { numericSort } from './numericSort.spec';

describe('InsertSort', () => {
  numericSort(InsertSort);
});
