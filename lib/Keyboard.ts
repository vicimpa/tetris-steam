import { Bind } from "./Bind";

export class Keyboard {
  #map = new Map<string, boolean>();
  #clicked = new Map<string, boolean>();

  constructor() {
    addEventListener('keydown', this.keyDown);
    addEventListener('keyup', this.keyUp);
    addEventListener('blur', this.unfocus);
  }

  down(e: string) {
    return this.#map.get(e) || false;
  }

  up(e: string) {
    return !this.down(e);
  }

  single(e: string) {
    if (this.#map.get(e) && !this.#clicked.get(e)) {
      this.#clicked.set(e, true);
      return true;
    } else {
      return false;
    }
  }

  @Bind()
  keyDown(e: KeyboardEvent) {
    if (e.repeat)
      return;

    this.#map.set(e.key, true);
    this.#clicked.set(e.key, false);
  }

  @Bind()
  keyUp(e: KeyboardEvent) {
    if (e.repeat)
      return;

    this.#map.set(e.key, false);
    this.#clicked.set(e.key, false);
  }

  @Bind()
  unfocus() {
    for (let [key] of this.#map.entries()) {
      this.#map.set(key, false);
      this.#clicked.set(key, false);
    }
  }
}