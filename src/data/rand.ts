import { randomSeed } from "lib/randomSeed";

let seed = +location.hash.slice(1) | 0;
let rnd = Math.random();

export const nextSeed = () => {
  location.hash = `#${seed = (rnd * 100000000 | 0)}`;
};

if (!seed || isNaN(seed)) {
  nextSeed();
}

export const rand = randomSeed(seed);
rnd = rand();