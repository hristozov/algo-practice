import { expect } from 'chai';

import { RadixSort } from './radixSort';

/* tslint:disable:no-unused-expression */

describe('RadixSort', () => {
  let sorter: RadixSort;

  beforeEach(() => (sorter = new RadixSort()));

  describe('base 10', () => {
    it('sorts empty arrays', () => {
      expect(sorter.sort([], 10)).to.be.empty;
    });

    it('sorts arrays with one element', () => {
      expect(sorter.sort([42], 10)).to.deep.equal([42]);
    });

    it('sorts basic numeric arrays', () => {
      expect(sorter.sort([1, 7, 4, 0, 9, 2], 10)).to.deep.equal([
        0,
        1,
        2,
        4,
        7,
        9,
      ]);
    });
  });
});
