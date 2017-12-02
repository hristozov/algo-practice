import { BaseBinaryTree } from './binary-tree';
import { BinaryTreeNode, IBinaryTreeNode } from './binary-tree-node';
import { ITree } from './tree';

export class BinarySearchTree<T> extends BaseBinaryTree<T> implements ITree<T> {
  constructor(private comparator: (x: T, y: T) => number) {
    super();
  }

  public add(value: T): BinarySearchTree<T> {
    if (!this.root) {
      this.root = new BinaryTreeNode(value);
      return this;
    }

    const addToTree = (currentNode: IBinaryTreeNode<T>) => {
      const comparisonResult: number = this.comparator(value, currentNode.value);
      const left = currentNode.left;
      const right = currentNode.right;

      if (comparisonResult === 0) {
        // The value is already in the tree.
        return;
      }

      if (comparisonResult < -1) {
        if (left) {
          addToTree(left);
        } else {
          currentNode.left = new BinaryTreeNode(value);
        }
      } else {
        if (right) {
          addToTree(right);
        } else {
          currentNode.right = new BinaryTreeNode(value);
        }
      }
    };

    addToTree(this.root);

    return this;
  }

  public remove(value: T): BinarySearchTree<T> {
    return this;
  }

  public contains(value: T): boolean {
    return !!this.findNode(value);
  }

  private findNode(value: T): IBinaryTreeNode<T> | null {
    const traverse = (currentNode: IBinaryTreeNode<T> | null): IBinaryTreeNode<T> | null => {
      if (!currentNode) {
        return null;
      }

      const comparisonResult: number = this.comparator(value, currentNode.value);

      if (comparisonResult === 0) {
        return currentNode;
      } else if (comparisonResult < 0) {
        return traverse(currentNode.left);
      } else {
        return traverse(currentNode.right);
      }
    };

    return traverse(this.root);
  }
}
