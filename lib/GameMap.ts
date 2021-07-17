import { Bind } from "./Bind"
import { Figure } from "./Figure"
import { p } from "./Point"
import { SizedArray } from "./SizedArray"

export class GameMap extends SizedArray {
  figures: Figure[] = []

  constructor(width = 10, height = 20) {
    super(width, height)
  }

  @Bind()
  entriesRender() {
    return this.entries()
      .map(([x, y, v]) => {
        for(let e of this.figures) {
          if(x < e.x || x > e.x + e.width)
            continue
            
          if(y < e.y || y > e.y + e.height)
            continue

          const value = e.get(p(x-e.x, y-e.y))

          if(typeof value != 'number')
            continue

          v = value
        }

        return [x, y, v] as [number, number, number]
      })
  }


  @Bind()
  add(figure: Figure) {
    const { figures } = this
    const index = figures.indexOf(figure)

    if (index == -1)
      figures.push(figure)
  }

  @Bind()
  remove(figure: Figure) {
    const { figures } = this
    const index = figures.indexOf(figure)

    if (index != -1)
      figures.splice(index, 1)
  }

  @Bind()
  fix(figure: Figure) {
    this.remove(figure)
    /**
     * #todo Сделать позже!
     */
  }

  @Bind()
  update() {

  }

  @Bind()
  render() {

  }
}