import { AppError } from "@cloud/error";
import { NextFunction, Request, Response } from "express";



function globalErros(err: Error, request: Request, response: Response,
  next: NextFunction) {

  console.log('MDS UM ERRO - PEDRO SURPRESAS <:()');

  console.error(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      data: err?.data
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
}

export { globalErros };
