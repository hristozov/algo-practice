import { expect } from 'chai';
import { range } from './range';

/* tslint:disable:no-unused-expression */

describe('range', () => {
  function toArray<T>(iterator: IterableIterator<T>): T[] {
    const result = [];
    for (const x of iterator) {
      result.push(x);
    }
    return result;
  }

  it('produces proper ranges', () => {
    expect(toArray(range(1, 10))).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('handles the case where start=end', () => {
    expect(toArray(range(5, 5))).to.be.empty;
  });

  it('handles the case where start>end', () => {
    expect(toArray(range(10, 9))).to.be.empty;
  });
});
