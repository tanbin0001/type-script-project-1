import  { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';


export const validateRequest = (schema: AnyZodObject) => {

    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        // validation
   
          await schema.parseAsync({
            body: req.body,
            cookies: req.cookies
          });
         next();
      
    }
    )
  }