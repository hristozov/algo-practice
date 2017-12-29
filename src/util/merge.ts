export function merge(destination: {}, source: {}) {
  if (!destination || !source) {
    return destination;
  }

  for (const k of Object.keys(source)) {
    destination[k] = source[k];
  }

  return destination;
}
