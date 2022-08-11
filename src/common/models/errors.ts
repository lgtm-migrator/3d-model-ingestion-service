export class ModelPathNotSupported extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ModelPathNotSupported.prototype);
  }
}
