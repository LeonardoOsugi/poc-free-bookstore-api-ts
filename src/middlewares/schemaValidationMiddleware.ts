import err from "../errors/index.js";
import { Request, Response, NextFunction } from "express";
import { UserBook} from "../protocols/schema.js";
import { ObjectSchema } from "joi";

export function validateSchema (schema:ObjectSchema<UserBook>){
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body as UserBook, { abortEarly: false });
    if (error) {
      throw err.conflictError(error.details[0].message);
    }

    next();
  };
}