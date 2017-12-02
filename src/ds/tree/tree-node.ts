export interface ITreeNode<T> {
  value: T;
  leaf?(): boolean;
}
