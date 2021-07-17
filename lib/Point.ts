export class Point {
  constructor(
    public x: number,
    public y: number
  ) {}
}

export function p(x: number, y: number) {
  return new Point(x, y)
}