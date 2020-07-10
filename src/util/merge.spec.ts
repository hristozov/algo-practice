import { expect } from 'chai';

import { merge } from './merge';

/* tslint:disable:no-any no-unused-expression no-inferred-empty-object-type */

describe('range', () => {
  it('merges two objects', () => {
    const a: any = {foo: 1};
    const b: any = {bar: 5};

    expect(merge(a, b)).to.eq(a);

    expect(a.foo).to.eq(1);
    expect(a.bar).to.eq(5);
    expect(b.foo).to.be.undefined;
    expect(b.bar).to.eq(5);
  });
});
