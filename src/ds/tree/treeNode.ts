export interface ITreeNode<T> {
  value: T;
  left: ITreeNode<T> | null;
  right: ITreeNode<T> | null;
  leaf?(): boolean;
}

export class TreeNode<T> implements ITreeNode<T> {
  public left: ITreeNode<T>;
  public right: ITreeNode<T>;

  constructor(public value: T) {
    this.value = value;
  }

  public leaf?(): boolean {
    return !this.left && !this.right;
  }
}
