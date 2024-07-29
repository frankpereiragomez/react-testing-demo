export class ClientError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}

export class ServerError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}

export class SystemError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}
