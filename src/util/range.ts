export function* range(start: number, end: number): IterableIterator<number> {
  for (let i = start; i < end; i += 1) {
    yield i;
  }
}
