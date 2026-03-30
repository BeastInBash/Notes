class ApiError extends Error {
    public statusCode: number
    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }
    static badRequest(message = "Bad Request") {
        return new ApiError(400, message)
    }
    static notFound(message = "Not Found") {
        return new ApiError(404, message)
    }
    static forbidden(message = "Forbidden") {
        return new ApiError(409, message)
    }

}
export default ApiError
