import { Bind } from "./Bind";
import { createElement } from "./createElement";
import { Figure } from "./Figure";
import { getRandomFigure } from "./FigureStore";
import { GameMap } from "./GameMap";
import { GameRenderer } from "./GameRenderer";
import { makeController } from "./makeController";

export class GameEngine {
  #score = 0;
  #lines = 0;
  #hiScore = +(localStorage.getItem('hiscore') ?? '0');

  #ctrl = makeController({
    'keyUp': ['ArrowUp', 'KeyW'],
    'keyDown': ['ArrowDown', 'KeyS'],
    'keyLeft': ['ArrowLeft', 'KeyA'],
    'keyRight': ['ArrowRight', 'KeyD'],
    'pause': ['Escape', 'Space']
  });

  get score() { return this.#score; }
  set score(v) {
    this.#score = v;
    this.scoreElement.innerText = `${v}`;

    if (this.#score > this.#hiScore) {
      this.#hiScore = this.#score;
      this.hiScoreElement.innerText = `${this.#hiScore}`;
      localStorage.setItem('hiscore', `${this.#score}`);
    }
  }

  get lines() { return this.#lines; }
  set lines(v) {
    this.#lines = v;
    this.linesElement.innerText = `${this.#lines}`;
    this.levelElement.innerText = `${this.#lines / 10 | 0}`;
  }

  get speed() {
    return 600 - (this.#lines / 10 | 0) * 15;
  };

  appendScores = [0, 100, 300, 700, 1500];

  figure: Figure = getRandomFigure();
  nexFigure: Figure = getRandomFigure();

  map = new GameMap();
  next = new GameMap(4, 4);

  renderer = new GameRenderer(this.map);
  rendererNext = new GameRenderer(this.next);

  work = false;
  isDown = false;
  pause = true;

  tickCount = 0;

  previewTick = performance.now();
  previewMove = performance.now();

  gapElement = createElement('div', { className: 'gap' });
  scoreElement = createElement('p', { className: 'score', innerText: `${this.score}` });
  hiScoreElement = createElement('p', { className: 'score', innerText: `${this.#hiScore}` });
  linesElement = createElement('p', { className: 'score', innerText: `${this.#lines}` });
  levelElement = createElement('p', { className: 'score', innerText: `${this.#lines / 10 | 0}` });
  pauseElement = createElement('p', { className: 'pause', innerText: 'Пауза (Esc | Space)' });
  pauseButton = createElement('button', { innerText: 'Пауза (Esc)' });
  githubLink = createElement('a', { href: 'https://github.com/vicimpa/tetris', innerText: 'GitHub' });

  constructor(query: string) {
    const app = document.querySelector<HTMLElement>(query)!;
    const content = app.querySelector<HTMLElement>('#content')!;
    const side = app.querySelector<HTMLElement>('#side')!;

    this.renderer.append(content);
    this.newFigure();

    side.appendChild(this.scoreElement);
    side.appendChild(this.hiScoreElement);
    side.appendChild(this.linesElement);
    side.appendChild(this.levelElement);
    this.rendererNext.append(side);
    side.appendChild(this.pauseButton);
    content.appendChild(this.pauseElement);
    this.resize(app);
    side.appendChild(this.gapElement);
    side.appendChild(this.githubLink);

    addEventListener('resize', this.resize.bind(this, app));
    this.pauseButton.addEventListener('click', () => this.pause = !this.pause);
  }

  @Bind()
  resize(elem: HTMLElement) {
    const p = 20;
    const { parentElement } = elem;
    if (!parentElement) return;

    const { offsetWidth: W, offsetHeight: H } = parentElement;
    const { offsetWidth: w, offsetHeight: h } = elem;

    const scale = Math.min((W - p * 2) / w, (H - p * 2) / h);
    elem.style.transform = `scale(${scale})`;
  }

  @Bind()
  rotate() {
    this.figure.rotate();

    if (this.figure.haveCollizion(this.map))
      this.figure.back();

    this.renderer.render();
  }

  @Bind()
  move(dir: -1 | 1) {
    this.figure.move(dir, 0);

    if (this.figure.haveCollizion(this.map))
      this.figure.back();

    this.renderer.render();
  }

  @Bind()
  newFigure() {
    if (this.figure)
      this.map.remove(this.figure);

    this.figure = this.nexFigure;
    this.nexFigure = getRandomFigure();
    this.next.remove();
    this.next.add(this.nexFigure);
    this.map.add(this.figure);
    const y = -this.figure.height;
    const x = Math.round(
      this.map.width / 2 -
      this.figure.width / 2
    );

    this.figure.position(x, y);
    this.renderer.render();
    this.rendererNext.render();
  }

  @Bind()
  start() {
    if (this.work)
      return;

    this.work = true;
    this.tick();

  }

  @Bind()
  stop() {
    if (!this.work)
      return;

    this.work = false;
  }

  @Bind()
  checkPause() {
    const show = 'show';
    const { classList } = this.pauseElement;

    if (this.pause && !classList.contains(show))
      classList.add(show);
    if (!this.pause && classList.contains(show))
      classList.remove(show);
  }

  @Bind()
  tick() {
    if (!this.work)
      return;

    const {
      keyUp,
      keyDown,
      keyLeft,
      keyRight,
      pause,
    } = this.#ctrl;

    requestAnimationFrame(this.tick);

    const { figure } = this;
    const time = performance.now();

    if (pause.isSingle()) {
      this.pause = !this.pause;
    }
    this.checkPause();

    const { previewTick, previewMove } = this;
    if (this.pause) {
      this.previewTick = time;
      this.previewMove = time;
      return;
    }

    let speed = this.speed;
    let moveSpeed = 100;

    if (keyDown.isDown())
      speed *= .1;

    if (keyUp.isSingle())
      this.rotate();

    if (
      keyLeft.isSingle() || keyRight.isSingle()
    ) this.previewMove = time;

    if (keyDown.isSingle())
      this.previewTick = time - speed;

    if (time >= previewMove + moveSpeed) {
      if (keyLeft.isDown()) {
        this.move(-1);
        this.previewMove = time;
      } else if (keyRight.isDown()) {
        this.move(1);
        this.previewMove = time;
      } else {
        this.previewMove = time - moveSpeed;
      }
    }

    if (time >= previewTick + speed) {
      this.tickCount += 1;
      this.previewTick = time;

      figure.move(0, 1);

      if (figure.haveCollizion(this.map)) {
        figure.back();

        if (this.figure.haveCollizion(this.map, true)) {
          this.stop();
          alert('Game Over!');
          location.reload();
          return;
        }

        this.map.fix(this.figure);
        const count = this.map.checkClear();
        this.lines += count;
        this.score += this.appendScores[count] ?? 10000;
        this.newFigure();
      }
    }

    this.renderer.render();
  }
}