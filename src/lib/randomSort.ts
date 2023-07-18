import { rand } from "data/rand";

export function randomSort<T>(array: T[]): T[] {
  return array.sort(_ => rand() > 0.5 ? 1 : -1);
}