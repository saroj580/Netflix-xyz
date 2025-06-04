const errorHandler = (err, req, res, next) => {
    
    //log error stack (only in development mode)
    console.error(err.stack);
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}

export default errorHandler;