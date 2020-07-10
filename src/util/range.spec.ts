import { expect } from 'chai';

import { range } from './range';
import { toArray } from './toArray';

/* tslint:disable:no-unused-expression */

describe('range', () => {
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
