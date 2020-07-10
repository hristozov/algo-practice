export function merge<T extends {}>(destination: T, source: T) {
  // tslint:disable-next-line:no-for-in
  for (const k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }

  return destination;
}
