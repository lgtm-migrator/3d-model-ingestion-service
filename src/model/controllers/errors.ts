export class BadPath extends Error {
    public constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, BadPath.prototype);
    }
  }