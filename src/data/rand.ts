import { randomSeed } from "lib/randomSeed";

let seed = +location.hash.slice(1) | 0;

if (!seed || isNaN(seed)) {
  location.hash = `#${seed = Math.abs(Math.random() * 100000000000 | 0)}`;
}

export const rand = randomSeed(seed);