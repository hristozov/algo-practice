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

  it('works when the first object is nil', () => {
    expect(merge(null, {foo: 'bar'})).to.eq(null);
  });

  it('works when the first object is nil', () => {
    const a: any = {foo: 1};

    expect(merge(a, null)).to.eq(a);

    expect(a.foo).to.eq(1);
  });
});
