import HttpStatusCode from "http-status-codes";
export default class ApiError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(): ApiError {
    return new ApiError(HttpStatusCode.UNAUTHORIZED, "User is not authorize");
  }

  static BadRequest(message: string, errors: any[] = []): ApiError {
    return new ApiError(HttpStatusCode.BAD_REQUEST, message, errors);
  }
}
