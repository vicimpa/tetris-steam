export function randomSort<T>(array: T[]): T[] {
  return array.sort(e => Math.random() > 0.5 ? 1 : -1);
}