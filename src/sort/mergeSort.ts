import { Comparator, ISort } from './sort';

export class MergeSort<T> implements ISort<T> {
  public sort(t: T[], comparator: Comparator<T>): T[] {
    return t
      .map((element) => [element])
      .reduce((res, list) => this.merge(res, list, comparator), []);
  }

  private merge(list1: T[], list2: T[], comparator: Comparator<T>): T[] {
    let l1 = list1;
    let l2 = list2;
    const result: T[] = [];
    while (l1.length > 0 && l2.length > 0) {
      const l1First = l1[0];
      const l2First = l2[0];

      if (comparator(l1First, l2First) < 0) {
        result.push(l1First);
        l1 = l1.slice(1);
      } else {
        result.push(l2First);
        l2 = l2.slice(1);
      }
    }

    return result.concat(l1).concat(l2);
  }
}
