import { Bind } from "./Bind";
import { Figure } from "./Figure";
import { getRandomFigure } from "./FigureStore";
import { GameMap } from "./GameMap";
import { GameRenderer } from "./GameRenderer";

export class GameEngine {
  figure: Figure = getRandomFigure()
  map = new GameMap()
  next = new GameMap(8, 8)

  renderer = new GameRenderer(this.map)
  rendererNext = new GameRenderer(this.next)


  work = false
  speed = 600
  isDown = false
  tickCount = 0
  previewTick = performance.now()

  constructor(query: string) {
    this.renderer.append(query)
    this.renderer.render()
    this.newFigure()

    addEventListener('keydown', this.keyDown)
    addEventListener('keyup', this.keyUp)
  }

  @Bind()
  keyUp(e: KeyboardEvent) {    
    e.preventDefault()

    if(e.key == 'ArrowDown')
      this.isDown = false
  }

  @Bind()
  keyDown(e: KeyboardEvent) {
    e.preventDefault()

    switch(e.key) {
      case 'ArrowUp': {
        this.rotate()
      } break

      case 'ArrowLeft': {
        this.move(-1)
      }; break

      case 'ArrowRight': {
        this.move(1)
      } break

      case 'ArrowDown': {
        if(!e.repeat)
          this.isDown = true
      } break
    }
  }

  @Bind()
  rotate() {
    this.figure.rotate()

    if(this.figure.haveCollizion(this.map))
      this.figure.back()

    this.renderer.render()
  }

  @Bind()
  move(dir: -1 | 1) {
    this.figure.move(dir, 0)

    if(this.figure.haveCollizion(this.map))
      this.figure.back()

    this.renderer.render()
  }

  @Bind()
  newFigure() {
    if(this.figure)
      this.map.remove(this.figure)

    this.figure = getRandomFigure()

    this.map.add(this.figure)
    const y = -this.figure.height
    const x = Math.round(
      this.map.width / 2 - 
      this.figure.width / 2
    )

    this.figure.position(x, y)
    this.renderer.render()
  }

  @Bind()
  start() {
    if(this.work)
      return

    this.work = true
    this.tick()

  }

  @Bind()
  stop() {
    if(!this.work)
      return

    this.work = false
  }

  @Bind()
  tick() {
    if(!this.work)
      return

    requestAnimationFrame(this.tick)

    const {figure} = this

    let time = performance.now()
    let { previewTick, speed, isDown } = this

    if(isDown)
      speed = 50

    if(time < previewTick + speed)
      return

    this.tickCount += 1
    this.previewTick = time

    figure.move(0, 1)

    if(figure.haveCollizion(this.map)) {
      figure.back()

      if(this.figure.haveCollizion(this.map, true)) {
        this.stop()
        alert('Game Over!')
        location.reload()
        return
      }
      
      this.map.fix(this.figure)
      this.map.checkClear()
      this.newFigure()
    }

    this.renderer.render()
  }
}