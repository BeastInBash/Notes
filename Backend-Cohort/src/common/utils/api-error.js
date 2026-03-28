// Using Nodejs Error with some cutomer error methods 
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor); /* Tells which line has error and we are binding it with this
        and this.constructor */
    }
    static badRequest(message = "Bad Request") {
        return new ApiError(400, message)
    }
    static userNotFound(message = "User not found") {
        return new ApiError(404, message)
    }
    static forbidden(message="Forbidden") {
        return new ApiError(409, message)
    }
    static unAuthorized(message = "Unauthorized") {
        return new ApiError(401, message)

    }
    static conflict(message = "User already Exists") {
        return new ApiError(403, message)
    }
}
export default ApiError;
