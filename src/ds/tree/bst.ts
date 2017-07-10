import { ITree } from './tree';
import { ITreeNode, TreeNode } from './treeNode';

export class BinarySearchTree<T> implements ITree<T> {
  private root: ITreeNode<T> | null;

  constructor(private comparator: (x: T, y: T) => number) {
    this.root = null;
  }

  public add(value: T): BinarySearchTree<T> {
    if (!this.root) {
      this.root = new TreeNode(value);
      return this;
    }

    const addToTree = (currentNode: ITreeNode<T>) => {
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
          currentNode.left = new TreeNode(value);
        }
      } else {
        if (right) {
          addToTree(right);
        } else {
          currentNode.right = new TreeNode(value);
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

  private findNode(value: T): ITreeNode<T> | null {
    const traverse = (currentNode: ITreeNode<T> | null): ITreeNode<T> | null => {
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
