import { BinarySearchTree } from '../ds/tree/bst';
import { Comparator, ISort } from './sort';

export class TreeSort<T> implements ISort<T> {
  public sort(t: T[], comparator: Comparator<T>): T[] {
    const tree = t.reduce((res, current) => res.add(current),
                          new BinarySearchTree(comparator));

    return tree.ascending();
  }
}
