const ErrorHander = require("../utils/errorhandler");

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500; 
    err.message = err.message || "Internal Server Error"; 

    //handling cast error
     if(err.name ==="CastError"){
         const message = `Resource not found. Invalid: ${err.path}`;
         err = new ErrorHander(message, 400);
     }

    //Duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys} entered`
        err = new ErrorHander(message, 400);
    }

    //Wrong Jwt error
    if(err.name === "JsonWebTokenError"){
        const message ="Json Web token is invalid, try again";
        err = new ErrorHander(message, 400);
    }

    //Jwt Expire error
    if(err.name === "TokenExpiredError"){
        const message = "Json web token is expired, try again";
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}