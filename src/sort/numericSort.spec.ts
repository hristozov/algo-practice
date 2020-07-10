import { expect } from 'chai';

import { ISort } from './sort';

/* tslint:disable:no-unused-expression */

export function numericSort(klass: new () => ISort<number>) {
  function ascComparator(t1: number, t2: number) {
    if (t1 > t2) {
      return 1;
    } else if (t1 < t2) {
      return -1;
    } else {
      return 0;
    }
  }

  function descComparator(t1: number, t2: number) {
    if (t1 > t2) {
      return -1;
    } else if (t1 < t2) {
      return 1;
    } else {
      return 0;
    }
  }

  let sorter: ISort<number>;

  beforeEach(() => {
    sorter = new klass();
  });

  it('sorts empty arrays', () => {
    expect(sorter.sort([], ascComparator))
      .to.be.empty;
  });

  it('sorts arrays with one element', () => {
    expect(sorter.sort([1], ascComparator))
      .to.deep.equal([1]);
  });

  it('sorts basic numeric arrays', () => {
    expect(sorter.sort([1, 7, -5, 4, 0, 9, 2], ascComparator))
      .to.deep.equal([-5, 0, 1, 2, 4, 7, 9]);
  });

  it('sorts basic numeric arrays in descending order', () => {
    expect(sorter.sort([1, 7, -5, 4, 0, 9, 2], descComparator))
      .to.deep.equal([9, 7, 4, 2, 1, 0, -5]);
  });
}
