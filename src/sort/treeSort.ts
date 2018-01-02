import { BinarySearchTree } from '../ds/tree/bst';
import { ISort } from './sort';

export class TreeSort<T> implements ISort<T> {
  public sort(t: T[], comparator: (el1: T, el2: T) => number): T[] {
    const tree = t.reduce((res, current) => res.add(current),
                          new BinarySearchTree(comparator));

    return tree.ascending();
  }
}
