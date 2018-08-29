import { expect } from 'chai';
import { BaseBinaryTree } from './binaryTree';
import { IBinaryTreeNode } from './binaryTreeNode';

/* tslint:disable:no-unused-expression */

class TestBinaryTree<T> extends BaseBinaryTree<T> {
  public constructor(root: IBinaryTreeNode<T> | null = null) {
    super();
    this.root = root;
  }
}

describe('BaseBinaryTree', () => {
  const SAMPLE_TREE: IBinaryTreeNode<number> = {
    left: {
      left: {
        value: 3,
      },
      right: {
        value: 4,
      },
      value: 5,
    },
    right: {
      left: {
        value: 2,
      },
      right: {
        value: 7,
      },
      value: 0,
    },
    value: 1,
  } as IBinaryTreeNode<number>;

  describe('inOrder', () => {
    function traverse(root: IBinaryTreeNode<number> | null) {
      return new TestBinaryTree(root).inOrder();
    }

    it('works with no elements', () => {
      expect(traverse(null)).to.eql([]);
    });

    it('works with one element', () => {
      const root: IBinaryTreeNode<number> = {
        left: null,
        right: null,
        value: 1,
      } as IBinaryTreeNode<number>;

      expect(traverse(root)).to.eql([1]);
    });

    it('works with the simple tree', () => {
      expect(traverse(SAMPLE_TREE)).to.eql([3, 5, 4, 1, 2, 0, 7]);
    });
  });

  describe('preOrder', () => {
    function traverse(root: IBinaryTreeNode<number> | null) {
      return new TestBinaryTree(root).preOrder();
    }

    it('works with no elements', () => {
      expect(traverse(null)).to.eql([]);
    });

    it('works with one element', () => {
      const root: IBinaryTreeNode<number> = {
        left: null,
        right: null,
        value: 1,
      } as IBinaryTreeNode<number>;

      expect(traverse(root)).to.eql([1]);
    });

    it('works with the simple tree', () => {
      expect(traverse(SAMPLE_TREE)).to.eql([1, 5, 3, 4, 0, 2, 7]);
    });
  });

  describe('postOrder', () => {
    function traverse(root: IBinaryTreeNode<number> | null) {
      return new TestBinaryTree(root).postOrder();
    }

    it('works with no elements', () => {
      expect(traverse(null)).to.eql([]);
    });

    it('works with one element', () => {
      const root: IBinaryTreeNode<number> = {
        left: null,
        right: null,
        value: 1,
      } as IBinaryTreeNode<number>;

      expect(traverse(root)).to.eql([1]);
    });

    it('works with the simple tree', () => {
      expect(traverse(SAMPLE_TREE)).to.eql([3, 4, 5, 2, 7, 0, 1]);
    });
  });
});
