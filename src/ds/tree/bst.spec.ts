import { expect } from "chai";

import { BinarySearchTree } from "./bst";

/* tslint:disable:no-unused-expression */

describe("BinarySearchTree", () => {
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

  describe("#add", () => {
    it("adds values", () => {
      const tree = createAscNumericTree();

      tree.add(1);

      expect(tree.ascending()).to.eql([1]);
    });

    it("does not fail when the value already exists", () => {
      const tree = createAscNumericTree().add(1);

      tree.add(1);

      expect(tree.ascending()).to.eql([1]);
    });
  });

  describe("#contains?", () => {
    it("is false for empty tress", () => {
      const tree = createAscNumericTree();
      expect(tree.contains(1)).to.be.false;
    });

    it("is false for trees which do not contain the element", () => {
      const tree = createAscNumericTree().add(5).add(2).add(3).add(8);

      expect(tree.contains(1)).to.be.false;
      expect(tree.contains(4)).to.be.false;
      expect(tree.contains(9)).to.be.false;
    });
  });

  describe("#ascending", () => {
    it("returns proper ordering of a more complex tree", () => {
      const tree = createAscNumericTree()
        .add(5)
        .add(2)
        .add(3)
        .add(8)
        .add(1)
        .add(7);

      expect(tree.ascending()).to.eql([1, 2, 3, 5, 7, 8]);
    });
  });

  describe("#descending", () => {
    it("returns proper ordering of a more complex tree", () => {
      const tree = createAscNumericTree()
        .add(5)
        .add(2)
        .add(3)
        .add(8)
        .add(1)
        .add(7);

      expect(tree.descending()).to.eql([8, 7, 5, 3, 2, 1]);
    });
  });

  describe("#remove", () => {
    it("does nothing if the value is not in the tree", () => {
      expect(createAscNumericTree().add(5).remove(4).ascending()).to.eql([5]);
    });

    it("removes the only value in a tree", () => {
      expect(createAscNumericTree().add(5).remove(5).ascending()).to.eql([]);
    });

    it("removes the only leaves from a tree", () => {
      expect(
        createAscNumericTree().add(5).add(2).add(7).remove(2).ascending()
      ).to.eql([5, 7]);

      expect(
        createAscNumericTree().add(5).add(2).add(7).remove(7).ascending()
      ).to.eql([2, 5]);
    });

    it('removes "chains" of leaves', () => {
      const tree = createAscNumericTree().add(5).add(4).add(3).add(2);

      expect(tree.remove(3).ascending()).to.eql([2, 4, 5]);
      expect(tree.remove(4).ascending()).to.eql([2, 5]);
    });

    it("removes the root from a tree with only one other element", () => {
      expect(
        createAscNumericTree().add(5).add(2).remove(5).ascending()
      ).to.eql([2]);

      expect(
        createAscNumericTree().add(5).add(7).remove(5).ascending()
      ).to.eql([7]);
    });

    it("removes the root from a tree with two more elements", () => {
      const tree = createAscNumericTree().add(5).add(2).add(7);

      tree.remove(5);
      expect(tree.ascending()).to.eql([2, 7]);
    });

    it("removes when there are multiple possible successors", () => {
      const tree = createAscNumericTree().add(5).add(2).add(8).add(7).add(6);

      tree.remove(5);
      expect(tree.ascending()).to.eql([2, 6, 7, 8]);
    });
  });
});
