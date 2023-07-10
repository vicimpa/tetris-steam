import { toObject } from "./toObject";

type TAGS = HTMLElementTagNameMap;

export const createElement = (
  <E extends keyof TAGS>(
    elem: E,
    options: Partial<TAGS[E]> = {},
    ...children: Element[]
  ) => {
    const e = document.createElement(elem);

    toObject(options, e);

    for (const child of children)
      e.appendChild(child);

    return e;
  }
);
