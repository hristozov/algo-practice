export function merge<T>(destination: T, source: T) {
  if (!destination || !source) {
    return destination;
  }

  for (const k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }

  return destination;
}
