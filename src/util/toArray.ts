export function toArray<T>(iterator: IterableIterator<T>): T[] {
  const result = [];
  for (const x of iterator) {
    result.push(x);
  }

  return result;
}
