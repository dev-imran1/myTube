class ApiResponse{
    constructor(statusCode = 400, message = "something is wrong", errors = null,status,data=[]) {
        this.statusCode = statusCode,
            this.message = message,
            this.errors = errors,
            this.data = data,
            this.status = statusCode > 399
    }
}
export {ApiResponse}