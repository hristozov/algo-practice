import { ITreeNode } from './tree-node';

export interface IBinaryTreeNode<T> extends ITreeNode<T> {
  left: IBinaryTreeNode<T> | null;
  right: IBinaryTreeNode<T> | null;
}

export class BinaryTreeNode<T> implements IBinaryTreeNode<T> {
  public left: IBinaryTreeNode<T>;
  public right: IBinaryTreeNode<T>;

  constructor(public value: T) {
    this.value = value;
  }

  public leaf?(): boolean {
    return !this.left && !this.right;
  }
}
