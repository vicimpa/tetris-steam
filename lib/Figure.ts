import { p } from "./Point"
import { SizedArray } from "./SizedArray"

export class Figure extends SizedArray {
  x = 0
  y = 0

  get randomColor() {
    const [skip,...colors] = Figure.colors
    const [colorValue] = colors.sort(() => 
      Math.random() > 0.5 ? 1 : -1)
    return Figure.colors.indexOf(colorValue)
  }

  static make(...rows: string[]) {
    let color = 1
    let height = rows.length, width = 0

    for (let row of rows)
      if (row.length > width)
        width = row.length

    const figure = new Figure(width, height)

    for (let [x, y] of figure.entries()) {
      const sym = rows[y]?.[x] || ' '
      figure.set(p(x, y), sym == ' ' ? 0 : color)
    }

    return figure
  }

  rotate() {
    const source = this.clone()

    const {height, width} = this

    this.width = height
    this.height = width

    for(let [x, y, v] of source.entries())
      this.set(p(height-1-y, x), v)
   
    return this
  }

  clone() {
    const { width, height } = this
    const cloned = new Figure(width, height)

    cloned.x = this.x
    cloned.y = this.y
    cloned.map = this.clonedMap

    return cloned
  }

  color(color: number = this.randomColor) {
    for (let [x, y, v] of this.entries())
      this.set(p(x, y), v ? color : 0)

    return this
  }

  position(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }

  static colors = [
    'transparent', 
    'red', 
    'green', 
    'blue'
  ]
}