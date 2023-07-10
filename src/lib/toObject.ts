export const toObject = (
  <T extends object>(from: Partial<T>, to: T) => {
    for (const key in from) {
      if (typeof from[key] === 'object')
        toObject(from[key] as any, to[key] as any);
      else
        (to as any)[key] = from[key];
    }
  }
);