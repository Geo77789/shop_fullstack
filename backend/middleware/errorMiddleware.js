
// This function catch the errors from the routes

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`); // 404   
    res.status(404);
    next(error);
}



// This function process any error from the code

export const errorHandler = (err, req, res, next) => {
    // If the status is on 200, it will be 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode)
        .json({
            message: err.message,
            // Stack trace for debugging
            stack: process.env.NODE_ENV === "production" ? null : err.stack,
        })
}