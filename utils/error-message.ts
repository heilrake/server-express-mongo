import HttpStatusCode from "http-status-codes";

type ApiErrorMessagePropsType = {
  statusCode: number;
  message: string;
};

export class ApiErrorMessage extends Error {
  public readonly status: number;

  public readonly message: string;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
    this.message = message;
  }

  static UnauthorizedError() {
    return new ApiErrorMessage(
      HttpStatusCode.UNAUTHORIZED,
      "User is not authorize",
    );
  }

  static BadRequest({ statusCode, message }: ApiErrorMessagePropsType) {
    return new ApiErrorMessage(statusCode, message);
  }

  static UnprocessableEntity({
    statusCode,
    message,
  }: ApiErrorMessagePropsType) {
    return new ApiErrorMessage(statusCode, message);
  }
}
