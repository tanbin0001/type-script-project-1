/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { handleZodError } from '../errors/HandleZodError';
import handleValidationError from '../errors/HandleValidationError';
import { TErrorSource } from '../interface/error';
import handleCastError from '../errors/HandleCastError';
import handleDuplicateError from '../errors/HandleDuplicateError';
import { AppError } from '../errors/AppError';
 

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode =  500;
  let message =  'Something went wrong';


  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];



  if (err instanceof ZodError) {
    console.log('zod error');
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if (err?.name === 'ValidationError'){
    console.log('mongoose error');
    const simplifiedError =  handleValidationError(err);
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError.errorSources
  }else if (err?.name === 'CastError') {
    console.log('cast error');
    const simplifiedError =  handleCastError(err);
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError.errorSources
  
  }else if (err?.code === '11000') {
    console.log('duplicate error');
    const simplifiedError =  handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError.errorSources
  
  }else if (err instanceof AppError) {
  
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [{
      path:'',
      message:err?.message
    }]
  }else if (err instanceof Error) {
  
    message = err?.message;
    errorSources = [{
      path:'',
      message:err?.message
    }]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack : config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
