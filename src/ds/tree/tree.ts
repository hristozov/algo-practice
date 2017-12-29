export interface IKVTree<K, V> {
  add(key: K, value: V): IKVTree<K, V>;

  get(key: K): V | null;

  remove(key: K): IKVTree<K, V>;

  contains(key: K): boolean;
}

export interface ITree<T> {
  add(value: T): ITree<T>;

  remove(value: T): ITree<T>;

  contains(value: T): boolean;
}
