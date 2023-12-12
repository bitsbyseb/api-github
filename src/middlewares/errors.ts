import { NextFunction,Response,Request } from "express";

export const handleError = (err:Error,req:Request,res:Response,next:NextFunction):void => {
    res.status(500).json({
        message:err.message,
        stack:err.stack
    });
}

export const logError = (err:Error,req:Request,res:Response,next:NextFunction):void => {
    console.log(err);
    next(err);
}