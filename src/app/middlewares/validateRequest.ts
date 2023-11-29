import  { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';


export const validateRequest = (schema: AnyZodObject) => {
  // console.log(schema);
    return async (req: Request, res: Response, next: NextFunction) => {
      // validation
      try {
        await schema.parseAsync({
          body: req.body,
        });
        next()
      } catch (err) {
        next(err);
      }
      // return next();
    };
  };