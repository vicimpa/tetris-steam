import { toObject } from "./toObject";

type TAGS = HTMLElementTagNameMap;
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;


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
