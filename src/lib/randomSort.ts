export function randomSort<T>(array: T[]): T[] {
  return array.sort(_ => Math.random() > 0.5 ? 1 : -1);
}