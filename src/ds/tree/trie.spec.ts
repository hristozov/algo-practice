import { expect } from 'chai';

import { Trie } from './trie';

/* tslint:disable:no-inferred-empty-object-type */

describe('Trie', () => {
  describe('#add', () => {
    it('add to an empty trie', () => {
      expect(new Trie()
               .add('cat', 15)
               .list())
        .to.eql({cat: 15});
    });

    it('adds multiple values', () => {
      expect(new Trie()
               .add('bar', 1)
               .add('cat', 15)
               .add('dog', 3)
               .add('foo', 2)
               .list())
        .to.eql({
                  bar: 1,
                  cat: 15,
                  dog: 3,
                  foo: 2,
                });
    });

    it('updates existing values', () => {
      expect(new Trie()
               .add('bar', 1)
               .add('bar', 15)
               .list())
        .to.eql({
                  bar: 15,
                });
    });

    it('works with prefixes', () => {
      expect(new Trie()
               .add('b', 2)
               .add('bar', 4)
               .add('ba', 3)
               .list())
        .to.eql({
                  b: 2,
                  ba: 3,
                  bar: 4,
                });
    });
  });

  describe('#contains', () => {
    it('works with a trie with multiple values', () => {
      const trie = new Trie()
        .add('bar', 1)
        .add('cat', 15)
        .add('dog', 3)
        .add('foo', 2);
      expect(trie.contains('bar')).to.eq(true);
      expect(trie.contains('cat')).to.eq(true);
      expect(trie.contains('dog')).to.eq(true);
      expect(trie.contains('foo')).to.eq(true);

      expect(trie.contains('baz')).to.eq(false);
      expect(trie.contains('zar')).to.eq(false);
    });
  });

  describe('#remove', () => {
    it('works with a trie with a single value', () => {
      expect(new Trie()
               .add('bar', 2)
               .remove('bar')
               .list())
        .to.eql({});
    });

    it('works with a trie with multiple values', () => {
      expect(new Trie()
               .add('bar', 2)
               .add('foo', 4)
               .remove('bar')
               .remove('foo')
               .list())
        .to.eql({});
    });

    it('works with prefixes', () => {
      const trie = new Trie()
        .add('b', 2)
        .add('bar', 4)
        .add('ba', 3);

      trie.remove('b');
      expect(trie.list()).to.eql({ba: 3, bar: 4});

      trie.remove('ba');
      expect(trie.list()).to.eql({bar: 4});
    });
  });
});
