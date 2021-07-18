import { Figure } from "./Figure";
import { randomSort } from "./Utils";

export const I = (
  Figure
    .make(
      '    ',
      '####',
      '    ',
      '    ',
    )
)

export const O = (
  Figure
    .make(
      '##',
      '##'
    )
)

export const T = (
  Figure
    .make(
      '   ',
      '###',
      ' # '
    )
)

export const J = (
  Figure
    .make(
      ' # ',
      ' # ',
      '## '
    )
)

export const L = (
  Figure
    .make(
      ' # ',
      ' # ',
      ' ##'
    )
)

export const S = (
  Figure
    .make(
      ' ##',
      '## ',
      '   '
    )
)

export const Z = (
  Figure
    .make(
      '## ',
      ' ##',
      '   '
    )
)

export const figuresArray = [I, O, T, J, L, Z]

export function getRandomFigure() {
  let rand = (Math.random() * 4) | 0

  const figure = randomSort([...figuresArray])[0]
    .clone()
    .color()
    

  while(rand--)
    figure.rotate()

  return figure
}