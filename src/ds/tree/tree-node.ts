export interface ITreeNode<T> {
  value: T;
  parent: ITreeNode<T> | null;
  isLeaf(): boolean;
}
