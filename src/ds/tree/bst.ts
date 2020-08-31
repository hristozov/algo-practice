import { Comparator } from '../../sort/sort';

import { BaseBinaryTree, ITraversibleBinaryTree } from './binaryTree';
import { BinaryTreeNode, IBinaryTreeNode } from './binaryTreeNode';

export class BinarySearchTree<T>
  extends BaseBinaryTree<T>
  implements ITraversibleBinaryTree<T> {
  private dupsAllowed = false;

  public constructor(private readonly comparator: Comparator<T>) {
    super();
  }

  public allowDuplicates(): BinarySearchTree<T> {
    this.dupsAllowed = true;

    return this;
  }

  public add(value: T): BinarySearchTree<T> {
    if (!this.root) {
      this.root = new BinaryTreeNode(value);

      return this;
    }

    const addToTree = (currentNode: IBinaryTreeNode<T>) => {
      const comparisonResult: number = this.comparator(
        value,
        currentNode.value,
      );
      const left = currentNode.left;
      const right = currentNode.right;

      if (comparisonResult === 0 && !this.dupsAllowed) {
        // The value is already in the tree.
        return;
      }

      if (comparisonResult < 0) {
        if (left) {
          addToTree(left);
        } else {
          currentNode.left = new BinaryTreeNode(value, currentNode);
        }
      } else {
        if (right) {
          addToTree(right);
        } else {
          currentNode.right = new BinaryTreeNode(value, currentNode);
        }
      }
    };

    addToTree(this.root);

    return this;
  }

  public remove(value: T): BinarySearchTree<T> {
    const node = this.findNode(value);

    if (!node) {
      // No such value.
      return this;
    }

    return this.removeNode(node);
  }

  public contains(value: T): boolean {
    return !!this.findNode(value);
  }

  public ascending(): T[] {
    return this.inOrder();
  }

  public descending(): T[] {
    return this.inOrder().reverse();
  }

  private isRoot(node: IBinaryTreeNode<T>) {
    // tslint:disable-next-line:strict-comparisons
    return this.root === node;
  }

  private removeNode(node: IBinaryTreeNode<T>): BinarySearchTree<T> {
    const findInOrderSuccessor = (
      current: IBinaryTreeNode<T>,
    ): IBinaryTreeNode<T> => {
      const leftSuccessor = current.left;

      return leftSuccessor ? findInOrderSuccessor(leftSuccessor) : current;
    };

    const replace = (
      target: IBinaryTreeNode<T>,
      replacement: IBinaryTreeNode<T> | null,
    ) => {
      const parent = target.parent;
      if (this.isRoot(node) || !parent) {
        this.root = replacement;

        if (replacement) {
          replacement.parent = null;
        }
      } else {
        // tslint:disable-next-line:strict-comparisons
        if (parent.left === node) {
          parent.left = replacement;
        } else {
          parent.right = replacement;
        }
      }
    };

    const left = node.left;
    const right = node.right;

    if (left && right) {
      const successor = findInOrderSuccessor(right);

      this.remove(successor.value);
      node.value = successor.value;
    } else {
      replace(node, left || right);
    }

    return this;
  }

  private findNode(value: T): IBinaryTreeNode<T> | null {
    const traverse = (
      currentNode: IBinaryTreeNode<T> | null,
    ): IBinaryTreeNode<T> | null => {
      if (!currentNode) {
        return null;
      }

      const comparisonResult: number = this.comparator(
        value,
        currentNode.value,
      );

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
