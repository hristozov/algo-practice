export interface ISort<T> {
  sort(t: T[], comparator: (el1: T, el2: T) => number): T[];
}
