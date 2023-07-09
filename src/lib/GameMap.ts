import { Bind } from "./Bind";
import { Figure } from "./Figure";
import { p } from "./Point";
import { SizedArray } from "./SizedArray";

export class GameMap extends SizedArray {
  figures: Figure[] = [];

  constructor(width = 10, height = 20) {
    super(width, height);
  }

  @Bind()
  entriesRender() {
    return this.entries()
      .map(([x, y, v]) => {
        for (let e of this.figures) {
          if (x < e.x || x > e.x + e.width)
            continue;

          if (y < e.y || y > e.y + e.height)
            continue;

          const value = e.get(p(x - e.x, y - e.y));

          if (typeof value != 'number')
            continue;

          v = v || value;
        }

        return [x, y, v] as [number, number, number];
      });
  }


  @Bind()
  add(figure: Figure) {
    const { figures } = this;
    const index = figures.indexOf(figure);

    if (index == -1)
      figures.push(figure);
  }

  @Bind()
  remove(figure: Figure) {
    const { figures } = this;
    const index = figures.indexOf(figure);

    if (index != -1)
      figures.splice(index, 1);
  }

  @Bind()
  fix(figure: Figure) {
    this.remove(figure);

    for (let [x, y, v] of figure.entries()) {
      if (!v) continue;
      x += figure.x;
      y += figure.y;

      this.set(p(x, y), v);
    }
  }

  @Bind()
  checkClear(s = { count: 0 }) {
    for (let y = 0; y < this.height; y++) {
      let clear = true;

      for (let x = 0; x < this.width; x++) {
        if (!this.get(p(x, y))) {
          clear = false;
          break;
        }
      }

      if (clear) {
        const f = y;

        for (let [x, y, v] of this.entries()) {
          if (y >= f) continue;
          this.set(p(x, y + 1), v);
        }

        s.count++;
        this.checkClear(s);
        break;
      }
    }

    return s.count;
  }

  @Bind()
  update() {

  }

  @Bind()
  render() {

  }
}