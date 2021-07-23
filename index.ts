import './index.css'
import { GameEngine } from './lib/GameEngine'
import { Keyboard } from './lib/Keyboard'

const engine = new GameEngine('#app')
engine.start()