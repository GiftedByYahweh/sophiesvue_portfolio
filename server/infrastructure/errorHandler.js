export class ApiError extends Error {
  status;
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static Conflict(message) {
    throw new ApiError(409, message);
  }

  static UnAuthorized() {
    throw new ApiError(401, "Unauthorized");
  }
}
