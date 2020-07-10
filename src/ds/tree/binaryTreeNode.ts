import { ITreeNode } from './treeNode';

export interface IBinaryTreeNode<T> extends ITreeNode<T> {
  left: IBinaryTreeNode<T> | null;
  right: IBinaryTreeNode<T> | null;
  parent: IBinaryTreeNode<T> | null;
}

export class BinaryTreeNode<T> implements IBinaryTreeNode<T> {
  public left: IBinaryTreeNode<T>;
  public right: IBinaryTreeNode<T>;

  public constructor(
    public value: T,
    public parent: IBinaryTreeNode<T> | null = null,
  ) {
    this.value = value;
  }

  public isLeaf(): boolean {
    return !this.left && !this.right;
  }
}
