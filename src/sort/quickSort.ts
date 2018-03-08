import { Comparator, ISort } from './sort';

interface IPivotSelection<T> {
  pivot: T;
  rest: T[];
}

export class QuickSort<T> implements ISort<T> {
  public sort(t: T[], comparator: Comparator<T>): T[] {
    if (t.length === 0) {
      return [];
    }

    const {pivot, rest} = this.selectPivot(t);
    const lt = rest.filter((x) => comparator(x, pivot) < 0);
    const gte = rest.filter((x) => comparator(x, pivot) >= 0);

    return this.sort(lt, comparator)
      .concat([pivot])
      .concat(this.sort(gte, comparator));
  }

  private selectPivot(t: T[]): IPivotSelection<T> {
    return {
      pivot: t[0],
      rest: t.slice(1),
    };
  }
}
