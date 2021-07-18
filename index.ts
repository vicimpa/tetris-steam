import './index.css'
import { GameEngine } from './lib/GameEngine'

const engine = new GameEngine('#app')

engine.start()


// addEventListener('contextmenu', (e) => {
//   e.preventDefault()
// })

// addEventListener('mousedown', (e) => {
//   e.preventDefault()

//   switch(e.button) {
//     case 0: {
//       state.d?.rotate()
//       renderer.render()
//     } break

//     case 2: {
//       state.i++
//       map.remove(state.d)
      
//       if(!figuresArray[state.i])
//         state.i = 0

//       state.d = figuresArray[state.i]
//         .clone()
//         .color()
//         .position(4, 4)

//       map.add(state.d)
//       renderer.render()
//     } break
//   }
// })