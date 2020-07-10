export function merge<T>(destination: T, source: T) {
  if (!destination || !source) {
    return destination;
  }

  // tslint:disable-next-line:no-for-in
  for (const k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }

  return destination;
}
