
module.exports = {
    errorHandler: (err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
    
        // Log the error stack for debugging purposes
        console.error(`[${new Date().toISOString()}] ${statusCode} - ${message}\nStack: ${err.stack}`);
    
        // Send the error response
        res.status(statusCode).json({
            success: false,
            message: message,
            // Only include the stack trace if not in production
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    }
}

