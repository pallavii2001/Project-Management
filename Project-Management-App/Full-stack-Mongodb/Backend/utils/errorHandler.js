const notFoundHandler = (req, res, next) => {
    const error = new CustomError(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

class CustomError extends Error {
    constructor(message, statusCode = 500) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError || err instanceof Error) {
        res.json({
            error: {message: err.message, stack: err.stack},
            statusCode: err.statusCode
        })
    } else {
       
        next(err);
    }
};


module.exports = {
    notFoundHandler,
    CustomError,
    errorHandler,
}