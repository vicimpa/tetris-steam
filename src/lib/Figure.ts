import { GameMap } from "./GameMap";
import { p } from "./Point";
import { SizedArray } from "./SizedArray";
import { randomSort } from "./Utils";

export class Figure extends SizedArray {
  x = 0;
  y = 0;

  delta = 0;

  previewState = {
    x: this.x,
    y: this.y,
    map: this.clonedMap
  };

  get randomColor() {
    const [skip, ...colors] = Figure.colors;
    const [colorValue] = randomSort(colors);
    return Figure.colors.indexOf(colorValue);
  }

  static make(...rows: string[]) {
    let color = 1;
    let height = rows.length, width = 0;

    for (let row of rows)
      if (row.length > width)
        width = row.length;

    const figure = new Figure(width, height);

    for (let [x, y] of figure.entries()) {
      const sym = rows[y]?.[x] || ' ';
      figure.set(p(x, y), sym == ' ' ? 0 : color);
    }

    return figure;
  }

  save() {
    this.previewState = {
      x: this.x,
      y: this.y,
      map: this.clonedMap
    };
  }

  back() {
    this.x = this.previewState.x;
    this.y = this.previewState.y;
    this.map = this.previewState.map;
  }

  move(x: number, y: number) {
    this.save();

    this.x += x;
    this.y += y;

    if (y)
      this.delta = 1;

    return this;
  }

  haveCollizion(map: GameMap, haveNull = false) {
    for (let [x, y, v] of this.entries()) {
      if (!v) continue;

      x += this.x;
      y += this.y;

      if (x < 0 || x >= map.width)
        return true;

      if ((haveNull && y < 0) || y >= map.height)
        return true;

      if (map.get(p(x, y)))
        return true;
    }

    return false;
  }

  rotate() {
    this.save();

    const source = this.clone();
    const { height, width } = this;

    this.width = height;
    this.height = width;

    for (let [x, y, v] of source.entries())
      this.set(p(height - 1 - y, x), v);

    return this;
  }

  clone() {
    const { width, height } = this;
    const cloned = new Figure(width, height);

    cloned.x = this.x;
    cloned.y = this.y;
    cloned.map = this.clonedMap;

    return cloned;
  }

  color(color: number = this.randomColor) {
    for (let [x, y, v] of this.entries())
      this.set(p(x, y), v ? color : 0);

    return this;
  }

  position(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  static colors = [
    'transparent',
    'red',
    'green',
    'blue',
    '#00FFFF',
    '#FF00FE',
    '#FFFF14',
    '#0000FE'
  ];
}