import { Figure } from "./Figure";
import { GameMap } from "./GameMap";
import { GameRenderer } from "./GameRenderer";

export class GameEngine {
  figures = {
    I: (
      Figure
        .make(
          '####'
        )
    ),
    O: (
      Figure
        .make(
          '##',
          '##'
        )
    )
  }

  map = new GameMap()
  renderer = new GameRenderer(this.map)
  
  
}