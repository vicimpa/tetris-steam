import { Bind } from "./Bind";
import { Point } from "./Point";

type TEntry = [number, number, number];

class SizedArray {
  width = 0;
  height = 0;
  map: Uint8Array;

  get clonedMap() {
    return new Uint8Array(this.map);
  }

  constructor(width: number, height: number) {
    this.map = new Uint8Array(width * height);
    this.width = width;
    this.height = height;
  }

  @Bind()
  entries() {
    const { width, map: m } = this;
    const output = new Array<TEntry>(m.length);

    for (let i = 0; i < m.length; i++) {
      let x = i % width;
      let y = (i - x) / width;
      let v = m[i];

      output[i] = [x, y, v];
    }

    return output;
  }

  @Bind()
  index(index: number | Point): number {
    const { width, height } = this;
    if (index instanceof Point) {
      const { x, y } = index;
      if (x < 0 || x > width - 1) return -1;
      if (y < 0 || y > height - 1) return -1;

      return y * this.width + x;
    }

    return index;
  }

  @Bind()
  get(index: number | Point): number {
    return this.map[this.index(index)];
  }

  @Bind()
  set(index: number | Point, value: number): number {
    return this.map[this.index(index)] = value | 0;
  }
}


export { SizedArray };