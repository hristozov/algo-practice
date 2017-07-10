import { expect } from 'chai';
import { BinarySearchTree } from './bst';

/* tslint:disable:no-unused-expression */

describe('BinarySearchTree', () => {
  function createAscNumericTree(): BinarySearchTree<number> {
    function ascComparator(t1: number, t2: number) {
      if (t1 > t2) {
        return 1;
      } else if (t1 < t2) {
        return -1;
      } else {
        return 0;
      }
    }

    return new BinarySearchTree<number>(ascComparator);
  }

  describe('#add', () => {
    it('adds values', () => {
      const tree = createAscNumericTree();

      expect(tree.contains(1)).to.be.false;

      tree.add(1);

      expect(tree.contains(1)).to.be.true;
    });
  });

  describe('#contains?', () => {
    it('is false for empty tress', () => {
      const tree = createAscNumericTree();
      expect(tree.contains(1)).to.be.false;
    });

    it('is false for trees which do not contain the element', () => {
      const tree = createAscNumericTree().add(5).add(2).add(3).add(8);

      expect(tree.contains(1)).to.be.false;
      expect(tree.contains(4)).to.be.false;
      expect(tree.contains(9)).to.be.false;
    });
  });
});
