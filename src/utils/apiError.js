class ApiError {
    constructor(statusCode = 400, message = "something is wrong", errors = null) {
        this.statusCode = statusCode,
            this.message = message,
            this.errors = errors
        this.status = false,
            this.data = null
    }
    // static notfound() {
    //     return {
    //         statusCode: 404,
    //         message: "not found",
    //         errors: null,
    //         status: false,
    //         data: null
    //     }
    // }
}

export { ApiError }