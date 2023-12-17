import { NextFunction,Response,Request } from "express";

interface BoomError extends Error {
  isBoom:boolean,
  output:{
    statusCode:number,
    payload:JSON
  }
}

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

/**
 * FIXME:
 * boomErrorHandler, isBoom property does not exist, fint a type from Boom library or
 * add another solution
 */

export const boomErrorHandler = (err:BoomError,req:Request,res:Response,next:NextFunction) => {
    if (err.isBoom) {
      const {output} = err;
     res.status(output.statusCode).json(output.payload);
    } else {
      next(err);
    }
  }