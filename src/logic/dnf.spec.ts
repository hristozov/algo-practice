import { expect } from 'chai';
import { DisjunctiveNormalForm } from './dnf';

describe('DisjunctiveNormalForm', () => {
  function toExpression(fn: (...args: boolean[]) => boolean) {
    return new DisjunctiveNormalForm(fn).toExpression();
  }

  it('works with an identity', () => {
    const fn = (a: boolean): boolean => a;
    expect(toExpression(fn))
      .to.eql('a0');
  });

  it('works with a simple OR function of two arguments', () => {
    const fn = (a: boolean, b: boolean): boolean => a || b;
    expect(toExpression(fn))
      .to.eql('(!a0&&a1)||(a0&&!a1)||(a0&&a1)');
  });

  it('works with a simple AND function of two arguments', () => {
    const fn = (a: boolean, b: boolean): boolean => a && b;
    expect(toExpression(fn))
      .to.eql('(a0&&a1)');
  });
});
