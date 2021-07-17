import './index.css'
import { Figure } from './lib/Figure'
import * as figures from './lib/FigureStore'
import { GameMap } from './lib/GameMap'
import { GameRenderer } from './lib/GameRenderer'

const map = new GameMap()
const renderer = new GameRenderer(map)
const figuresArray = Object.values(figures)

const state = {
  i: 0,
  d: figuresArray[0]
    .clone()
    .color()
    .position(4, 4)
}

map.add(state.d)

renderer.append('#app')
renderer.render()

addEventListener('contextmenu', (e) => {
  e.preventDefault()
})

addEventListener('mousedown', (e) => {
  e.preventDefault()

  switch(e.button) {
    case 0: {
      state.d?.rotate()
      renderer.render()
    } break

    case 2: {
      state.i++
      map.remove(state.d)
      
      if(!figuresArray[state.i])
        state.i = 0

      state.d = figuresArray[state.i]
        .clone()
        .color()
        .position(4, 4)

      map.add(state.d)
      renderer.render()
    } break
  }
})