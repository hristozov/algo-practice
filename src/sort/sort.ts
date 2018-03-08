export type Comparator<T> = (el1: T, el2: T) => number;

export interface ISort<T> {
  sort(t: T[], comparator: Comparator<T>): T[];
}
