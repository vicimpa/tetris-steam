import { Bind } from "./Bind"
import { Figure } from "./Figure"
import { GameMap } from "./GameMap"

export class GameRenderer {
  elem = document.createElement('canvas')
  ctx = this.elem.getContext('2d')

  size = 20
  padding = 30
  time = performance.now()
  deltaTime = 0

  constructor(public map: GameMap) {
    const { size } = this
    const { width, height } = map
    const wSize = width * size
    const hSize = height * size

    this.elem.width = wSize
    this.elem.height = hSize
    this.elem.style.width = `${wSize}px`
    this.elem.style.height = `${hSize}px`
    this.elem.style.border = '2px solid #999'
    this.elem.style.imageRendering = 'pixelated'

    addEventListener('resize', this.resize)
    this.resize()
  }

  @Bind()
  append(query: string) {
    const elem = document.querySelector(query)
    if (!elem) throw new Error('No find element!')
    elem.appendChild(this.elem)
    this.resize()
  }

  @Bind()
  resize() {
    const { padding: p } = this
    const { parentElement } = this.elem
    if (!parentElement) return

    const { offsetWidth: W, offsetHeight: H } = parentElement
    const { offsetWidth: w, offsetHeight: h } = this.elem

    const scale = Math.min((W - p * 2) / w, (H - p * 2) / h)
    this.elem.style.transform = `scale(${scale})`
  }

  @Bind()
  render() {
    const { size, ctx, map, time } = this
    const { width, height } = this.map
    const newTime = performance.now()

    this.deltaTime = newTime - time
    this.time = newTime

    if (this.deltaTime > 100)
      this.deltaTime = 0

    ctx.clearRect(0, 0, width * size, height * size)

    for (let [x, y, v] of map.entries()) {
      const color = Figure.colors[v] || 'transparent'

      const X = x * size
      const Y = y * size

      ctx.beginPath()

      ctx.strokeStyle = '#dddddd'
      ctx.fillStyle = color
      ctx.strokeRect(X, Y, size, size)
      ctx.fillRect(X + 1, Y + 1, size - 1, size - 1)

      ctx.closePath()
    }

    for (let figure of map.figures) {
      let { x: vX, y: vY } = figure

      vX *= size
      vY *= size

      for (let [x, y, v] of figure.entries()) {
        const color = Figure.colors[v] || 'transparent'
        const dY = figure.delta * size

        x *= size
        y *= size

        ctx.beginPath()

        ctx.strokeStyle = '#dddddd'
        ctx.fillStyle = color
        ctx.fillRect(x+vX + 1, y+vY-dY + 1, size - 1, size - 1)

        ctx.closePath()
      }

      if (figure.delta > 0)
        figure.delta -= 0.15
      else
        figure.delta = 0
    }
  }
}