import { Figure } from "./Figure";
import { randomSort } from "./randomSort";

export const I = (
  Figure
    .make(
      '    ',
      '####',
      '    ',
      '    ',
    ).color(1)
);

export const O = (
  Figure
    .make(
      '##',
      '##'
    ).color(4)
);

export const T = (
  Figure
    .make(
      '   ',
      '###',
      ' # '
    ).color(6)
);

export const J = (
  Figure
    .make(
      ' # ',
      ' # ',
      '## '
    ).color(2)
);

export const L = (
  Figure
    .make(
      ' # ',
      ' # ',
      ' ##'
    ).color(3)
);

export const S = (
  Figure
    .make(
      ' ##',
      '## ',
      '   '
    ).color(5)
);

export const Z = (
  Figure
    .make(
      '## ',
      ' ##',
      '   '
    ).color(7)
);

export const figuresArray = [I, O, T, J, L, Z];

export function getRandomFigure() {
  let rand = (Math.random() * 4) | 0;

  const figure = randomSort([...figuresArray])[0]
    .clone();

  while (rand--)
    figure.rotate();

  return figure;
}