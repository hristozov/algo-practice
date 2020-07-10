import { ITree } from "./tree";

export class BinaryHeap<T> implements ITree<T> {
  private tree: T[] = [];

  public constructor(private readonly comparator: (x: T, y: T) => number) {}

  private static parent(idx: number): number {
    // tslint:disable-next-line:no-bitwise
    return Math.floor((idx - 1) >> 1);
  }

  private static left(idx: number): number {
    // tslint:disable-next-line:no-bitwise
    return (idx << 1) + 1;
  }

  private static right(idx: number): number {
    // tslint:disable-next-line:no-bitwise
    return (idx << 1) + 2;
  }

  public add(value: T): BinaryHeap<T> {
    this.tree.push(value);

    this.upHeap();

    return this;
  }

  public removeFirst(): BinaryHeap<T> {
    return this.removeByIdx(0);
  }

  public remove(value: T): BinaryHeap<T> {
    return this.removeByIdx(this.tree.indexOf(value));
  }

  public contains(value: T): boolean {
    const helper = (idx: number): boolean => {
      if (!this.validIdx(idx)) {
        return false;
      }

      const result = this.comparator(value, this.tree[idx]);

      if (result === 0) {
        return true;
      } else if (result < 0) {
        return false;
      } else {
        return helper(BinaryHeap.right(idx)) || helper(BinaryHeap.left(idx));
      }
    };

    return helper(0);
  }

  public first(): T | null {
    if (this.tree.length === 0) {
      return null;
    }

    return this.tree[0];
  }

  public toList(): T[] {
    return this.tree;
  }

  public isEmpty(): boolean {
    return this.tree.length === 0;
  }

  public clone(): BinaryHeap<T> {
    const result = new BinaryHeap<T>(this.comparator);
    result.tree = this.tree.slice();

    return result;
  }

  private upHeap(): void {
    const helper = (idx: number) => {
      const parent = BinaryHeap.parent(idx);
      if (idx <= 0 || this.compare(idx, parent) >= 0) {
        return;
      }

      this.swap(idx, parent);
      helper(parent);
    };

    helper(this.tree.length - 1);
  }

  private removeByIdx(idx: number): BinaryHeap<T> {
    if (idx < 0) {
      return this;
    }

    if (this.tree.length <= 1) {
      this.tree = [];

      return this;
    }

    const swapIdx = this.tree.length - 1;
    this.swap(idx, swapIdx);
    this.tree = this.tree.slice(0, swapIdx);

    this.downHeap();

    return this;
  }

  private downHeap(): void {
    if (this.tree.length === 1) {
      return;
    }

    const helper = (idx: number) => {
      const left = BinaryHeap.left(idx);
      const right = BinaryHeap.right(idx);
      const invariantKeptLeft =
        !this.validIdx(left) || this.compare(idx, left) <= 0;
      const invariantKeptRight =
        !this.validIdx(right) || this.compare(idx, right) <= 0;

      if (!this.validIdx(idx) || (invariantKeptLeft && invariantKeptRight)) {
        return;
      }

      const smaller = this.compare(left, right) <= 0 ? left : right;
      this.swap(idx, smaller);
      helper(smaller);
    };

    helper(0);
  }

  private validIdx(idx: number): boolean {
    return idx >= 0 && idx < this.tree.length;
  }

  private compare(idx1: number, idx2: number): number {
    return this.comparator(this.tree[idx1], this.tree[idx2]);
  }

  private swap(idx1: number, idx2: number): void {
    const tmp = this.tree[idx1];
    this.tree[idx1] = this.tree[idx2];
    this.tree[idx2] = tmp;
  }
}
