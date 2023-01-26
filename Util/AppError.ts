export enum HttpCode {
  ok = 200,
  CREATED = 201,
  Bad_Request = 200,
  Unauthorized = 401,
  Forbidden = 403,
  Not_Found = 404,
  Conflict = 409,
  Internal_Server_Error = 500,
}

interface AppErrorArguments {
  name?: string;
  isOperational?: boolean;
  message: string;
  httpCode: HttpCode;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly isOperational: boolean = true;
  public readonly httpCode: HttpCode;

  constructor(args: AppErrorArguments) {
    super(args.message)

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = args.name || "Error"
    this.httpCode = args.httpCode

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational
    }

    Error.captureStackTrace(this);
  }
}
