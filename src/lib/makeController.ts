const keymap = new Map<string, boolean>();

addEventListener('keydown', ({ key }) => {
  keymap.set(key, true);
});
addEventListener('keyup', ({ key }) => {
  keymap.set(key, false);
});

interface IControllerConfig {
  [key: string]: string[];
}

interface IKeyCtl {
  isDown(): boolean;
  isUp(): boolean;
  isSingle(): boolean;
  isEvery(n: number): boolean;
}

export const makeController = (
  <T extends IControllerConfig>(opt: T) => {

    return Object
      .entries(opt)
      .reduce((acc, [key, value]: [keyof T, string[]]) => {
        const state = {
          pressed: false,
          lastClick: 0
        };

        acc[key] = {
          isDown() {
            return !!value.filter(key => keymap.get(key)).length;
          },
          isUp() {
            return !this.isDown();
          },
          isSingle() {
            if (!state.pressed && this.isDown()) {
              state.pressed = true;
              return true;
            }

            if (!this.isDown())
              state.pressed = false;

            return false;
          },
          isEvery(n) {
            const time = performance.now();

            if (this.isDown()) {
              if (!state.lastClick) {
                state.lastClick = time;
                return true;
              }

              if (state.lastClick + n < time) {
                state.lastClick = time;
                return true;
              }

              return false;
            } else {
              state.lastClick = 0;
              return false;
            }
          }
        };


        return acc;
      }, {} as { [key in keyof T]: IKeyCtl });
  }
);
