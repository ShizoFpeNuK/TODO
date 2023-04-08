type ExceptionOptions = {
  statusCode?: number;
  message?: string;
};


export class HttpException extends Error {
  statusCode: number;

  constructor({ statusCode = 400, message = "Bad Request" }: ExceptionOptions) {
    super(message);
    this.statusCode = statusCode;
  }
}


export function throwError(options: ExceptionOptions): never {
  throw new HttpException(options);
}

export function throwErrorServiceUnavailable(message: string = "Service Unavailable"): never {
  throw new HttpException({
    statusCode: 503,
    message
  });
}

export function throwErrorNotFound(message: string = "Not Found"): never {
  throw new HttpException({
    statusCode: 404,
    message
  });
}

