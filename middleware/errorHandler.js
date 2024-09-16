const {constants} = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log("status code",statusCode);
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case  constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Un Authorized",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;

        default:
            console.log("No Error!, All good :)")
            break;
    }
}

module.exports = errorHandler;