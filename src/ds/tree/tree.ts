
export interface ITree<T> {
  add(value: T): ITree<T>;

  remove(value: T): ITree<T>;

  contains(value: T): boolean;
}
