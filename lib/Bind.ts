type TDesc = TypedPropertyDescriptor<(...args: any[]) => any>;

export function Bind(obj?: any) {
  return (
    (target: any, key: string, descriptor: TDesc) => {
      const { value } = descriptor || {};

      if (typeof value != 'function')
        return descriptor;

      const sym = Symbol(key);

      return {
        get(this: any) {
          return this[sym] || (
            this[sym] = value.bind(obj || this)
          );
        }
      };
    }
  );
}